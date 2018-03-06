import { describe, it } from 'mocha';
import { expect } from 'chai';
import { ZipsonStreamWriter } from '../src/ZipsonStreamWriter';
import { stringify, stringifyTo } from 'zipson';

describe('stream-writer', function() {
  it('shouldWriteEachChunkUnbuffered', function() {
    const writer = new ZipsonStreamWriter(0);
    const chunks: string[] = [];
    writer.stream.on('data', d => chunks.push(d.toString()));
    stringifyTo([1, 2, 3, 4, 5, 6], writer);
    expect(chunks).to.have.length(8);
    expect(chunks.join('')).to.equal(stringify([1, 2, 3, 4, 5, 6]));
  });

  it('shouldWriteEntireDataBuffered', function() {
    const writer = new ZipsonStreamWriter(1000);
    const chunks: string[] = [];
    writer.stream.on('data', d => chunks.push(d.toString()));
    stringifyTo([1, 2, 3, 4, 5, 6], writer);
    expect(chunks).to.have.length(1);
    expect(chunks.join('')).to.equal(stringify([1, 2, 3, 4, 5, 6]));
  });
});