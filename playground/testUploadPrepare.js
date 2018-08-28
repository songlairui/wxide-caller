const fs = require('fs')
const data = fs.readFileSync('./debug.wx')
const payload = {
  destPath:
    'C:\\Users\\songlr\\AppData\\Local\\微信web开发者工具\\User Data\\Weappdest\\debug.wx',
  totalSize: data.length,
  fileMd5Info: {},
  data
}
const testDir = `C:\\Users\\songlr\\AppData\\Local\\微信web开发者工具\\User Data\\Weappdest\\1535357212080`

const main = require('./upload-prepare')
;(async () => {
  const result = await main(payload, testDir)
  console.info(result)
})()
