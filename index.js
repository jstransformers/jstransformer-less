'use strict'

const path = require('path')
const fs = require('fs')
const less = require('less')

exports.name = 'less'
exports.outputFormat = 'css'

exports.render = function (str, options) {
  options = options || {}
  options.plugins = options.plugins || []
  if (Array.isArray(options.plugins)) {
    options.plugins = options.plugins.map(name => {
      if (typeof name === 'string') {
        return require('less-plugin-' + name)
      }

      return name
    })
  }

  options.syncImport = true

  let result
  less.render(str, options, (err, res) => {
    if (err) {
      throw err
    }

    result = {body: res.css, dependencies: res.imports}
  })
  if (!result) {
    throw new Error('less compilation could not complete synchronously.')
  }

  return result
}

exports.renderAsync = function (str, options) {
  options = options || {}
  options.plugins = options.plugins || []
  if (Array.isArray(options.plugins)) {
    options.plugins = options.plugins.map(name => {
      if (typeof name === 'string') {
        return require('less-plugin-' + name)
      }

      return name
    })
  }

  return less.render(str, options).then(res => {
    return {body: res.css, dependencies: res.imports}
  })
}

exports.renderFile = function (filename, options) {
  options = options || {}
  options.filename = path.resolve(filename)
  const str = fs.readFileSync(filename, 'utf8')
  return exports.render(str, options)
}

exports.renderFileAsync = function (filename, options) {
  return new Promise((resolve, reject) => {
    options = options || {}
    options.filename = path.resolve(filename)
    fs.readFile(filename, 'utf8', (err, str) => {
      if (err) {
        reject(err)
      } else {
        exports.renderAsync(str, options).then(resolve).catch(reject)
      }
    })
  })
}
