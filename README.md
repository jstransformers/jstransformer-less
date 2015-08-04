# jstransformer-less

[Less](http://lesscss.org) support for [JSTransformers](http://github.com/jstransformers).

[![Build Status](https://img.shields.io/travis/jstransformers/jstransformer-less/master.svg)](https://travis-ci.org/jstransformers/jstransformer-less)
[![Coverage Status](https://img.shields.io/coveralls/jstransformers/jstransformer-less/master.svg)](https://coveralls.io/r/jstransformers/jstransformer-less?branch=master)
[![Dependency Status](https://img.shields.io/david/jstransformers/jstransformer-less/master.svg)](http://david-dm.org/jstransformers/jstransformer-less)
[![NPM version](https://img.shields.io/npm/v/jstransformer-less.svg)](https://www.npmjs.org/package/jstransformer-less)

## Installation

    npm install jstransformer-less

## API

### Options

In addition to those passed off to Less, the following options are available:

#### `options.plugins`

If `options.plugins` is an array, it can contain string names like `npm-import` or `inline-urls`, representing modules that will be loaded as `require('less-plugin-' + name)`.

### Example

```js
var less = require('jstransformer')(require('jstransformer-less'))

less.render('#header { .navigation { font-size: 5px; } }').body
//=> '#header .navigation { font-size: 5px; }'
```

## License

MIT
