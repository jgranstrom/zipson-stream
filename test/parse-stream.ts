import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { parseStream } from '../src';
import { PassThrough } from 'stream';
import { stringify } from 'zipson';

chai.use(chaiAsPromised);

describe('parse-stream', function() {
  it('shouldRejectOnParseError', function() {
    const stream = new PassThrough();
    stream.push('broken_stuff');
    stream.push(null);
    return expect(parseStream(stream)).to.eventually.be.rejected;
  });

  it('shouldRejectOnStreamError', function() {
    const stream = new PassThrough();
    setTimeout(() => { stream.emit('error', new Error('nope')); }, 1);
    return expect(parseStream(stream)).to.eventually.be.rejected;
  });

  it('shouldParseStream', function() {
    const stringified = stringify([1, 2, 3, 4, 5, 6]);
    const stream = new PassThrough();
    setTimeout(() => stream.push(stringified.slice(0, 2)), 1);
    setTimeout(() => stream.push(stringified.slice(2, 4)), 1);
    setTimeout(() => stream.push(stringified.slice(4, 6)), 1);
    setTimeout(() => stream.push(stringified.slice(6, 8)), 1);
    setTimeout(() => stream.push(null), 1);
    return expect(parseStream(stream)).to.eventually.deep.equal([1, 2, 3, 4, 5, 6]);
  });
});