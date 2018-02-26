const express = require('express');
const path = require('path');
const rpi = require('../index');

const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => res.sendfile(path.resolve('public/index.html')));

app.get('/status', (req, res) => {
  console.log(rpi.getStatus());
  res.json({ status: rpi.getStatus() });
});

app.post('/enable', (req, res) => {
  res.json({ status: rpi.activeRemoteControl() });
});

app.post('/disable', (req, res) => {
  res.json({ status: rpi.disableRemoteControl() });
});

app.listen(3000, () =>
  console.log('app started and listening on http://localhost:3000')
);
