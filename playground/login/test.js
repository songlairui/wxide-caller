const test = require('./f-f2b0')

const a = test.reloadQRCode()

a.then ? a.then(console.warn) : console.warn(a)
