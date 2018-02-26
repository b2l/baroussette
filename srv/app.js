const express = require('express');
const path = require('path');
const rpi = require('../index');

const app = express();
app.use(express.static(`${__dirname}/../public`));

app.get('/', (req, res) =>
  res.sendfile(path.resolve(`${__dirname}/../public/index.html`))
);

app.get('/status', (req, res) => {
  res.json({
    status: rpi.getStatus(),
    temperature: rpi.readTemperature(),
  });
});

app.post('/enable', (req, res) => {
  res.json({
    status: rpi.activeRemoteControl(),
    temperature: rpi.readTemperature(),
  });
});

app.post('/disable', (req, res) => {
  res.json({
    status: rpi.disableRemoteControl(),
    temperature: rpi.readTemperature(),
  });
});

app.listen(3000, () =>
  console.log('app started and listening on http://localhost:3000')
);
