import fs from 'fs/promises';

// This function is to validate the path
export const cd = async ([path]) => {
  return fs.access(path, fs.constants.F_OK)
    .then(() => path)
    .catch(() => null)
  // await fs.stats.isDirectory(path) ? null : () => {throw new Error()};
  // return path;
};

export const ls = async (path) => {
  const content = await fs.readdir(path, { withFileTypes: true });
  content.sort((a, b) => a.isFile() - b.isFile());
  const list = content
    .filter((el) => !el.isSymbolicLink())
    .map((el) => ({ Name: el.name, Type: el.isFile() ? 'file' : 'directory' }));
  console.table(list);  
}