import { createReadStream } from 'fs';
import fs from 'fs/promises';
import { stdin as input, stdout as output } from 'process';

export const readAndPrint = async (path) => {
  const readStream = createReadStream(path, 'utf-8');
  readStream.on('error', () => {
    console.log('Operation failed!');
  });
  readStream.pipe(output);
  readStream.on('end', () => {
    console.log('');
  });
};