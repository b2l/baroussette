const execSync = require('child_process').execSync;

let __hasGpio;
function hasGpio() {
  const cmd = 'command gpio';
  if (__hasGpio !== undefined) {
    return __hasGpio;
  }
  try {
    execSync(cmd)
    __hasGpio = true;
  } catch(e) {
    __hasGpio = false;
  }
  return __hasGpio;
}
let status = 0;
const gpio = {
  ON: 0,
  OFF: 1,
  OUT: 'out',
  IN: 'in',
  setMode(pin, mode) {
    const cmd = `gpio mode ${pin} ${mode}`
    hasGpio() ? execSync(cmd).toString() : true;
  },
  write(pin, value) {
    const cmd = `gpio write ${pin} ${value}`;
    status = hasGpio() ? execSync(cmd).toString() : value;
    return status
  },
  read(pin) {
    const cmd = `gpio read ${pin}`;
    return hasGpio() ? Number(execSync(cmd).toString()) : status;
  }
}

module.exports = gpio;