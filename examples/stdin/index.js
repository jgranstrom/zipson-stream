const { parseStream } = require('../../lib');

parseStream(process.stdin)
.then(console.log);