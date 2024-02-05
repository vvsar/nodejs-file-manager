import fs from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';

export const compress = async (path, newPath) => {
  // validate files here

  const readStream = fs.createReadStream(path);
  const writeStream = fs.createWriteStream(newPath);
  const brotliZip = createBrotliCompress();
  await pipeline(readStream, brotliZip, writeStream);
}

export const decompress = async (path, newPath) => {
  // validate files here

  const readStream = fs.createReadStream(path);
  const writeStream = fs.createWriteStream(newPath);
  const brotliUnzip = createBrotliDecompress();
  await pipeline(readStream, brotliUnzip, writeStream);
}