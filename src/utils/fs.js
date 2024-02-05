import { createReadStream, createWriteStream } from 'fs';
import fs from 'fs/promises';
import { stdout as output } from 'process';
import { pipeline } from 'stream/promises';
import path from 'path';
import * as check from '../helpers/checkers.js';

export const readAndPrintFile = async (pth) => {
  if (await check.pathExistsAndIsFile(pth)) {
    const readStream = createReadStream(pth, 'utf-8');
    readStream.on('error', () => {
      console.log('Operation failed!');
    });
    readStream.pipe(output);
    readStream.on('end', () => {
      console.log('');
    });
  } else {
    console.log('Operation failed: the source file does not exist or it is not a file');
    return;
  }
};

export const createFile = async (pth) => {
  if (await check.pathExists(pth)) {
    console.log('Operation failed: the target file already exists');
    return;
  }
  await fs.writeFile(pth, '');
};

export const renameFile = async (pth, newPth) => {
  if (await check.pathExistsAndIsFile(pth)) {
    if (await check.pathExists(newPth)) {
      console.log('Operation failed: the target file already exists');
      return;
    }
    await fs.rename(pth, newPth);
  } else {
    console.log('Operation failed: the source file does not exist or it is not a file');
  }
};

export const copyFile = async (oldPth, dir) => {
  if (await check.pathExistsAndIsFile(oldPth)) {
    const newPth = path.join(dir, path.basename(oldPth));
    if (!(await check.pathExists(dir))) {
      await fs.mkdir(dir);
    }
    if (!(await check.pathExists(newPth))) {
      const readStream = createReadStream(oldPth);
      const writeStream = createWriteStream(newPth);
      await pipeline(readStream, writeStream);
    } else {
      console.log('Operation failed: the target file already exists');
    }
  } else {
    console.log('Operation failed: the source file does not exist or it is not a file');
  }
};

export const deleteFile = async (pth) => {
  if (await check.pathExistsAndIsFile(pth)) {
    await fs.unlink(pth);
  } else {
    console.log('Operation failed: the source file does not exist or it is not a file');
  }
};

export const moveFile = async (oldPth, dir) => {
  await copyFile(oldPth, dir);
  await deleteFile(oldPth);
};
