const path = require('path')
const config = require('./config')

module.exports = {
  resolve: str => path.resolve(config.ideFolder, str || '')
}
