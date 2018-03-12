const { parseStream, stringifyStream } = require('../../lib');
const { createReadStream, createWriteStream } = require('fs');

const writeStream = createWriteStream('./zipson-data');

console.log('writing file');
const data = []
for(let i = 0; i < 10; i++) {
  data.push({ x: i });
}

stringifyStream(data, {}, 0)
.pipe(writeStream);

writeStream.on('close', () => {
  console.log('reading file');
  const readStream = createReadStream('./zipson-data');
  parseStream(readStream)
  .then(data => {
    console.log(data);
  });
});
