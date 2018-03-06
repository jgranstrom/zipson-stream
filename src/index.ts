import { Readable } from 'stream';
import { stringifyTo, parseIncremental, CompressOptions } from 'zipson';
import { ZipsonStreamWriter } from './ZipsonStreamWriter';

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

/**
 * Stringify data to a stream of zipson output
 * Any errors during stringifying will be emitted as en error event on the stream.
 * Pass an optional bufferThreshold to set a minimum size of chunks written to the stream.
 * Returns the stream of zipson output
 */
export function stringifyStream(data: any, options?: CompressOptions, bufferThreshold?: number): Readable {
  const writer = new ZipsonStreamWriter(bufferThreshold);

  // Defer stringify in order to return stream and proxy errors
  setTimeout(() => {
    try {
      stringifyTo(data, writer, options);
    } catch(e) {
      writer.stream.emit('error', e);
    }
  }, 0);

  return writer.stream;
}