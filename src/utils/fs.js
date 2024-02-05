import { createReadStream, createWriteStream } from 'fs';
import fs from 'fs/promises';
import { stdin as input, stdout as output } from 'process';
import { pipeline } from 'stream/promises';
import path from 'path';

export const readAndPrintFile = async (path) => {
  const readStream = createReadStream(path, 'utf-8');
  readStream.on('error', () => {
    console.log('Operation failed!');
  });
  readStream.pipe(output);
  readStream.on('end', () => {
    console.log('');
  });
};

export const createFile = async (path) => {
  // check existence here

  await fs.writeFile(path, '');
  console.log('Operation succeeded!');
}

export const renameFile = async (path, newPath) => {
  // check existence here

  await fs.rename(path, newPath);
  console.log('Operation succeeded!');
}

export const copyFile = async (oldPath, dir) => {
  // check existence here

  // const newPath = `${dir}/${path.basename(oldPath)}`;
  const newPath = path.join(dir, path.basename(oldPath));
  const readStream = createReadStream(oldPath);
  const writeStream = createWriteStream(newPath);
  await pipeline(readStream, writeStream);
}

export const deleteFile = async (path) => {
  // check existence here

  await fs.unlink(path);
  console.log('Operation succeeded!');
}

export const moveFile = async (oldPath, dir) => {
  // check existence here
  
  await copyFile(oldPath, dir);
  await deleteFile(oldPath);
  
}