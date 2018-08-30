const test = require('./f-f2b0')
const f15ba = require('./f-15ba')
const prepare = require('../upload-prepare')

const a = test.reloadQRCode()
console.warn(typeof a)
a.then ? a.then(console.warn) : console.warn(a)
console.warn('----------------===-------------')

process.stdin.on('readable', async () => {
  let chunk = process.stdin.read()
  chunk =
    chunk &&
    chunk
      .toString()
      .replace(/[\r\n]/g, '')
      .trim()
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`)

    const a = process._getActiveRequests(),
      b = process._getActiveHandles()
    console.warn(a.length, b.length)

    switch (chunk.toString()) {
      case 'a':
        console.warn({ a, b })
        break
      case 'upload':
        const r = f15ba(await prepare())
        break
        console.warn(r)
      default:
    }
  }
})
