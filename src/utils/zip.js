import fs from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import * as check from '../helpers/checkers.js';

export const compress = async (pth, newPth) => {
  if (await check.pathExists(pth)) {
    if (await check.isFile(pth)) {
      const readStream = fs.createReadStream(pth);
      const writeStream = fs.createWriteStream(newPth);
      const brotliZip = createBrotliCompress();
      await pipeline(readStream, brotliZip, writeStream);
    } else {
      console.log('Operation failed: the path is not to file');
      return;
    }
  } else {
    console.log('Operation failed: no such file.');
    return;
  }
}

export const decompress = async (pth, newPth) => {
  if (await check.pathExists(pth)) {
    if (await check.isFile(pth)) {
      const readStream = fs.createReadStream(pth);
      const writeStream = fs.createWriteStream(newPth);
      const brotliUnzip = createBrotliDecompress();
      await pipeline(readStream, brotliUnzip, writeStream);
    } else {
      console.log('Operation failed: the path is not to file');
      return;
    }
  } else {
    console.log('Operation failed: no such file.');
    return;
  }
}
