export function createFetchRequest(url: string): Request {
  const origin = 'http://localhost';
  const urlObj = new URL(url, origin);

  const headers = new Headers();
  headers.set(
    'Accept',
    'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
  );
  headers.set('Accept-Language', 'en-US,en;q=0.5');
  headers.set('Accept-Encoding', 'gzip, deflate');
  headers.set('Connection', 'keep-alive');
  headers.set('Upgrade-Insecure-Requests', '1');

  return new Request(urlObj.href, {
    method: 'GET',
    headers,
    signal: undefined as AbortSignal | undefined,
  });
}
