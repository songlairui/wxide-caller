const { rrequire } = require('../utils')

const e = require('path'),
  m = rrequire('./e5fa35c3c8e81bc6466b4b8eb436113b.js'),
  // t =`/Users/larry/Library/Application Support/微信web开发者工具/Weappdest`
  t =
    'C:\\Users\\songlr\\AppData\\Local\\微信web开发者工具\\User Data\\Weappdest'

const s = console.warn.bind(console)

// const testDir = `/Users/larry/Library/Application Support/微信web开发者工具/Default/debug`
const testDir = `C:\\Users\\songlr\\AppData\\Local\\微信web开发者工具\\User Data\\Weappdest\\debug`

async function main(A = testDir) {
  s('packstart', '正在打包')
  let J = e.join(t, `debug.wx`)
  let K = await m(A, J)
  // c.unlink(J, () => {})
  s('packend', '打包完成')
  return K
}

module.exports = main
