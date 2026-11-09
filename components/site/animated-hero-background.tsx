'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// ============================================================================
// НАСТРОЙКИ РАДИАЛЬНОЙ ВОЛНОВОЙ АНИМАЦИИ БАРХАНОВ (легко подкрутить под себя)
// ============================================================================
/** Скорость расхождения волн от центра (выше = быстрее) */
export const WAVE_SPEED = 1.15

/** Сила физического смещения текстуры песка (0.008–0.018 — заметно, но без "желе") */
export const WAVE_AMPLITUDE = 0.013

/** Частота колец (количество гребней волн от горизонта до переднего плана) */
export const WAVE_FREQUENCY = 26.0

/** Точка рождения волн по горизонтали (0.5 = ровно центр луча и логотипа RS) */
export const ORIGIN_X = 0.5

/** Точка рождения волн по вертикали в UV текстуры (0.0 = верх, ~0.48 = основание луча у горизонта) */
export const ORIGIN_Y = 0.48

/** Радиус плавного затухания волн к краям экрана */
export const FALLOFF_RADIUS = 0.92

/** Сила теплого светового импульса на гребнях волн (подсветка ребер барханов) */
export const LUMINANCE_PULSE = 0.24

/** Верхняя граница маски барханов (выше этой линии небо и звезды остаются неподвижными) */
export const HORIZON_MASK_TOP = 0.36

/** Мягкость перехода маски на линии горизонта */
export const HORIZON_MASK_FEATHER = 0.14

// ============================================================================
// GLSL SHADERS (Чистый WebGL 1.0 — 60 FPS, 0 зависимостей, 0 нагрузки на CPU)
// ============================================================================
const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    // Переводим clip-space (-1..1) в экранные UV (0..1, где Y=0 сверху, Y=1 снизу)
    v_uv = vec2(a_position.x * 0.5 + 0.5, 0.5 - a_position.y * 0.5);
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 v_uv;

  uniform sampler2D u_texture;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_imageResolution;

  uniform float u_speed;
  uniform float u_amplitude;
  uniform float u_frequency;
  uniform vec2 u_origin;
  uniform float u_falloff;
  uniform float u_lumPulse;
  uniform float u_horizonTop;
  uniform float u_horizonFeather;

  // Пересчет экранных UV в текстурные UV по правилу CSS object-fit: cover
  vec2 getCoverUV(vec2 uv, vec2 canvasRes, vec2 imageRes) {
    float canvasAspect = canvasRes.x / max(canvasRes.y, 1.0);
    float imageAspect = imageRes.x / max(imageRes.y, 1.0);

    vec2 scale = vec2(1.0);
    if (canvasAspect > imageAspect) {
      scale.y = imageAspect / canvasAspect;
    } else {
      scale.x = canvasAspect / imageAspect;
    }

    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 coverUV = getCoverUV(v_uv, u_resolution, u_imageResolution);

    // Вектор от точки схождения барханов (основания луча) к текущему пикселю
    vec2 delta = coverUV - u_origin;

    // Перспективное сжатие по Y: круги ложатся в плоскость барханов эллиптическими дугами
    vec2 perspectiveDelta = vec2(delta.x * 1.15, delta.y * 2.1);
    float dist = length(perspectiveDelta);

    // 1. Маска горизонта: небо со звездами и верх луча остаются неподвижными
    // Дополнительно учитываем изгиб холмов по краям экрана
    float hillCurve = -abs(coverUV.x - 0.5) * 0.14;
    float localHorizon = u_horizonTop + hillCurve;
    float duneMask = smoothstep(localHorizon, localHorizon + u_horizonFeather, coverUV.y);

    // 2. Плавное рождение в центре и мягкое затухание к краям (чтобы края фото не рвались)
    float innerFade = smoothstep(0.01, 0.12, dist);
    float outerFade = 1.0 - smoothstep(0.15, u_falloff, dist);

    // Защитная виньетка у самых границ текстуры (0..1)
    float edgeGuardX = smoothstep(0.0, 0.06, coverUV.x) * smoothstep(1.0, 0.94, coverUV.x);
    float edgeGuardY = smoothstep(0.0, 0.06, coverUV.y) * smoothstep(1.0, 0.92, coverUV.y);
    float attenuation = duneMask * innerFade * outerFade * edgeGuardX * edgeGuardY;

    // 3. Радиальная волна, расходящаяся от центра наружу (-u_time * u_speed)
    float phase = dist * u_frequency - u_time * u_speed;

    // Основная медленная волна + легкая вторая гармоника для органичности звука
    float primaryWave = sin(phase);
    float harmonicWave = sin(phase * 2.0 - 0.6) * 0.3;
    float combinedWave = (primaryWave + harmonicWave) / 1.3;

    // Направление смещения: радиально от центра + легкий вертикальный акцент по рельефу борозд
    vec2 radialDir = normalize(delta + vec2(0.0001));
    vec2 dispDir = normalize(mix(radialDir, vec2(radialDir.x * 0.45, 1.0), 0.45));

    // Смещаем UV деликатно, сохраняя жесткую геометрию самих горок
    vec2 displacedUV = clamp(
      coverUV + dispDir * combinedWave * u_amplitude * attenuation,
      vec2(0.001),
      vec2(0.999)
    );

    vec4 texColor = texture2D(u_texture, displacedUV);

    // 4. Световой блик (luminance pulse), бегущий по ребрам песчаных бороздок
    // Вычисляем локальную яркость текстуры, чтобы подсвечивать именно светлые грани барханов
    float ridgeLuma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    float ridgeMask = smoothstep(0.03, 0.38, ridgeLuma);

    // Гребень световой волны
    float crest = pow(max(0.0, primaryWave * 0.5 + 0.5), 2.6);

    // Теплый янтарно-золотистый оттенок в тон палитры Resonance
    vec3 warmGlowColor = vec3(1.0, 0.78, 0.58);
    vec3 highlight = warmGlowColor * crest * u_lumPulse * attenuation * (0.35 + 0.65 * ridgeMask);

    // Мягкое дыхание самого источника света у основания луча
    float coreDist = length((coverUV - u_origin) * vec2(1.0, 1.6));
    float corePulse = (0.5 + 0.5 * sin(u_time * u_speed * 0.85)) * exp(-coreDist * 7.5) * 0.08;

    vec3 finalRGB = texColor.rgb + highlight + warmGlowColor * corePulse;

    gl_FragColor = vec4(finalRGB, texColor.a);
  }
`

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export interface AnimatedHeroBackgroundProps {
  src?: string
  className?: string
}

export function AnimatedHeroBackground({
  src = '/images/hero-dunes.png',
  className,
}: AnimatedHeroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [webglReady, setWebglReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Уважаем системную настройку prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    })
    if (!gl) return

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program)
      return
    }

    gl.useProgram(program)

    // Полноэкранный квад из 2 треугольников
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    )

    const posLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    // Uniform-локации
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uRes = gl.getUniformLocation(program, 'u_resolution')
    const uImgRes = gl.getUniformLocation(program, 'u_imageResolution')
    const uSpeed = gl.getUniformLocation(program, 'u_speed')
    const uAmp = gl.getUniformLocation(program, 'u_amplitude')
    const uFreq = gl.getUniformLocation(program, 'u_frequency')
    const uOrigin = gl.getUniformLocation(program, 'u_origin')
    const uFalloff = gl.getUniformLocation(program, 'u_falloff')
    const uLumPulse = gl.getUniformLocation(program, 'u_lumPulse')
    const uHorizonTop = gl.getUniformLocation(program, 'u_horizonTop')
    const uHorizonFeather = gl.getUniformLocation(program, 'u_horizonFeather')

    // Передаем константы настройки волн
    gl.uniform1f(uSpeed, WAVE_SPEED)
    gl.uniform1f(uAmp, WAVE_AMPLITUDE)
    gl.uniform1f(uFreq, WAVE_FREQUENCY)
    gl.uniform2f(uOrigin, ORIGIN_X, ORIGIN_Y)
    gl.uniform1f(uFalloff, FALLOFF_RADIUS)
    gl.uniform1f(uLumPulse, LUMINANCE_PULSE)
    gl.uniform1f(uHorizonTop, HORIZON_MASK_TOP)
    gl.uniform1f(uHorizonFeather, HORIZON_MASK_FEATHER)

    // Создаем текстуру
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    let rafId = 0
    let disposed = false
    let isIntersecting = true

    const updateSize = () => {
      if (!canvas || disposed) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      const width = Math.max(1, Math.round(rect.width * dpr))
      const height = Math.max(1, Math.round(rect.height * dpr))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        gl.viewport(0, 0, width, height)
        gl.uniform2f(uRes, width, height)
      }
    }

    const resizeObserver = new ResizeObserver(updateSize)
    resizeObserver.observe(canvas)

    // Останавливаем рендер, когда пользователь проскроллил ниже Hero
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting
      },
      { threshold: 0 },
    )
    intersectionObserver.observe(canvas)

    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.decoding = 'async'
    img.src = src

    img.onload = () => {
      if (disposed) return
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      gl.uniform2f(uImgRes, img.naturalWidth || 1920, img.naturalHeight || 820)
      updateSize()
      setWebglReady(true)

      const startTime = performance.now()
      const render = (now: number) => {
        if (disposed) return
        if (isIntersecting) {
          const elapsedSeconds = (now - startTime) * 0.001
          gl.uniform1f(uTime, elapsedSeconds)
          gl.drawArrays(gl.TRIANGLES, 0, 6)
        }
        rafId = window.requestAnimationFrame(render)
      }
      rafId = window.requestAnimationFrame(render)
    }

    return () => {
      disposed = true
      window.cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      gl.deleteTexture(texture)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [src])

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none relative inset-0 size-full overflow-hidden select-none',
        className,
      )}
    >
      {/* Статичный fallback от Next/Image для мгновенного LCP и на случай отключенного WebGL */}
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className={cn(
          'object-cover transition-opacity duration-700 [mask-image:radial-gradient(90%_85%_at_50%_52%,black_30%,transparent_96%)]',
          webglReady ? 'opacity-0' : 'opacity-100',
        )}
      />

      {/* WebGL 2D Shader Canvas с той же мягкой радиальной маской */}
      <canvas
        ref={canvasRef}
        className={cn(
          'absolute inset-0 size-full transition-opacity duration-700 [mask-image:radial-gradient(90%_85%_at_50%_52%,black_30%,transparent_96%)]',
          webglReady ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  )
}
