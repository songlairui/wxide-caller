const { rrequire } = require('../utils')

// const tmp = require('./tmp.json')
// const j = {getState() {
//   return {
//     project:{
//       current: tmp
//     }
//   }
// }}
const j = rrequire('./bc78839ccca8df9e5ceeb7fae11b7be2.js')


const c = require('fs'),
  d = require('glob'),
  e = require('path'),
  w = rrequire('./1c8a8c710417d102ab574145dc51b4b0.js'),
  z = function(a, b) {
    return new Promise(c => {
      console.warn({ a, b })
      d(a, b, (a, b) => {
        a ? c([]) : c(b)
      })
    })
  }
const s = console.warn.bind(console)
const x = s

// const testDir = `/Users/larry/Library/Application Support/微信web开发者工具/Default/debug`
const testDir = `C:\\Users\\songlr\\AppData\\Local\\微信web开发者工具\\User Data\\Weappdest\\1535357212080`

async function main(A = testDir) {
  const i = j.getState().project.current
  s('globfiles', '正在对比文件列表')
  const B = [
    'node_modules/**/*',
    '**/node_modules/**',
    '**/.git/**',
    '.git/**/*',
    '**/.svn/**',
    '.svn/**/*',
    '.DS_Store',
    '**/.DS_Store'
  ]
  console.warn('||||||---------i', i)
  'plugin' === i.compileType && B.push('doc/**/*')
  console.warn({ cwd: A })
  let C = await z('**', {
    nodir: !0,
    ignore: B,
    nosort: !0,
    strict: !1,
    silent: !0,
    cwd: A,
    absolute: !1,
    mark: !0,
    dot: !0
  })
  const D = (i.packOptions || {}).ignore || [],
    E = []
  for (const a of C)
    w.isFileIgnored(a, D) ? c.unlinkSync(e.join(A, a)) : E.push(a)
  C = E
  let F = i.projectpath
  'plugin' === i.compileType
    ? (F = i.projectpath)
    : i.miniprogramRoot && (F = e.posix.join(i.projectpath, i.miniprogramRoot))
  const G = await z('**', {
    nodir: !0,
    ignore: B,
    nosort: !0,
    strict: !1,
    silent: !0,
    cwd: F,
    absolute: !1,
    mark: !0,
    dot: !0
  })
  const H =
    G.filter(a => {
      return 0 > C.findIndex(b => b === a)
    }) || []
  const I =
    (await z('**/node_modules/', {
      nosort: !0,
      strict: !1,
      silent: !0,
      cwd: F,
      absolute: !1,
      mark: !0,
      dot: !0
    })) || []
  H.push(...I)
  // x('H', H)
  s('buildend', '编译代码完成')
  s('packstart', '正在打包')
  return H
}

module.exports = main
