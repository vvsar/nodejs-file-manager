import process from 'process';

const welcome = (name) => {
  console.log(`Welcome to the File Manager, ${name}!`);
}

const farewell = (name) => {
  console.log(`Thank you for using File Manager, ${name}, goodbye!`)
}

const usernameEntry = process.argv.slice(2).find((el) => el.includes('--username='));
const username = usernameEntry ? usernameEntry.replace('--username=', '').trim() : 'anonim';

welcome(username);
process.on('exit', () => {
  farewell(username);
});