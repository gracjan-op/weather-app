/**
 * Security Configuration
 *
 * This file contains all security-related configurations for the weather app.
 * It includes Content Security Policy, security headers, and other security measures.
 */

export const SECURITY_CONFIG = {
  CSP: {
    development: {
      'default-src': ["'self'"],
      'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      'style-src': [
        "'self'",
        "'unsafe-inline'",
        'https://fonts.googleapis.com',
      ],
      'font-src': ["'self'", 'data:', 'https://fonts.gstatic.com'],
      'img-src': ["'self'", 'data:', 'https:'],
      'connect-src': [
        "'self'",
        'https://api.openweathermap.org',
        'ws://localhost:*',
        'ws://127.0.0.1:*',
      ],
      'frame-ancestors': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
      'object-src': ["'none'"],
    },
    production: {
      'default-src': ["'self'"],
      'script-src': [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        'https://vercel.live',
        'https://vercel.com',
      ],
      'style-src': [
        "'self'",
        "'unsafe-inline'",
        'https://fonts.googleapis.com',
      ],
      'font-src': ["'self'", 'https://fonts.gstatic.com'],
      'img-src': ["'self'", 'data:', 'https:'],
      'connect-src': [
        "'self'",
        'https://api.openweathermap.org',
        'https://vercel.live',
      ],
      'frame-ancestors': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
      'object-src': ["'none'"],
      'upgrade-insecure-requests': [],
    },
  },

  HEADERS: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy':
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
    'X-DNS-Prefetch-Control': 'off',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  },

  ALLOWED_ORIGINS: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://weather-app-gr-opiela.vercel.app',
  ],

  // Rate Limiting (for future implementation)
  RATE_LIMIT: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
  },
};

/**
 * Builds a Content Security Policy string from the configuration
 */
export const buildCSP = (environment: 'development' | 'production'): string => {
  const policy = SECURITY_CONFIG.CSP[environment];

  return Object.entries(policy)
    .map(([key, values]) => {
      if (values.length === 0) {
        return key;
      }
      return `${key} ${values.join(' ')}`;
    })
    .join('; ');
};
