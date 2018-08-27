const { rrequire } = require('../utils')
rrequire('92320c1386e6db6a6f2556736a9bc280')

const main = require('./zipfile')
;(async () => {
  const result = await main()
  console.info(result)
})()
