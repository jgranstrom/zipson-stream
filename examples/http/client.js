const http = require('http');
const { parseStream } = require('../../lib');

http.get('http://localhost:7777', res => {
  console.log('client started getting response from server');

  res.on('data', d => {
    console.log('client got raw data', d.toString());
  });

  parseStream(res)
  .then(data => {
    console.log('client got parsed data', data);
    process.exit(0);
  })
});