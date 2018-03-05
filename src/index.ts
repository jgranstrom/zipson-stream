import { Readable } from 'stream';
import { stringify, parseIncremental } from 'zipson';
export * from './ZipsonStreamWriter';

/**
 * Parse a stream of zipson data
 * Returns a promise that resolves with the parsed result
 */
export function parseStream(stream: Readable) {
  return new Promise<any>((resolve, reject) => {
    const increment = parseIncremental();
    stream.on('error', reject);
    stream.on('end', () => {
      try { resolve(increment(null)); }
      catch(e) { reject(e); }
    });
    stream.on('data', d => {
      try { increment(d.toString()); }
      catch(e) { reject(e); }
    });
  });
}
