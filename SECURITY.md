# Security Implementation Guide

This document outlines the comprehensive security measures implemented in the Weather App to protect against common web vulnerabilities.

## 🔒 Security Headers Implemented

### 1. Content Security Policy (CSP)

- **Purpose**: Prevents Cross-Site Scripting (XSS) attacks by controlling which resources can be loaded
- **Configuration**:
  - **Development**: Allows inline scripts and styles for development convenience
  - **Production**: Restricts to trusted sources only, includes Vercel domains
- **Key Directives**:
  - `default-src 'self'` - Only allow resources from same origin
  - `script-src 'self'` - Only allow scripts from same origin
  - `frame-ancestors 'none'` - Prevent embedding in iframes
  - `object-src 'none'` - Block plugins and objects

### 2. X-Frame-Options

- **Value**: `DENY`
- **Purpose**: Prevents clickjacking attacks by blocking iframe embedding

### 3. X-Content-Type-Options

- **Value**: `nosniff`
- **Purpose**: Prevents MIME type sniffing attacks

### 4. X-XSS-Protection

- **Value**: `1; mode=block`
- **Purpose**: Additional XSS protection layer for older browsers

### 5. Referrer Policy

- **Value**: `strict-origin-when-cross-origin`
- **Purpose**: Controls referrer information sent with requests

### 6. Permissions Policy

- **Value**: Restricts access to sensitive browser features
- **Blocked Features**: Camera, microphone, geolocation, payment, USB, sensors
- **Purpose**: Prevents unauthorized access to device capabilities

### 7. Strict-Transport-Security (HSTS)

- **Value**: `max-age=31536000; includeSubDomains; preload`
- **Purpose**: Enforces HTTPS connections for 1 year

### 8. X-DNS-Prefetch-Control

- **Value**: `off`
- **Purpose**: Disables DNS prefetching for privacy

## 🚀 Deployment Configuration

### Vercel Production

Security headers are automatically applied via `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        // All security headers are applied here
      ]
    }
  ]
}
```

### Local Development

Security headers are applied via Express middleware in `server.ts`:

```javascript
// Security headers middleware
app.use((req, res, next) => {
  // Apply all security headers from configuration
  Object.entries(SECURITY_CONFIG.HEADERS).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Set Content Security Policy based on environment
  const csp = buildCSP(isProduction ? 'production' : 'development');
  res.setHeader('Content-Security-Policy', csp);

  next();
});
```

## 🧪 Security Testing

### Automated Testing

The Weather App includes a comprehensive security testing script to validate that all security headers are properly configured and working.

#### Usage

```bash
# Test security headers on default port (5173)
npm run test:security

# Test security headers on custom port
npx tsx scripts/test-security.ts 3000

# Test security headers directly with tsx
tsx scripts/test-security.ts [port]
```

#### What It Tests

The security test script validates all 8 security headers:

**Critical Headers (🚨)**

- **X-Content-Type-Options**: `nosniff` - Prevents MIME type sniffing
- **X-Frame-Options**: `DENY` - Prevents clickjacking attacks
- **X-XSS-Protection**: `1; mode=block` - Enables XSS protection
- **Strict-Transport-Security**: `max-age=31536000; includeSubDomains; preload` - Enforces HTTPS
- **Content-Security-Policy**: Must be set (content varies by environment)

**Important Headers (ℹ️)**

- **Referrer-Policy**: `strict-origin-when-cross-origin` - Controls referrer information
- **Permissions-Policy**: Restricts access to sensitive browser features
- **X-DNS-Prefetch-Control**: `off` - Disables DNS prefetching

#### Prerequisites

- Development server must be running (`npm run dev`)
- Server must be accessible on the specified port
- All security headers must be properly configured

#### Example Output

```
🔒 Security Headers Test Results
================================
✅ Passed: 8
❌ Failed: 0

✅ 🚨 X-Content-Type-Options
   Description: Prevents MIME type sniffing

✅ 🚨 X-Frame-Options
   Description: Prevents clickjacking attacks

✅ 🚨 X-XSS-Protection
   Description: Enables XSS protection

✅ ℹ️ Referrer-Policy
   Description: Controls referrer information

✅ ℹ️ Permissions-Policy
   Description: Restricts browser features

✅ ℹ️ X-DNS-Prefetch-Control
   Description: Disables DNS prefetching

✅ 🚨 Strict-Transport-Security
   Description: Enforces HTTPS

✅ 🚨 Content-Security-Policy
   Description: Defines content security policy

🎉 All security headers are properly configured!
```

#### Test Results

The script provides:

- ✅ Pass/Fail status for each header
- 🚨 Critical vs ℹ️ informational header indicators
- Detailed descriptions of each security measure
- Summary of passed/failed tests
- Exit code 1 if critical headers fail

### Manual Testing

Check headers using browser DevTools or curl:

```bash
curl -I http://localhost:5173
```

### Expected Headers

All requests should include:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()`
- `X-DNS-Prefetch-Control: off`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
- `Content-Security-Policy: [environment-specific policy]`

## 🔧 Configuration Files

### `src/config/security.ts`

Centralized security configuration with:

- CSP policies for different environments
- Security header definitions
- Validation utilities
- Future CORS and rate limiting configurations

### `src/utils/securityTest.ts`

Testing utilities for:

- Automated header validation
- Security compliance checking
- Development debugging

## 🚨 Security Considerations

### Development vs Production

- **Development**: More permissive CSP for debugging
- **Production**: Strict CSP with only necessary exceptions

### API Integration

- Weather API calls to `api.openweathermap.org` are explicitly allowed
- Vercel domains are whitelisted for production features

### Future Enhancements

- Rate limiting implementation
- CORS configuration if needed
- Additional security middleware (helmet, etc.)

## 📚 Additional Resources

- [OWASP Security Headers](https://owasp.org/www-project-sec-headers/)
- [MDN Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Vercel Headers Documentation](https://vercel.com/docs/concepts/projects/project-configuration#headers)

## 🔍 Monitoring

Regularly check security headers using:

1. Browser DevTools Network tab
2. Security testing tools (OWASP ZAP, Burp Suite)
3. Online security header checkers
4. Automated testing in CI/CD pipeline
5. **npm run test:security** - Built-in security validation

## 🚨 CSP Troubleshooting

### Common CSP Violations

If you see CSP violations in the browser console, check these common issues:

#### **Google Fonts Not Loading**

- **Error**: `Refused to load stylesheet from 'https://fonts.googleapis.com'`
- **Solution**: Ensure CSP includes `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`
- **Current Status**: ✅ Fixed - Google Fonts are properly allowed

#### **External Scripts Blocked**

- **Error**: `Refused to execute inline script`
- **Solution**: Add external domain to `script-src` directive if needed
- **Current Status**: ✅ Configured - Only trusted sources allowed

#### **Images Not Loading**

- **Error**: `Refused to load image from external domain`
- **Solution**: Check `img-src` directive includes necessary domains
- **Current Status**: ✅ Configured - `img-src 'self' data: https:` allows external images

### Debugging CSP Issues

1. **Check Browser Console**: Look for CSP violation messages
2. **Verify Current CSP**: Use `curl -I | grep Content-Security-Policy`
3. **Test Security Headers**: Run `npm run test:security`
4. **Update Configuration**: Modify `src/config/security.ts` as needed
5. **Restart Server**: Changes require server restart to take effect

### Adding New External Resources

When adding new external resources (CDNs, APIs, etc.):

1. **Identify the resource type** (script, style, font, image, etc.)
2. **Add to appropriate CSP directive** in `src/config/security.ts`
3. **Include in both development and production** configurations
4. **Test thoroughly** to ensure no CSP violations
5. **Document the change** in this file

### Development vs Production CSP Differences

#### **Development-Specific Allowances**

- **WebSocket Connections**: `ws://localhost:*` and `ws://127.0.0.1:*` for Vite HMR
- **Inline Scripts**: `'unsafe-inline'` for development convenience
- **Eval**: `'unsafe-eval'` for Vite's development features

#### **Production Restrictions**

- **No WebSocket Connections**: Not needed for production
- **Stricter Scripts**: Limited to trusted domains only
- **HTTPS Only**: `upgrade-insecure-requests` enforced
- **Vercel Domains**: Only whitelisted production domains

#### **Why These Differences Matter**

- **Development**: Needs flexibility for hot reloading and debugging
- **Production**: Maximum security with minimal external dependencies
- **HMR**: WebSocket connections only needed during development
- **Security**: Production maintains strict CSP without development conveniences

## ⚠️ Important Notes

- Security headers are applied at the server level
- CSP policies are environment-specific
- All critical security headers are marked as required
- Regular security audits are recommended
- Keep dependencies updated for security patches
- Use the built-in security test script for validation

## 🚀 Quick Start

1. **Start development server**: `npm run dev`
2. **Test security headers**: `npm run test:security`
3. **Verify all headers pass**: Should show 8/8 passed
4. **Deploy to production**: Security headers automatically applied via Vercel
