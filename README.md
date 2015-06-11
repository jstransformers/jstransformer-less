# jstransformer-less

[Less](http://lesscss.org/) support for [JSTransformers](http://github.com/jstransformers).

[![Build Status](https://img.shields.io/travis/jstransformers/jstransformer-less/master.svg)](https://travis-ci.org/jstransformers/jstransformer-less)
[![Coverage Status](https://img.shields.io/coveralls/jstransformers/jstransformer-less/master.svg)](https://coveralls.io/r/jstransformers/jstransformer-less?branch=master)
[![Dependency Status](https://img.shields.io/david/jstransformers/jstransformer-less/master.svg)](http://david-dm.org/jstransformers/jstransformer-less)
[![NPM version](https://img.shields.io/npm/v/jstransformer-less.svg)](https://www.npmjs.org/package/jstransformer-less)

## Installation

    npm install jstransformer-less

## API

```js
var less = require('jstransformer')(require('jstransformer-less'))

less.renderFile('example.less').body
//=> Compiled CSS file
```

### Options

In addition to those that are passed through to less:
- if plugins is an array, it can contain string names like `'npm-import'` or `'inline-urls'` and this module will automatically `require('less-plugin-' + name)` for you.

## License

MIT
