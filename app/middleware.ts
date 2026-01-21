import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define the preferred domain configuration
const PREFERRED_DOMAIN = 'www.dominicanna.net'
const PREFERRED_PROTOCOL = 'https'

/**
 * Builds the canonical URL by applying all normalization rules at once
 * to avoid redirect chains and improve SEO performance.
 */
function buildCanonicalUrl(request: NextRequest): URL {
  const { hostname, protocol, pathname, search } = request.nextUrl
  const canonicalUrl = request.nextUrl.clone()

  // Apply protocol normalization (HTTP to HTTPS)
  if (protocol !== `${PREFERRED_PROTOCOL}:`) {
    canonicalUrl.protocol = PREFERRED_PROTOCOL
  }

  // Apply domain normalization (non-WWW to WWW, other variations to preferred domain)
  if (hostname === 'dominicanna.net') {
    canonicalUrl.hostname = PREFERRED_DOMAIN
  } else if (hostname.startsWith('www.') && hostname !== PREFERRED_DOMAIN) {
    canonicalUrl.hostname = PREFERRED_DOMAIN
  } else if (!hostname.startsWith('www.') && hostname !== 'dominicanna.net') {
    canonicalUrl.hostname = PREFERRED_DOMAIN
  }

  // Apply path normalization rules
  let normalizedPathname = canonicalUrl.pathname

  // Handle duplicate trailing slashes first
  if (normalizedPathname.includes('//')) {
    normalizedPathname = normalizedPathname.replace(/\/\/+/g, '/')
  }

  // Handle common duplicate URL patterns
  const duplicatePatterns = [
    { pattern: /\/index\.html$/i, replacement: '/' },
    { pattern: /\/index$/i, replacement: '/' },
    { pattern: /\/home$/i, replacement: '/' },
    { pattern: /\/(default|main)\.aspx$/i, replacement: '/' },
    { pattern: /\/default\.html$/i, replacement: '/' },
    { pattern: /\/main\.html$/i, replacement: '/' },
  ]

  for (const { pattern, replacement } of duplicatePatterns) {
    if (pattern.test(normalizedPathname)) {
      normalizedPathname = normalizedPathname.replace(pattern, replacement)
      break // Only apply the first matching pattern
    }
  }

  // Handle case sensitivity (redirect to lowercase)
  if (normalizedPathname !== normalizedPathname.toLowerCase()) {
    normalizedPathname = normalizedPathname.toLowerCase()
  }

  // Handle trailing slash consistency for non-file paths (after other normalizations)
  if (!normalizedPathname.endsWith('/') && !normalizedPathname.includes('.') && normalizedPathname !== '/') {
    normalizedPathname = `${normalizedPathname}/`
  }

  // Apply path normalization
  canonicalUrl.pathname = normalizedPathname

  // Handle query parameter ordering (sort alphabetically)
  const searchParams = canonicalUrl.searchParams
  if (searchParams.size > 1) {
    const params = Array.from(searchParams.entries())
    params.sort((a, b) => a[0].localeCompare(b[0]))

    // Clear existing params and add sorted ones
    searchParams.forEach((_, key) => searchParams.delete(key))
    params.forEach(([key, value]) => searchParams.append(key, value))
  }

  return canonicalUrl
}

export function middleware(request: NextRequest) {
  const originalUrl = request.nextUrl.clone()
  const canonicalUrl = buildCanonicalUrl(request)

  // Convert both URLs to strings for comparison
  const originalUrlString = originalUrl.toString()
  const canonicalUrlString = canonicalUrl.toString()

  // Only redirect if the URLs are different
  if (originalUrlString !== canonicalUrlString) {
    return NextResponse.redirect(canonicalUrl, 301)
  }

  // If no redirects needed, continue with the request
  return NextResponse.next()
}

// Apply middleware to all routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
