import { suite, test, only } from 'mocha-typescript';
import { expect } from 'chai';
import { ZipsonStreamWriter } from '../src';
import { stringify, stringifyTo } from 'zipson';

@suite class ParseStream {
  @test shouldWriteEachChunkUnbuffered() {
    const writer = new ZipsonStreamWriter(0);
    const chunks: string[] = [];
    writer.stream.on('data', d => chunks.push(d.toString()));
    stringifyTo([1, 2, 3, 4, 5, 6], writer);
    expect(chunks).to.have.length(8);
    expect(chunks.join('')).to.equal(stringify([1, 2, 3, 4, 5, 6]));
  }

  @test shouldWriteEntireDataBuffered() {
    const writer = new ZipsonStreamWriter(1000);
    const chunks: string[] = [];
    writer.stream.on('data', d => chunks.push(d.toString()));
    stringifyTo([1, 2, 3, 4, 5, 6], writer);
    expect(chunks).to.have.length(1);
    expect(chunks.join('')).to.equal(stringify([1, 2, 3, 4, 5, 6]));
  }
}