import fs from 'fs/promises';

export const pathExists = async (path) => {
  try {
    await fs.access(path, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

export const isDirectory = async (path) => {
  try {
    return (await fs.stat(path)).isDirectory();
  } catch {
    return false;
  }
};

export const isFile = async (path) => {
  try {
    return (await fs.stat(path)).isFile();
  } catch {
    return false;
  }
};
