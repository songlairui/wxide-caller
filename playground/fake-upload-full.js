const { rrequire } = require('../utils')

rrequire('92320c1386e6db6a6f2556736a9bc280')

const f911222 = require('./fake-911222')
const filterFile = require('./filterFiles')
const zipfile = require('./zipfile')

function genPayload() {
  const m = (...x) => console.warn(...x)
  const i = require('./tmp.json')
  const s = m
  const b = {
    onFilesIgnored: m
  }
  return [
    i,
    {
      noCompile: !0,
      onProgressUpdate: s,
      onFilesIgnored: b.onFilesIgnored
    }
  ]
}

module.exports = async function() {
  const A = await f911222(...genPayload())
  // console.warn('\n=====================\n', A)
  await filterFile(A)
  // console.warn('\n=====================\n', AA)
  const AAA = await zipfile(A)
  // console.warn('\n=====================\n', AAA)
  return AAA
}
