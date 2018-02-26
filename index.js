const execSync = require('child_process').execSync;
const PIN = 1;
const OFF = 1;
const ON = 0;

function setOut() {
  const cmd = `gpio mode ${PIN} out`;
  console.log(cmd);
  console.log(execSync(cmd).toString());
}

function activeRemoteControl() {
  const cmd = `gpio write ${PIN} ${ON}`;
  console.log(cmd);
  console.log(execSync(cmd).toString());
  getStatus();
}

function disableRemoteControl() {
  const cmd = `gpio write ${PIN} ${OFF}`;
  console.log(cmd);
  console.log(execSync(cmd).toString());
  getStatus();
}

function getStatus() {
  const cmd = `gpio read ${PIN}`;
  console.log(cmd);
  console.log(execSync(cmd).toString());
}

setOut();

const command = process.argv[2];
if (command.match(/^on|ON|On$/)) activeRemoteControl();
else if (command.match(/^off|OFF|Off$/)) disableRemoteControl();
else if (command.match(/^read$/)) getStatus();
else
  console.log(
    "I don't understand your command, you can only turn the remote control ON or OFF"
  );
