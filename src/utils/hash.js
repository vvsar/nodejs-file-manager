import { createReadStream } from 'fs';
import { createHash } from 'node:crypto';

export const calculateHash = async (path) => {
  const readStream = createReadStream(path, 'utf-8');
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
};
