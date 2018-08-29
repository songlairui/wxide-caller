const test = require('./f-f2b0')

const a = test.reloadQRCode()
console.warn(typeof a)
a.then ? a.then(console.warn) : console.warn(a)
console.warn('----------------===-------------')

process.stdin.on('readable', () => {
  const chunk = process.stdin.read()
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`)

    const a = process._getActiveRequests(),
      b = process._getActiveHandles()
    console.warn(a.length, b.length)
    if (chunk.toString() === 'a') {
      console.warn({ a, b })
    }
  }
})
