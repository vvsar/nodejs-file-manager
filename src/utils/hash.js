import { createReadStream } from 'fs';
import { createHash } from 'node:crypto';
import * as check from '../helpers/checkers.js';

export const calculateHash = async (pth) => {
  if (await check.pathExists(pth)) {
    if (await check.isFile(pth)) {
      const readStream = createReadStream(pth, 'utf-8');
      const hash = createHash('sha256');
      readStream.on('error', () => {
        console.log('Operation failed!');
      });
      readStream.on('data', (data) => {
        hash.update(data);
      })
      readStream.on('end', () => {
        console.log(hash.digest('hex'));
      });
    } else {
      console.log('Operation failed: the path is not to file');
      return;
    }
  } else {
    console.log('Operation failed: no such file.');
    return;
  }
}
