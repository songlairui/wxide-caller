const { rrequire } = require('../utils')

rrequire('92320c1386e6db6a6f2556736a9bc280')

// const tmp = require('./tmp.json')

// const j = {
//   getState() {
//     return {
//       project: {
//         current: tmp
//       }
//     }
//   }
// }

const j = rrequire('./bc78839ccca8df9e5ceeb7fae11b7be2.js')

const f911222 = require('./fake-911222')
const filterFile = require('./filterFiles')
const zipfile = require('./zipfile')

function genPayload() {
  const m = (...x) => console.warn(...x)
  const i = j.getState().project.current
  console.warn('test', i.projectpath)
  if (!i || !i.projectpath) throw new Error('no current project')
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
  const payload = genPayload()
  console.warn(payload[0].projectpath)
  const A = await f911222(...payload)
  // console.warn('\n=====================\n', A)
  await filterFile(A)
  // console.warn('\n=====================\n', AA)
  const AAA = await zipfile(A)
  console.warn('\n=====================\n', AAA)
  return AAA
}
