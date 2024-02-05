import os from 'os';

export const systemData = (arg) => {
  switch (arg) {
    case '--eol':
    case '--EOL':
      console.log(`Your OS-specific end-of-line marker: ${JSON.stringify(os.EOL)}`);
      break;
    case '--cpus':
      const cpus = os.cpus();
      const list = cpus.map((cpu) => ({ Model: cpu.model.trim(), ['Clock rate']: `${cpu.speed / 1000} GHz`}))
      console.log(`Your overall number of CPUs: ${cpus.length}`);
      console.table(list);
      break;
    case '--homedir':
      console.log(`Your home directory: ${os.homedir()}`);
      break;
    case '--username':
      console.log(`Your system user name: ${os.userInfo().username}`);
      break;
    case '--architecture':
      console.log(`Your processor architecture: ${process.arch}`);
      break;
    default:
      console.log('Invalid input!');
  }
}
