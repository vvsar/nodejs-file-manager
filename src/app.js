import os from 'os';
import path from 'path';
import { stdin as input, stdout as output } from 'process';
import * as readline from 'readline/promises';
import { nwd, file } from './utils/operations.js';

export class App {
  constructor() {
    this._currentPath = os.homedir();
  }

  _resolvePath(segment) {
    return path.resolve(this._currentPath, segment);
  }

  // async up() {
  //   console.log(`--\nOld: ${this._currentPath}\n--`);
  //   this._currentPath = await nwd.cd(this._resolvePath('..'));
  //   console.log(`--\nNew: ${this._currentPath}\n--`);
  // }

  async up() {
    this._currentPath = this._resolvePath('..');
  }

  // async cd([pathToNewDir]) {
  //   this._currentPath = await nwd.cd(this._resolvePath(pathToNewDir));
  // }

  async cd([pathToNewDir]) {
    this._currentPath = this._resolvePath(pathToNewDir);
  }

  async ls() {
    await nwd.ls(this._currentPath);
  }

  async cat([pathToFile]) {
    await file.readAndPrintFile(this._resolvePath(pathToFile));
  }

  async add([pathToNewFile]) {
    await file.createFile(this._resolvePath(pathToNewFile));
  }

  async rn([pathToFile, newPathToFile]) {
    await file.renameFile(this._resolvePath(pathToFile), this._resolvePath(newPathToFile));
  }

  async cp([pathToFile, pathToNewDir]) {
    await file.copyFile(this._resolvePath(pathToFile), this._resolvePath(pathToNewDir));
  }

  async mv([pathToFile, pathToNewDir]) {
    await file.moveFile(this._resolvePath(pathToFile), this._resolvePath(pathToNewDir));
  }

  async rm([pathToFile]) {
    await file.deleteFile(this._resolvePath(pathToFile));
  }

  async start() {
    const rl = readline.createInterface({ input, output });
    while(true) {
      const inputText = await rl.question(`You are currently in ${this._currentPath}\n`);
      const [command, ...args] = inputText.split(' ');
      try {
        this[command](args);
      } catch (err) {
        console.log('Operation failed!');
      }
      
      
      // break;
    }
  }
}

