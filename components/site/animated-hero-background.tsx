'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// ============================================================================
// НАСТРОЙКИ ВОЛНОВОЙ АНИМАЦИИ БАРХАНОВ (точка старта глубоко ВНИЗУ ЗА КАДРОМ)
// ============================================================================
/** Скорость движения широких дуг снизу вверх к горизонту */
export const WAVE_SPEED = 0.85

/** Деликатная амплитуда смещения по вертикали (сохраняет четкость полосок песка без мыла) */
export const WAVE_AMPLITUDE = 0.011

/** Низкая частота (длинные широкие дуги вместо мелких концентрических колец) */
export const WAVE_FREQUENCY = 6.5

/** Центр по горизонтали (0.5 = строго посередине экрана) */
export const ORIGIN_X = 0.5

/**
 * Точка старта волн ГЛУБОКО ВНИЗУ ЗА ПРЕДЕЛАМИ ЭКРАНА (1.0 = нижний край блока, 1.42 = далеко под скриншотами).
 * Благодаря этому точка рождения волн никогда не видна в кадре, а снизу входят широкие плавные дуги.
 */
export const ORIGIN_Y = 1.42

/** Верхняя граница затухания (к логотипу RS, лучу света и небу амплитуда падает строго в 0.0) */
export const UPPER_STOP_Y = 0.54

/** Нижняя точка полного раскрытия волны (у основания барханов внизу кадра) */
export const LOWER_FULL_Y = 0.84

/** Мягкий теплый блик света, скользящий по ребрам дюн вместе с широкой волной */
export const LUMINANCE_PULSE = 0.22

// ============================================================================
// GLSL SHADERS (Чистый WebGL 1.0 — 60 FPS, 0 нагрузки на CPU)
// ============================================================================
const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    // v_uv.y = 0.0 вверху (небо), v_uv.y = 1.0 внизу (основание барханов)
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
  uniform float u_upperStopY;
  uniform float u_lowerFullY;
  uniform float u_lumPulse;

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

    // Вектор от невидимого центра далеко ВНИЗУ за кадром (u_origin = 0.5, 1.42) к текущему пикселю
    vec2 delta = coverUV - u_origin;

    // Широкий радиус дуги: сжимаем X, чтобы дуги входили снизу широким спокойным фронтом
    vec2 arcDelta = vec2(delta.x * 0.72, delta.y);
    float dist = length(arcDelta);

    // 1. Вертикальное затухание снизу вверх:
    // Внизу (coverUV.y ~ 0.85..1.0) сила максимальна, а к логотипу RS (coverUV.y <= 0.54),
    // лучу света и звездному небу амплитуда плавно падает в полный 0.0.
    float sideArch = abs(coverUV.x - 0.5) * 0.12;
    float verticalMask = smoothstep(u_upperStopY - sideArch, u_lowerFullY, coverUV.y);

    // Дополнительная защитная маска вокруг центрального логотипа RS (0.5, 0.52),
    // чтобы вокруг RS никогда не возникало никаких искажений
    float distToLogo = length((coverUV - vec2(0.5, 0.52)) * vec2(1.2, 1.8));
    float logoSafeZone = smoothstep(0.12, 0.28, distToLogo);

    // Мягкое гашение у самых краев текстуры (0..1), чтобы края не рвались
    float edgeGuardX = smoothstep(0.0, 0.06, coverUV.x) * smoothstep(1.0, 0.94, coverUV.x);
    float edgeGuardY = smoothstep(0.0, 0.06, coverUV.y) * smoothstep(1.0, 0.96, coverUV.y);

    float attenuation = verticalMask * logoSafeZone * edgeGuardX * edgeGuardY;

    // 2. Длинная плавная волна, идущая снизу вверх (от u_origin наружу к горизонту: dist увеличивается снизу вверх, поэтому - u_time * u_speed)
    float phase = dist * u_frequency - u_time * u_speed;
    float wave = sin(phase);

    // Смещаем текстуру очень деликатно вдоль нормали широкой дуги (преимущественно по вертикали),
    // чтобы полоски песка на барханах оставались идеально четкими и не мылились
    vec2 arcNormal = normalize(vec2(delta.x * 0.25, delta.y));
    vec2 displacedUV = clamp(
      coverUV + arcNormal * wave * u_amplitude * attenuation,
      vec2(0.001),
      vec2(0.999)
    );

    vec4 texColor = texture2D(u_texture, displacedUV);

    // 3. Мягкий световой перелив на гребнях широких волн, подсвечивающий светлые грани барханов
    float ridgeLuma = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    float ridgeMask = smoothstep(0.02, 0.35, ridgeLuma);
    float crest = pow(max(0.0, wave * 0.5 + 0.5), 2.0);

    vec3 warmGlowColor = vec3(1.0, 0.78, 0.58);
    vec3 highlight = warmGlowColor * crest * u_lumPulse * attenuation * (0.25 + 0.75 * ridgeMask);

    gl_FragColor = vec4(texColor.rgb + highlight, texColor.a);
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

    const gl =
      canvas.getContext('webgl', {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
      }) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null)

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

    const uTime = gl.getUniformLocation(program, 'u_time')
    const uRes = gl.getUniformLocation(program, 'u_resolution')
    const uImgRes = gl.getUniformLocation(program, 'u_imageResolution')
    const uSpeed = gl.getUniformLocation(program, 'u_speed')
    const uAmp = gl.getUniformLocation(program, 'u_amplitude')
    const uFreq = gl.getUniformLocation(program, 'u_frequency')
    const uOrigin = gl.getUniformLocation(program, 'u_origin')
    const uUpperStopY = gl.getUniformLocation(program, 'u_upperStopY')
    const uLowerFullY = gl.getUniformLocation(program, 'u_lowerFullY')
    const uLumPulse = gl.getUniformLocation(program, 'u_lumPulse')

    gl.uniform1f(uSpeed, WAVE_SPEED)
    gl.uniform1f(uAmp, WAVE_AMPLITUDE)
    gl.uniform1f(uFreq, WAVE_FREQUENCY)
    gl.uniform2f(uOrigin, ORIGIN_X, ORIGIN_Y)
    gl.uniform1f(uUpperStopY, UPPER_STOP_Y)
    gl.uniform1f(uLowerFullY, LOWER_FULL_Y)
    gl.uniform1f(uLumPulse, LUMINANCE_PULSE)

    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    let rafId = 0
    let disposed = false
    let isIntersecting = true
    let started = false

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

    const startShaderLoop = () => {
      if (disposed || started) return
      started = true
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

    img.onload = startShaderLoop
    img.src = src
    if (img.complete && img.naturalWidth > 0) {
      startShaderLoop()
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
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className={cn(
          'object-cover transition-opacity duration-500 [mask-image:radial-gradient(90%_85%_at_50%_52%,black_30%,transparent_96%)]',
          webglReady ? 'opacity-0' : 'opacity-100',
        )}
      />

      <canvas
        ref={canvasRef}
        className={cn(
          'absolute inset-0 size-full transition-opacity duration-500 [mask-image:radial-gradient(90%_85%_at_50%_52%,black_30%,transparent_96%)]',
          webglReady ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  )
}
