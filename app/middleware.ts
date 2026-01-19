import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define the preferred domain configuration
const PREFERRED_DOMAIN = 'www.dominicanna.net'
const PREFERRED_PROTOCOL = 'https'

export function middleware(request: NextRequest) {
  const { hostname, protocol, pathname } = request.nextUrl
  const currentUrl = request.nextUrl.clone()

  // Handle protocol consistency (redirect HTTP to HTTPS)
  if (protocol !== `${PREFERRED_PROTOCOL}:`) {
    currentUrl.protocol = PREFERRED_PROTOCOL
    return NextResponse.redirect(currentUrl, 301)
  }

  // Handle subdomain consistency (redirect non-WWW to WWW)
  if (hostname === 'dominicanna.net') {
    currentUrl.hostname = PREFERRED_DOMAIN
    return NextResponse.redirect(currentUrl, 301)
  }

  // Handle WWW subdomain consistency (redirect other WWW variations to preferred)
  if (hostname.startsWith('www.') && hostname !== PREFERRED_DOMAIN) {
    currentUrl.hostname = PREFERRED_DOMAIN
    return NextResponse.redirect(currentUrl, 301)
  }

  // Handle non-WWW subdomain consistency (redirect other non-WWW variations to preferred)
  if (!hostname.startsWith('www.') && hostname !== 'dominicanna.net') {
    currentUrl.hostname = PREFERRED_DOMAIN
    return NextResponse.redirect(currentUrl, 301)
  }

  // Handle trailing slash consistency for non-file paths
  if (!pathname.endsWith('/') && !pathname.includes('.') && pathname !== '/') {
    currentUrl.pathname = `${pathname}/`
    return NextResponse.redirect(currentUrl, 301)
  }

  // Handle duplicate trailing slashes
  if (pathname.includes('//')) {
    const cleanPathname = pathname.replace(/\/\/+/g, '/')
    currentUrl.pathname = cleanPathname
    return NextResponse.redirect(currentUrl, 301)
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
    if (pattern.test(pathname)) {
      currentUrl.pathname = pathname.replace(pattern, replacement)
      return NextResponse.redirect(currentUrl, 301)
    }
  }

  // Handle case sensitivity for URLs (redirect to lowercase)
  if (pathname !== pathname.toLowerCase()) {
    currentUrl.pathname = pathname.toLowerCase()
    return NextResponse.redirect(currentUrl, 301)
  }

  // Handle query parameter ordering (sort alphabetically)
  const searchParams = currentUrl.searchParams
  if (searchParams.size > 1) {
    const params = Array.from(searchParams.entries())
    params.sort((a, b) => a[0].localeCompare(b[0]))

    // Clear existing params and add sorted ones
    searchParams.forEach((_, key) => searchParams.delete(key))
    params.forEach(([key, value]) => searchParams.append(key, value))

    return NextResponse.redirect(currentUrl, 301)
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
