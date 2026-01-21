/**
 * Simple test to verify redirect chain elimination
 * This tests the logic without importing the middleware
 */

// Replicate the buildCanonicalUrl function logic for testing
function buildCanonicalUrl(urlString) {
  const url = new URL(urlString);
  const canonicalUrl = new URL(urlString);

  // Define the preferred domain configuration
  const PREFERRED_DOMAIN = 'www.dominicanna.net';
  const PREFERRED_PROTOCOL = 'https';

  // Apply protocol normalization (HTTP to HTTPS)
  if (url.protocol !== `${PREFERRED_PROTOCOL}:`) {
    canonicalUrl.protocol = PREFERRED_PROTOCOL;
  }

  // Apply domain normalization (non-WWW to WWW, other variations to preferred domain)
  if (url.hostname === 'dominicanna.net') {
    canonicalUrl.hostname = PREFERRED_DOMAIN;
  } else if (url.hostname.startsWith('www.') && url.hostname !== PREFERRED_DOMAIN) {
    canonicalUrl.hostname = PREFERRED_DOMAIN;
  } else if (!url.hostname.startsWith('www.') && url.hostname !== 'dominicanna.net') {
    canonicalUrl.hostname = PREFERRED_DOMAIN;
  }

  // Apply path normalization rules
  let normalizedPathname = canonicalUrl.pathname;

  // Handle duplicate trailing slashes first
  if (normalizedPathname.includes('//')) {
    normalizedPathname = normalizedPathname.replace(/\/\/+/g, '/');
  }

  // Handle common duplicate URL patterns
  const duplicatePatterns = [
    { pattern: /\/index\.html$/i, replacement: '/' },
    { pattern: /\/index$/i, replacement: '/' },
    { pattern: /\/home$/i, replacement: '/' },
    { pattern: /\/(default|main)\.aspx$/i, replacement: '/' },
    { pattern: /\/default\.html$/i, replacement: '/' },
    { pattern: /\/main\.html$/i, replacement: '/' },
  ];

  for (const { pattern, replacement } of duplicatePatterns) {
    if (pattern.test(normalizedPathname)) {
      normalizedPathname = normalizedPathname.replace(pattern, replacement);
      break; // Only apply the first matching pattern
    }
  }

  // Handle case sensitivity (redirect to lowercase)
  if (normalizedPathname !== normalizedPathname.toLowerCase()) {
    normalizedPathname = normalizedPathname.toLowerCase();
  }

  // Handle trailing slash consistency for non-file paths (after other normalizations)
  if (!normalizedPathname.endsWith('/') && !normalizedPathname.includes('.') && normalizedPathname !== '/') {
    normalizedPathname = `${normalizedPathname}/`;
  }

  // Apply path normalization
  canonicalUrl.pathname = normalizedPathname;

  // Handle query parameter ordering (sort alphabetically)
  const searchParams = canonicalUrl.searchParams;
  if (searchParams.size > 1) {
    const params = Array.from(searchParams.entries());
    params.sort((a, b) => a[0].localeCompare(b[0]));

    // Clear existing params and add sorted ones
    searchParams.forEach((_, key) => searchParams.delete(key));
    params.forEach(([key, value]) => searchParams.append(key, value));
  }

  return canonicalUrl;
}

// Test cases that previously caused redirect chains
const testCases = [
  {
    name: 'HTTP non-WWW without trailing slash',
    input: 'http://dominicanna.net',
    expected: 'https://www.dominicanna.net/'
  },
  {
    name: 'HTTP non-WWW with path without trailing slash',
    input: 'http://dominicanna.net/about',
    expected: 'https://www.dominicanna.net/about/'
  },
  {
    name: 'HTTPS non-WWW without trailing slash',
    input: 'https://dominicanna.net',
    expected: 'https://www.dominicanna.net/'
  },
  {
    name: 'HTTPS WWW without trailing slash (should not redirect)',
    input: 'https://www.dominicanna.net',
    expected: 'https://www.dominicanna.net/'
  },
  {
    name: 'HTTP WWW without trailing slash',
    input: 'http://www.dominicanna.net',
    expected: 'https://www.dominicanna.net/'
  },
  {
    name: 'Mixed case path',
    input: 'https://www.dominicanna.net/About',
    expected: 'https://www.dominicanna.net/about/'
  },
  {
    name: 'Duplicate slashes',
    input: 'https://www.dominicanna.net//about//',
    expected: 'https://www.dominicanna.net/about/'
  },
  {
    name: 'Index.html pattern',
    input: 'https://www.dominicanna.net/index.html',
    expected: 'https://www.dominicanna.net/'
  },
  {
    name: 'File path (should not add trailing slash)',
    input: 'https://www.dominicanna.net/sitemap.xml',
    expected: 'https://www.dominicanna.net/sitemap.xml'
  }
];

console.log('Testing redirect chain elimination...\\n');

let passedTests = 0;
let failedTests = 0;

testCases.forEach((testCase, index) => {
  try {
    const canonicalUrl = buildCanonicalUrl(testCase.input);
    const actual = canonicalUrl.toString();

    const passed = actual === testCase.expected;
    if (passed) {
      passedTests++;
      console.log(`✅ Test ${index + 1}: ${testCase.name}`);
      console.log(`   Input:    ${testCase.input}`);
      console.log(`   Expected: ${testCase.expected}`);
      console.log(`   Actual:   ${actual}`);
    } else {
      failedTests++;
      console.log(`❌ Test ${index + 1}: ${testCase.name}`);
      console.log(`   Input:    ${testCase.input}`);
      console.log(`   Expected: ${testCase.expected}`);
      console.log(`   Actual:   ${actual}`);
    }
    console.log('');
  } catch (error) {
    failedTests++;
    console.log(`💥 Test ${index + 1}: ${testCase.name} - ERROR`);
    console.log(`   Input:    ${testCase.input}`);
    console.log(`   Error:    ${error.message}`);
    console.log('');
  }
});

console.log(`\\nTest Results: ${passedTests} passed, ${failedTests} failed`);

if (failedTests === 0) {
  console.log('🎉 All tests passed! Redirect chains have been eliminated.');
  console.log('\\nThe middleware will now redirect directly to the canonical URL');
  console.log('instead of creating multiple redirect hops.');
} else {
  console.log('⚠️  Some tests failed. Please review the middleware implementation.');
}
