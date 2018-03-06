import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { stringifyStream } from '../src';
import { stringify } from 'zipson';

chai.use(chaiAsPromised);

describe('stringify-stream', function() {
  it('shouldEmitErrorOnStringifyError', function() {
    const circular: any = {};
    circular.y = circular;
    const stream = stringifyStream(circular);
    return expect(new Promise((resolve, reject) => {
      stream.on('end', resolve);
      stream.on('error', reject);
    })).to.eventually.be.rejected;
  });

  it('shouldEndWithStringifiedData', function() {
    const data: any = { x: 123, y: 456 };
    const stream = stringifyStream(data);

    let streamData = '';
    return expect(new Promise((resolve, reject) => {
      stream.on('data', d => streamData += d.toString());
      stream.on('end', () => resolve(streamData));
      stream.on('error', reject);
    })).to.eventually.equal(stringify(data));
  });
});