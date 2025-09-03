/**
 * Security Testing Utilities
 *
 * This file contains utilities to test and verify security headers implementation.
 * Useful for development and testing security configurations.
 */

interface SecurityHeadersTest {
  header: string;
  expectedValue: string;
  description: string;
  critical: boolean;
}

export const SECURITY_HEADERS_TESTS: SecurityHeadersTest[] = [
  {
    header: 'X-Content-Type-Options',
    expectedValue: 'nosniff',
    description: 'Prevents MIME type sniffing',
    critical: true,
  },
  {
    header: 'X-Frame-Options',
    expectedValue: 'DENY',
    description: 'Prevents clickjacking attacks',
    critical: true,
  },
  {
    header: 'X-XSS-Protection',
    expectedValue: '1; mode=block',
    description: 'Enables XSS protection',
    critical: true,
  },
  {
    header: 'Referrer-Policy',
    expectedValue: 'strict-origin-when-cross-origin',
    description: 'Controls referrer information',
    critical: false,
  },
  {
    header: 'Permissions-Policy',
    expectedValue:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
    description: 'Restricts browser features',
    critical: false,
  },
  {
    header: 'X-DNS-Prefetch-Control',
    expectedValue: 'off',
    description: 'Disables DNS prefetching',
    critical: false,
  },
  {
    header: 'Strict-Transport-Security',
    expectedValue: 'max-age=31536000; includeSubDomains; preload',
    description: 'Enforces HTTPS',
    critical: true,
  },
  {
    header: 'Content-Security-Policy',
    expectedValue: '', // Will be checked separately
    description: 'Defines content security policy',
    critical: true,
  },
];

/**
 * Tests security headers on a given URL
 * @param url - The URL to test
 * @returns Promise with test results
 */
export const testSecurityHeaders = async (
  url: string
): Promise<{
  passed: number;
  failed: number;
  results: Array<{
    header: string;
    passed: boolean;
    actualValue?: string;
    expectedValue: string;
    description: string;
    critical: boolean;
  }>;
}> => {
  try {
    const response = await fetch(url);
    const headers = response.headers;

    const results = SECURITY_HEADERS_TESTS.map(test => {
      const actualValue = headers.get(test.header);
      const passed: boolean =
        actualValue === test.expectedValue ||
        (test.header === 'Content-Security-Policy' &&
          actualValue !== null &&
          actualValue.length > 0);

      return {
        header: test.header,
        passed,
        actualValue: actualValue || undefined,
        expectedValue: test.expectedValue,
        description: test.description,
        critical: test.critical,
      };
    });

    const passed = results.filter(r => r.passed).length;
    const failed = results.length - passed;

    return { passed, failed, results };
  } catch (error) {
    console.error('Error testing security headers:', error);
    throw error;
  }
};

/**
 * Logs security test results in a formatted way
 * @param results - Test results to log
 */
export const logSecurityTestResults = (results: {
  passed: number;
  failed: number;
  results: Array<{
    header: string;
    passed: boolean;
    actualValue?: string;
    expectedValue: string;
    description: string;
    critical: boolean;
  }>;
}): void => {
  console.log('\n🔒 Security Headers Test Results');
  console.log('================================');
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log('');

  results.results.forEach(result => {
    const status = result.passed ? '✅' : '❌';
    const critical = result.critical ? '🚨' : 'ℹ️';
    console.log(`${status} ${critical} ${result.header}`);
    console.log(`   Description: ${result.description}`);
    if (!result.passed) {
      console.log(`   Expected: ${result.expectedValue}`);
      console.log(`   Actual: ${result.actualValue || 'NOT SET'}`);
    }
    console.log('');
  });

  if (results.failed > 0) {
    console.log('⚠️  Some security headers are missing or incorrect!');
  } else {
    console.log('🎉 All security headers are properly configured!');
  }
};
