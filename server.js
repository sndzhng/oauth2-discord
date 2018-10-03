const express = require('express');
const path = require('path');

const appp = express();

appp.get('/index', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

appp.listen(7087, () => {
  console.info('running on port 7087')
});

appp.use('/api/discord', require('./api/discord'));

appp.use((err, req, res, next) => {
  switch (err.message) {
    case 'NoCodeProvided':
      return res.status(400).send({
        status: 'ERROR',
        error: err.message,
      });
    default:
      return res.status(500).send({
        status: 'ERROR',
        error: err.message,
      });
  }
});
