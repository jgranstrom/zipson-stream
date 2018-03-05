import { PassThrough } from 'stream';
import { ZipsonWriter } from 'zipson';

/**
 * Write each part of the stringified data to a stream
 * Buffered by provided buffer size
 */
export class ZipsonStreamWriter extends ZipsonWriter {
  private _stream: PassThrough = new PassThrough();
  private _buffer: string = '';

  constructor(private bufferThreshold: number = 250) { super(); }

  write(data: string) {
    this._buffer += data;
    if(this._buffer.length > this.bufferThreshold) {
      this._stream.push(this._buffer);
      this._buffer = '';
    }
  }

  end() {
    if(this._buffer.length > 0) {
      this._stream.push(this._buffer);
      this._buffer = '';
    }
    this._stream.push(null);
  }

  get stream() {
    return this._stream;
  }
}
