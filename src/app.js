import os from 'os';
import { stdin as input, stdout as output } from 'process';
import * as readline from 'readline/promises';

export class App {
  constructor() {
    this._currentPath = os.homedir();
  }

  async start() {
    const rl = readline.createInterface({ input, output });
    while(true) {
      output.write(`You are currently in ${this._currentPath}\n`);
      break;
    }
  }
}

