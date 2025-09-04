import * as dotenv from 'dotenv';
import express from 'express';
import * as fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SECURITY_CONFIG, buildCSP } from './src/config/security.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

// Pre-load production HTML template for better performance
const productionHtmlTemplate = isProduction
  ? await fs.readFile(path.join(__dirname, '..', 'client/index.html'), 'utf-8')
  : '';

// Create http server
const app = express();

// Security headers middleware
app.use((_req, res, next) => {
  try {
    // Apply all security headers from configuration
    Object.entries(SECURITY_CONFIG.HEADERS).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    // Set Content Security Policy based on environment
    const csp = buildCSP(isProduction ? 'production' : 'development');
    res.setHeader('Content-Security-Policy', csp);

    next();
  } catch (error) {
    console.error('Error applying security headers:', error);
    // Continue without security headers if there's an error
    next();
  }
});

// Add Vite or respective production middlewares
let vite: import('vite').ViteDevServer | undefined;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  app.use(vite.middlewares);
} else {
  // Compression middleware for gzipping responses to reduce bandwidth
  const compression = (await import('compression')).default;
  // Static file server for serving built client assets (CSS, JS, images)
  const sirvModule = await import('sirv');
  app.use(compression());
  app.use(
    base,
    sirvModule.default(path.join(__dirname, '..', 'client'), { extensions: [] })
  );
}

// Serve HTML
app.get('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');

    let currentHtmlTemplate: string;
    let render: any;

    if (!isProduction) {
      // Always read fresh template in development
      currentHtmlTemplate = await fs.readFile('./index.html', 'utf-8');
      currentHtmlTemplate = await vite!.transformIndexHtml(
        url,
        currentHtmlTemplate
      );
      render = (await vite!.ssrLoadModule('/src/entry-server.tsx')).render;
    } else {
      // Use pre-loaded production template
      currentHtmlTemplate = productionHtmlTemplate;
      // In production, use the built SSR bundle
      try {
        const entryServerPath = path.join(__dirname, 'entry-server.js');
        const entryServer = await import(entryServerPath);
        render = entryServer.render;
      } catch (error) {
        console.error('Failed to load SSR bundle:', error);
        // Fallback to static HTML if SSR fails
        res
          .status(200)
          .set({ 'Content-Type': 'text/html' })
          .send(currentHtmlTemplate);
        return;
      }
    }

    const rendered = await render(url);

    console.log('URL being rendered:', url);

    // Inject CSS link to prevent FOUC (Flash of Unstyled Content)
    // In development: use source CSS, in production: Vite handles this automatically
    const cssLink = !isProduction
      ? '<link rel="stylesheet" href="/src/styles/main.css" />'
      : '';

    const finalHtml = currentHtmlTemplate
      .replace(`<!--app-head-->`, cssLink + (rendered.head ?? ''))
      .replace(`<!--app-html-->`, rendered.html ?? '');

    res.status(200).set({ 'Content-Type': 'text/html' }).send(finalHtml);
  } catch (e: unknown) {
    if (e instanceof Error) {
      vite?.ssrFixStacktrace(e);
      console.log('Error during SSR:', e);
      res.status(500).end(e.stack);
    } else {
      console.log('Error during SSR:', e);
      res.status(500).end('Unknown error occurred');
    }
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
