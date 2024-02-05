import fs from 'fs/promises';
import path from 'path';
import * as check from '../helpers/checkers.js';

export const cd = async (pth) => {
  if (await check.pathExists(pth)) {
    if (await check.isDirectory(pth)) {
      return pth;
    } else {
      return path.dirname(pth);
    }
  } else {
    let newPth = path.resolve(pth, '..');
    while (!(await check.pathExists(newPth))) {
      newPth = path.resolve(newPth, '..');
    }
    console.log('Operation failed: no such directory.');
    return newPth;
  }
};

export const ls = async (pth) => {
  const content = await fs.readdir(pth, { withFileTypes: true });
  content.sort((a, b) => a.isFile() - b.isFile());
  const list = content
    .filter((el) => !el.isSymbolicLink())
    .map((el) => ({ Name: el.name, Type: el.isFile() ? 'file' : 'directory' }));
  console.table(list);  
}