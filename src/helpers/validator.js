export const validateInput = (command, args) => {
  switch (command) {
    case 'up':
    case 'ls':
      return true;

    case 'cd':
    case 'cat':
    case 'add':  
    case 'rm':
    case 'os':
    case 'hash':
      return args[0] ? true : false;

    case 'mv':
    case 'cp':
    case 'rn':  
    case 'compress':
    case 'decompress':
      return args[0] && args[1] ? true : false;

    default:
      return false;  
  }
}
