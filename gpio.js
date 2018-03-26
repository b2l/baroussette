const execSync = require('child_process').execSync;

let __hasGpio;
function hasGpio() {
  const cmd = 'command -v gpio';
  if (__hasGpio !== undefined) {
    return __hasGpio;
  }
  let result;
  try {
    execSync(cmd)
    result = true;
  } catch(e) {
    result = false;
  }
  __hasGpio = result;  
  return __hasGpio;
}
console.log(`hasGpio? ${hasGpio()}`)

let status = 0;
const gpio = {
  ON: 1,
  OFF: 0,
  OUT: 'out',
  IN: 'in',
  setMode(pin, mode) {
    const cmd = `gpio mode ${pin} ${mode}`;
    hasGpio() ? execSync(cmd).toString() : true;
  },
  write(pin, value) {
    const cmd = `gpio write ${pin} ${value}`;
    if (hasGpio()) {
      execSync(cmd);
    }
    status = this.read(pin);
    return status
  },
  read(pin) {
    const cmd = `gpio read ${pin}`;
    return hasGpio() ? Number(execSync(cmd).toString()) : status;
  }
}

module.exports = gpio;
