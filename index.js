'use strict';

var path = require('path');
var fs = require('fs');
var less = require('less');
var Promise = require('promise');
var readFile = Promise.denodeify(fs.readFile);

exports.name = 'less';
exports.outputFormat = 'css';

function parseLocals (locals) {
  var str = '\n'
  var names = Object.keys(locals)
  for (var i = 0; i < names.length; i++) {
    var obj = locals[names[i]]
    var objType = typeof locals[names[i]]
    switch (objType) {
      case 'string':
        str += '\n@' + names[i] + ':' + obj + ';';
        break;
      case 'object':
        if (Array.isArray(obj))
          str += '\n@' + names[i] + ':' + obj.join(', ') + ';';
        else {
          var keys = Object.keys(obj)
          var map = keys.map(function(key) {
            return key + ' ' + obj[key].toString()
          })
          str += '\n@' + names[i] + ':' + map.join(', ') + ';';
        }
        break;
      default:
        console.warn('Unrecognized variable type:', names[i], objType);
    }
  }
  return str + '\n';
}

exports.render = function (str, options, locals) {
  options = options || {};
  locals = locals || {};
  options.plugins = options.plugins || [];
  if (Array.isArray(options.plugins)) {
    options.plugins = options.plugins.map(function (name) {
      if (typeof name === 'string') {
        return require('less-plugin-' + name);
      } else {
        return name;
      }
    });
  }

  options.syncImport = true;

  str += parseLocals(locals);

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
exports.renderAsync = function (str, options, locals) {
  options = options || {};
  locals = locals || {};
  options.plugins = options.plugins || [];
  if (Array.isArray(options.plugins)) {
    options.plugins = options.plugins.map(function (name) {
      if (typeof name === 'string') {
        return require('less-plugin-' + name);
      } else {
        return name;
      }
    });
  }

  str += parseLocals(locals);

  return less.render(str, options).then(function (res) {
    return {body: res.css, dependencies: res.imports};
  });
};

exports.renderFile = function (filename, options, locals) {
  options = options || {};
  locals = locals || {};
  options.filename = path.resolve(filename);
  var str = fs.readFileSync(filename, 'utf8');
  str += parseLocals(locals);
  return exports.render(str, options);
};
exports.renderFileAsync = function (filename, options, locals) {
  options = options || {};
  locals = locals || {};
  options.filename = path.resolve(filename);
  return readFile(filename, 'utf8').then(function (str) {
    str += parseLocals(locals);
    return exports.renderAsync(str, options);
  });
};
