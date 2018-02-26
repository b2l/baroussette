const execSync = require('child_process').execSync;
const PIN = 1;
const OFF = 1;
const ON = 0;

const status = {
  0: 'ON',
  1: 'OFF',
};

function setOut() {
  const cmd = `gpio mode ${PIN} out`;
  execSync(cmd).toString();
}

function activeRemoteControl() {
  const cmd = `gpio write ${PIN} ${ON}`;
  execSync(cmd).toString();
  return getStatus();
}

function disableRemoteControl() {
  const cmd = `gpio write ${PIN} ${OFF}`;
  execSync(cmd).toString();
  return getStatus();
}

function getStatus() {
  const cmd = `gpio read ${PIN}`;
  const value = Number(execSync(cmd).toString());
  return status[value];
}

setOut();

module.exports = {
  setOut,
  getStatus,
  activeRemoteControl,
  disableRemoteControl,
};
