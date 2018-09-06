const fs = require('fs')
const path = require('path')

// const testDir = `/Users/larry/Library/Application Support/微信web开发者工具/Weappdest/debug`
const testDir = `C:\\Users\\songlr\\AppData\\Local\\微信web开发者工具\\User Data\\Weappdest\\debug`

require('../modify-store')

const f15 = require('./f-15ba')
const prepare = require('../upload-prepare')

const commit = async ({ destPath } = {}) => {
  destPath = destPath || path.resolve(__dirname, '../debug.wx')
  const data = fs.readFileSync(destPath)
  const payload = {
    destPath,
    totalSize: data.length,
    fileMd5Info: {},
    data
  }
  const b = await prepare(payload, testDir)

  console.warn(b)
  return f15(b, (...x) => {
    console.warn('b', x)
  })
}

module.exports = commit
