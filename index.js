const cache = require('memory-cache');
const execSync = require('child_process').execSync;
const gpio = require('./gpio')

const PIN = 1;

const status = {
  0: 'OFF',
  1: 'ON',
};

function setOut() {
  gpio.setMode(PIN, gpio.OUT)
}

function activeRemoteControl() {
  gpio.write(PIN, gpio.ON)
  return getStatus();
}

function disableRemoteControl() {
  gpio.write(PIN, gpio.OFF)
  return getStatus();
}

function getStatus() {
  const gpioStatus = gpio.read(PIN)
  return status[gpioStatus]
}

function readTemperature() {
  const cachedTemp = cache.get('temp');
  if (cachedTemp) return cachedTemp;

  const cmd = `/home/pi/baroussette/read_temperature`;
  let temperature;
  try {
    temperature = Number(execSync(cmd).toString());
  } catch(e) {
    temperature = Math.random() * 30
  }
  cache.put('temp', temperature, 1000 * 60);
  return temperature;
}

setOut();

module.exports = {
  setOut,
  getStatus,
  activeRemoteControl,
  disableRemoteControl,
  readTemperature,
};
