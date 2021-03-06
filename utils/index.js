const path = require('path')
const config = require('./config')

const resolve = str => path.join(config.ideFolder, str || '')
const rrequire = str => require(resolve(str))

module.exports = {
  resolve,
  rrequire
}
