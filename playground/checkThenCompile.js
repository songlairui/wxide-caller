const { resolve } = require('../utils')
const l = require(resolve('./911222a6723da8db7ca8a8e3689591e1.js'))

const m = (...x) => console.warn(...x)

const i = require('./tmp.json')
const s = m
const b = {
  onFilesIgnored: m
}
const payload = [
  i,
  {
    noCompile: !0,
    onProgressUpdate: s,
    onFilesIgnored: b.onFilesIgnored
  }
]

!(async function main() {
  const result = await l(...payload)
  console.warn('\n---result-------', result)
})()
