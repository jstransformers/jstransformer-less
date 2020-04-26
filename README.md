# jstransformer-less

[LESS](http://lesscss.org) support for [JSTransformers](http://github.com/jstransformers).

[![Build Status](https://img.shields.io/travis/jstransformers/jstransformer-less/master.svg)](https://travis-ci.org/jstransformers/jstransformer-less)
[![Coverage Status](https://img.shields.io/codecov/c/github/jstransformers/jstransformer-less/master.svg)](https://codecov.io/gh/jstransformers/jstransformer-less)
[![Dependencies Status](https://david-dm.org/jstransformers/jstransformer-less/status.svg)](https://david-dm.org/jstransformers/jstransformer-less)
[![NPM version](https://img.shields.io/npm/v/jstransformer-less.svg)](https://www.npmjs.org/package/jstransformer-less)

## Installation

    npm install jstransformer-less

## API

```js
var less = require('jstransformer')(require('jstransformer-less'))

less.render('#header { .navigation { font-size: 5px; } }').body
//=> '#header .navigation { font-size: 5px; }'
```

## License

MIT
