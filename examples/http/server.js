const { stringifyStream } = require('../../lib');
const { createServer } = require('http');

module.exports = function(cb) {
  const server = createServer((req, res) => {
    console.log('server got request for data');
    const data = [1, 2, 3, 4, 5, 6];

    console.log('server started stringifying and streaming result')
    stringifyStream(data, {}, 0).pipe(res);
  });

  server.listen(7777, () => {
    console.log('server listening on 7777');
    cb();
  });
}