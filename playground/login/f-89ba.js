const path = require('path')
const { rrequire } = require('../../utils')
// const userInfo = require(path.resolve(__dirname, 'loginfo.json'))
var _extends =
  Object.assign ||
  function(a) {
    for (var b, c = 1; c < arguments.length; c++)
      for (var d in ((b = arguments[c]), b))
        Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d])
    return a
  }
!(function() {
  const a = rrequire('./233d77ecf0781f44985f684f70e316d0.js'),
    b = rrequire('./72653d4b93cdd7443296229431a7aa9a.js'),
    c = rrequire('./df6d0ff021a69fb541c733de4dbba0fe.js'),
    d = rrequire('./84858de8a097c9cf84ff2c2e3d86e2a9.js'),
    e = rrequire('./f171257bbcaef547a3cf27266ccb0db2.js'),
    f = 'darwin' === process.platform ? 'darwin' : 'win',
    g = () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))

      let a = global.isSimple ? global.userInfo : d.userInfo
      if (!a || !Object.values(a).length) {
        a = userInfo
      }
      ;(a.signature && a.openid && !(a.signatureExpiredTime < Date.now())) ||
        ((a = {}), h({}))
      return a
    },
    h = a => {
      global.isSimple ? (global.userInfo = a) : (d.userInfo = a)
    }
  let i,
    j = []
  const k = new BroadcastChannel('login')
  k.onmessage = a => {
    let { type: b, data: c } = a.data
    switch (b) {
      case 'cleanRequestQueue': {
        ;(c = c || {}), l(c.err, c.data, 'other')
        break
      }
    }
  }
  const l = (a, b, c = 'self') => {
      j.forEach(c => {
        a ? c.reject(a) : c.resolve(b)
      }),
        (j = []),
        delete localStorage.lock_refreshing,
        clearTimeout(i),
        (i = null),
        'self' === c &&
          k.postMessage({
            type: 'cleanRequestQueue',
            err: a && a.toString(),
            data: b
          })
    },
    m = () => {
      b.info(`refresh wait timeout`), l()
    },
    n = function(b, c) {
      let d = {
        url: e.refreshTicketURL,
        form: JSON.stringify({ openid: b.openid, signature: b.signature }),
        method: 'post'
      }
      console.warn('request new Ticket', d, c)
      a(d, c)
    },
    o = function() {
      return new Promise((a, d) => {
        j.push({ resolve: a, reject: d }),
          clearTimeout(i),
          (i = setTimeout(m, 10000))
        let e = g()
        if (!e || !e.openid || !e.signature) return l(c.NOT_LOGIN)
        if (global.isSimple || !localStorage.lock_refreshing) {
          const a = '' + (global.isDevWindow ? global.devInfo.id : 'server')
          ;(localStorage.lock_refreshing = a),
            (global.isSimple || localStorage.lock_refreshing === a) &&
              n(e, (a, d, f) => {
                if (a) return b.error(`requestRefreshTicket ${a}`), l(a)
                let g
                try {
                  g = JSON.parse(f)
                } catch (a) {
                  return (
                    b.error(`requestRefreshTicket JSON.parse catch error ${a}`),
                    l(a)
                  )
                }
                let i = g.baseresponse,
                  j = parseInt(i.errcode)
                if (0 != j)
                  return (
                    b.error(`requestRefreshTicket error ${j}`), l(c.NOT_LOGIN)
                  )
                let k = +new Date() + 1e3 * g.ticket_expired_time,
                  m = d.headers['debugger-newticket']
                ;(e = _extends({}, e)),
                  (e.newticket = m),
                  (e.ticketExpiredTime = k),
                  h(e),
                  l(null, JSON.parse(JSON.stringify(e)))
              })
        }
      })
    },
    p = async () => {
      let a = Date.now(),
        b = g(),
        c = ''
      console.warn(
        'p---------',
        b.newticket && b.ticketExpiredTime && b.ticketExpiredTime > a,
        b
      )
      b.newticket && b.ticketExpiredTime && b.ticketExpiredTime > a
        ? (c = b.newticket)
        : (await o(), (b = g()), (c = b.newticket))
      return c
    }
  module.exports = {
    getUserInfo: g,
    requestRefreshTicket: o,
    requestLogin: function(b) {
      return new Promise((c, d) => {
        a({ url: b }, (a, b, e) => {
          if (!a) {
            let a = JSON.parse(e),
              f = a.baseresponse,
              g = f.errcode ? parseInt(f.errcode) : 0
            if (0 !== g) return void d(f.errmsg)
            let h = b.headers,
              i = h['debugger-signature'],
              j = h['debugger-newticket'],
              k = +new Date(),
              l = {
                signature: i,
                newticket: j,
                openid: a.openid,
                nickName: a.nickname,
                headUrl:
                  a.headurl ||
                  'https://res.wx.qq.com/zh_CN/htmledition/v2/images/web_wechat_no_contect.png',
                ticketExpiredTime: 1e3 * a.ticket_expired_time + k,
                signatureExpiredTime: 1e3 * a.signature_expired_time + k,
                sex: 1 === a.sex ? 'male' : 'female',
                province: a.province,
                city: a.city,
                contry: a.contry
              }
            c(l)
          } else d(`${a.toString()}`)
        })
      })
    },
    makeRequestOptionsWithLoginState: async function(a) {
      let b = await p()
      if(!b) process.exit()
        console.warn('get new ticket', b)
      let c = -1 === a.url.indexOf('?') ? `?newticket=${b}` : `&newticket=${b}`
      return (a.url += c), a
    },
    getNewTicket: p,
    refreshTicketHelper: n
  }
})()
