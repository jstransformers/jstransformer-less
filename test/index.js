'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');

var transform = require('../');

var input = fs.readFileSync(__dirname + '/input.less', 'utf8');
var expected = fs.readFileSync(__dirname + '/expected.css', 'utf8');
var expectedImport = fs.readFileSync(__dirname + '/expected-import.css', 'utf8');


var res = transform.render(input);
fs.writeFileSync(__dirname + '/output.css', res.body);
assert(res.body === expected, 'output.css should equal expected.css');
assert.deepEqual(res.dependencies, [], 'expected dependencies to be an empty array');

res = transform.renderFile(__dirname + '/input.less');
fs.writeFileSync(__dirname + '/output.css', res.body);
assert(res.body === expected, 'output.css should equal expected.css');
assert.deepEqual(res.dependencies, [], 'expected dependencies to be an empty array');

res = transform.renderFile(__dirname + '/import.less');
fs.writeFileSync(__dirname + '/output.css', res.body);
assert(res.body === expectedImport, 'output.css should equal expected-import.css');
assert.deepEqual(res.dependencies, [path.resolve(__dirname + '/input.less')]);


transform.renderAsync(input).then(function (res) {
  fs.writeFileSync(__dirname + '/output.css', res.body);
  assert(res.body === expected, 'output.css should equal expected.css');
  assert.deepEqual(res.dependencies, [], 'expected dependencies to be an empty array');
  return transform.renderFileAsync(__dirname + '/input.less');
}).then(function (res) {
  fs.writeFileSync(__dirname + '/output.css', res.body);
  assert(res.body === expected, 'output.css should equal expected.css');
  assert.deepEqual(res.dependencies, [], 'expected dependencies to be an empty array');
  return transform.renderFileAsync(__dirname + '/import.less');
}).then(function (res) {
  fs.writeFileSync(__dirname + '/output.css', res.body);
  assert(res.body === expectedImport, 'output.css should equal expected-import.css');
  assert.deepEqual(res.dependencies, [path.resolve(__dirname + '/input.less')]);
}).done(function () {
  console.log('test passed');
});
