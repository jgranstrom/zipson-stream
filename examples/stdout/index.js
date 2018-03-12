const { stringifyStream } = require('../../lib');

const data = []
for(let i = 0; i < 10000; i++) {  data.push({ x: i }); }

stringifyStream(data, {}, 0)
.pipe(process.stdout);