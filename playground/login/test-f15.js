const fs = require('fs')
const data = fs.readFileSync('../debug.wx')
const payload = {
  destPath:
    'C:\\Users\\songlr\\AppData\\Local\\微信web开发者工具\\User Data\\Weappdest\\debug.wx',
  totalSize: data.length,
  fileMd5Info: {},
  data
}
const testDir = `C:\\Users\\songlr\\AppData\\Local\\微信web开发者工具\\User Data\\Weappdest\\debug`

require('../modify-store')

const f15 = require('./f-15ba')
const prepare = require('../upload-prepare')
;(async () => {
  const b = await prepare(payload, testDir)

  console.warn(b)
  f15(b, (...x) => {
    console.warn(x)
  })
})()
