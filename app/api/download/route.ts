import { NextRequest } from 'next/server'

const GITHUB_OWNER = 'BohdanKrakoviatskyi'
const GITHUB_REPO = 'Resonance'
const LATEST_RELEASE_API = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`

const RELEASE_CACHE_MS = 60_000

type Asset = { name: string; size: number; url: string }
type Release = { tag: string; publishedAt: string; assets: Asset[] }

let releaseCache: { at: number; value: Release } | null = null

function githubToken(): string {
  try {
    return process.env.GITHUB_TOKEN || process.env.GH_TOKEN || ''
  } catch {
    return ''
  }
}

function json(body: unknown, status = 200, extraHeaders?: Record<string, string>): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400',
      'access-control-allow-origin': '*',
      ...extraHeaders,
    },
  })
}

async function loadLatestRelease(): Promise<Release> {
  if (releaseCache && Date.now() - releaseCache.at < RELEASE_CACHE_MS) {
    return releaseCache.value
  }

  const headers: Record<string, string> = {
    accept: 'application/vnd.github+json',
    'x-github-api-version': '2022-11-28',
    'user-agent': 'resonance-landing',
  }
  const token = githubToken()
  if (token) headers.authorization = `Bearer ${token}`

  const res = await fetch(LATEST_RELEASE_API, { headers })
  if (!res.ok) {
    const err = new Error(`GitHub API responded with ${res.status}.`)
    ;(err as Error & { status?: number }).status = res.status === 404 ? 404 : 502
    throw err
  }

  const data = (await res.json()) as {
    tag_name?: string
    published_at?: string
    created_at?: string
    assets?: Array<{ name?: string; size?: number; browser_download_url?: string }>
  }

  const assets: Asset[] = (data.assets ?? [])
    .filter(
      (a): a is { name: string; size?: number; browser_download_url: string } =>
        typeof a?.name === 'string' && typeof a?.browser_download_url === 'string',
    )
    .map((a) => ({
      name: a.name,
      size: typeof a.size === 'number' ? a.size : 0,
      url: a.browser_download_url,
    }))

  const value: Release = {
    tag: String(data.tag_name ?? ''),
    publishedAt: String(data.published_at ?? data.created_at ?? ''),
    assets,
  }
  releaseCache = { at: Date.now(), value }
  return value
}

function isSignatureOrManifest(name: string): boolean {
  return name.endsWith('.sig') || name === 'latest.json'
}

const MATCHERS: Record<string, (name: string) => boolean> = {
  windows: (name) =>
    !isSignatureOrManifest(name) &&
    (name.endsWith('-setup.exe') || name.endsWith('.exe') || name.endsWith('.msi') || name.endsWith('.zip')),
  'windows-exe': (name) => !isSignatureOrManifest(name) && (name.endsWith('-setup.exe') || name.endsWith('.exe')),
  'windows-msi': (name) => !isSignatureOrManifest(name) && name.endsWith('.msi'),
  macos: (name) => !isSignatureOrManifest(name) && (name.endsWith('_aarch64.dmg') || name.endsWith('.dmg')),
  'macos-arm64': (name) => !isSignatureOrManifest(name) && name.endsWith('_aarch64.dmg'),
  'macos-x64': (name) => !isSignatureOrManifest(name) && name.endsWith('_x64.dmg'),
  linux: (name) => !isSignatureOrManifest(name) && name.endsWith('.AppImage'),
  'linux-appimage': (name) => !isSignatureOrManifest(name) && name.endsWith('.AppImage'),
  'linux-deb': (name) => !isSignatureOrManifest(name) && name.endsWith('.deb'),
  'linux-rpm': (name) => !isSignatureOrManifest(name) && name.endsWith('.rpm'),
}

async function streamAsset(request: Request, asset: Asset, release: Release): Promise<Response> {
  const isHead = request.method === 'HEAD'

  const upstreamHeaders: Record<string, string> = { 'user-agent': 'resonance-landing' }
  const range = request.headers.get('range')
  if (range) upstreamHeaders.range = range

  const upstream = await fetch(asset.url, {
    method: isHead ? 'HEAD' : 'GET',
    headers: upstreamHeaders,
    redirect: 'follow',
  })

  if (!upstream.ok && upstream.status !== 206) {
    return json(
      { error: `Could not fetch ${asset.name} from GitHub`, status: upstream.status },
      502,
    )
  }

  const headers = new Headers()
  headers.set('content-type', upstream.headers.get('content-type') ?? 'application/octet-stream')
  headers.set('content-disposition', `attachment; filename="${asset.name.replace(/["\\]/g, '_')}"`)
  headers.set('accept-ranges', upstream.headers.get('accept-ranges') ?? 'bytes')
  headers.set('cache-control', 'public, max-age=0, must-revalidate')
  headers.set('access-control-allow-origin', '*')
  headers.set('x-release-tag', release.tag)

  for (const header of ['content-length', 'content-range', 'etag', 'last-modified']) {
    const value = upstream.headers.get(header)
    if (value) headers.set(header, value)
  }

  if (isHead) {
    return new Response(null, { status: upstream.status, headers })
  }

  return new Response(upstream.body, { status: upstream.status, headers })
}

export async function GET(request: NextRequest): Promise<Response> {
  const url = request.nextUrl
  const requestedAsset = url.searchParams.get('asset')
  const selector = (url.searchParams.get('platform') ?? url.searchParams.get('os') ?? '').toLowerCase()

  try {
    const release = await loadLatestRelease()

    if (!requestedAsset && !selector) {
      return json({
        tag: release.tag,
        publishedAt: release.publishedAt,
        assets: release.assets
          .filter((a) => !isSignatureOrManifest(a.name))
          .map((a) => ({
            name: a.name,
            size: a.size,
            download: `/api/download?asset=${encodeURIComponent(a.name)}`,
          })),
      })
    }

    let asset: Asset | undefined
    if (requestedAsset) {
      asset = release.assets.find((a) => a.name === requestedAsset)
    } else {
      const matcher = MATCHERS[selector] ?? MATCHERS.windows
      asset = release.assets.find((a) => matcher(a.name))
    }

    if (!asset) {
      return json(
        { error: `No downloadable build found for ${requestedAsset || selector}`, tag: release.tag },
        404,
      )
    }

    return await streamAsset(request, asset, release)
  } catch (err) {
    const status = (err as Error & { status?: number }).status ?? 502
    return json({ error: (err as Error).message || 'Download proxy failed' }, status)
  }
}

export async function HEAD(request: NextRequest): Promise<Response> {
  return GET(request)
}
