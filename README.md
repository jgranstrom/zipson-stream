# zipson-stream

[![Build Status](https://travis-ci.org/jgranstrom/zipson-stream.svg?branch=master&style=flat)](https://travis-ci.org/jgranstrom/zipson-stream)
[![npm version](https://badge.fury.io/js/zipson-stream.svg)](http://badge.fury.io/js/zipson-stream)
[![dependencies Status](https://david-dm.org/jgranstrom/zipson-stream/status.svg)](https://david-dm.org/jgranstrom/zipson-stream)
[![devDependencies Status](https://david-dm.org/jgranstrom/zipson-stream/dev-status.svg)](https://david-dm.org/jgranstrom/zipson-stream?type=dev)

zipson-stream adds node stream support to [zipson](https://github.com/jgranstrom/zipson), a JSON.parse/stringify alternative with added compression.

Try zipson with the [online demo](https://jgranstrom.github.io/zipson/)

---

- [Installing](#installing)
- [API](#api)
  - [`stringifyStream(data, options?)`](#stringifystreamdata-options)
  - [`parseStream(stream)`](#parsestreamstream)
- [Running the tests](#running-the-tests)
- [Contributing](#contributing)
- [Versioning](#versioning)
- [License](#license)

### Installing

`npm install --save zipson-stream`

### API

##### `stringifyStream(data, options?)`

Stringify data to a zipson stream. Compression options can be provided according to [zipson documentation](https://github.com/jgranstrom/zipson#options)

```javascript
import { stringifyStream } from 'zipson-stream';
// const { stringifyStream } = require('zipson-stream');

const myData = [1, 2, 3, 4 ,5];
const stream = stringifyStream(myData, options);
stream.pipe(process.stdout);
```

##### `parseStream(stream)`

Parse a zipson stream, resolves with the parsed data when the stream ends.

```javascript
import { parseStream } from 'zipson-stream';
// const { parseStream } = require('zipson-stream');

parseStream(myStringifiedStream)
.then(parsedData => {
  console.log(parsedData);
});
```

### Running the tests

```npm test```

For running tests in watch mode while developing:

```npm run testw```

### Contributing

Pull requests are welcome. Please see the [conventional commits](https://conventionalcommits.org/) guidelines for commit message formatting.

### Versioning

This project is versioned using [SemVer](http://semver.org/) See [tags](https://github.com/jgranstrom/zipson-stream/tags) and [CHANGELOG.md](CHANGELOG.md) for version details.

### License

This project is licensed under the MIT License - see [LICENSE.md](LICENSE.md) file for details
