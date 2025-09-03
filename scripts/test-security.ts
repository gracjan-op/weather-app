#!/usr/bin/env node

/**
 * Security Headers Test Script
 *
 * This script tests the security headers on your local development server.
 * Run this after starting your dev server to verify security headers are working.
 *
 * Usage: tsx scripts/test-security.ts [port]
 */

import {
   logSecurityTestResults,
   testSecurityHeaders,
} from '../src/utils/securityTest.js';

const port = process.argv[2] || 5173;
const url = `http://localhost:${port}`;

console.log(`🔒 Testing security headers on ${url}`);
console.log('Make sure your development server is running first!\n');

try {
  const results = await testSecurityHeaders(url);
  logSecurityTestResults(results);

  // Exit with error code if critical headers failed
  const criticalFailed = results.results.filter(
    r => !r.passed && r.critical
  ).length;
  if (criticalFailed > 0) {
    console.log(`\n❌ ${criticalFailed} critical security headers failed!`);
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Failed to test security headers:', error.message);
  console.log(
    '\n💡 Make sure your development server is running on port',
    port
  );
  process.exit(1);
}
