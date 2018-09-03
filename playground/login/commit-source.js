const fs = require('fs')
const data = fs.readFileSync('/Users/larry/Library/Application Support/微信web开发者工具/Default/debug.wx')
const payload = {
  destPath:
    '/Users/larry/Library/Application Support/微信web开发者工具/Weappdest/debug.wx',
    // 'C:\\Users\\songlr\\AppData\\Local\\微信web开发者工具\\User Data\\Weappdest\\debug.wx',
  totalSize: data.length,
  fileMd5Info: {},
  data
}
const testDir = `/Users/larry/Library/Application Support/微信web开发者工具/Weappdest/debug`
// const testDir = `C:\\Users\\songlr\\AppData\\Local\\微信web开发者工具\\User Data\\Weappdest\\debug`

require('../modify-store')

const f15 = require('./f-15ba')
const prepare = require('../upload-prepare')

const commit = async () => {
  const b = await prepare(payload, testDir)

  console.warn(b)
  return f15(b, (...x) => {
    console.warn('b', x)
  })
}

module.exports = commit
