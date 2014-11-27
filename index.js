'use strict';

var path = require('path');
var fs = require('fs');
var less = require('less');
var Promise = require('promise');
var npmPlugin = require('less-plugin-npm-import');
var urlPlugin = require('less-plugin-inline-urls');
var readFile = Promise.denodeify(fs.readFile);

exports.name = 'less';
exports.outputFormat = 'css';

exports.render = function (str, options) {
  options = options || {};
  options.plugins = options.plugins || [];
  options.plugins.push(npmPlugin);
  options.plugins.push(urlPlugin);

  options.syncImport = true;

  var result;
  less.render(str, options, function (err, res) {
    if (err) throw err;
    result = {body: res.css, dependencies: res.imports};
  });
  if (!result) {
    throw new Error('less compilation could not complete synchronously.');
  }
  return result;
};
exports.renderAsync = function (str, options) {
  options = options || {};
  options.plugins = options.plugins || [];
  options.plugins.push(npmPlugin);
  options.plugins.push(urlPlugin);

  return less.render(str, options).then(function (res) {
    return {body: res.css, dependencies: res.imports};
  });
};

exports.renderFile = function (filename, options) {
  options = options || {};
  options.filename = path.resolve(filename);
  var str = fs.readFileSync(filename, 'utf8');
  return exports.render(str, options);
};
exports.renderFileAsync = function (filename, options) {
  options = options || {};
  options.filename = path.resolve(filename);
  return readFile(filename, 'utf8').then(function (str) {
    return exports.renderAsync(str, options);
  });
};
