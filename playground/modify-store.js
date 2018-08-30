const path = require('path')
const { rrequire } = require(path.resolve(__dirname, '../utils'))

const e = rrequire('./bc78839ccca8df9e5ceeb7fae11b7be2.js')
const REHYDRATE = 'persist/REHYDRATE'
const current = require(path.resolve(__dirname, 'tmp.json'))

e.dispatch({
  type: REHYDRATE,
  payload: { project: { current } }
})
