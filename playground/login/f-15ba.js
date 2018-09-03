const { rrequire } = require('../../utils')

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
    b = require('./f-89ba'),
    // b = rrequire('./89ba85d67a88f7636d657c22b5d3e038.js'), // json 配置
    c = rrequire('./df6d0ff021a69fb541c733de4dbba0fe.js'), // json 配置
    // d = rrequire('./9c906d27ca74e18d0deaaa231e71fdfa.js'), // redux action
    // e = rrequire('./bc78839ccca8df9e5ceeb7fae11b7be2.js'), // redux
    f = rrequire('./3bfffbe88b3d923921f851c0697974fe.js'), // getPlugin?
    g = rrequire('./d3976cc01aeebc5b09e11c4135b6bd8d.js'), // check version
    i = rrequire('./common/locales/index.js'),
    j = rrequire('./72653d4b93cdd7443296229431a7aa9a.js'),
    {
      NOT_LOGIN: k,
      INVALID_TOKEN: l,
      INVALID_LOGIN: m,
      DEV_NEED_RELOGIN: n,
      DEV_INVALID_SIGNATURE: o,
      DEV_EXPIRED_SIGNATURE: p
    } = c,
    q = 'darwin' === process.platform ? 'darwin' : 'win',
    r = global.appVersion.replace(/\./g, ''),
    s = a => {
      let { needAppID: b, needRandom: c, needSystemInfo: d } = a
      delete a.needAppID, delete a.needRandom
      let e = (a.url || '').split('?'),
        g = e[0],
        h = []
      return (
        -1 !== c && h.push(`_r=${Math.random()}`),
        1 === b && h.push(`${f.formatAppIDQuery()}`),
        -1 !== d && h.push(`os=${q}&clientversion=${r}`),
        e[1] && h.push(e[1]),
        (a.url = `${g}?${h.join('&')}`),
        a
      )
    },
    t = a => {
      return a === k || a === l || a === n || a === p || a === o
        ? (console.warn('expired'), !0)
        : void 0
    },
    u = b => {
      return new Promise((c, d) => {
        console.info('maybe http request\n---------------', b)
        a(b, (a, b, e) => {
          a && d(a), c({ resp: b, body: e })
        })
      })
    },
    v = async function(a, c = !0) {
      let f = _extends({}, a)

      let {
        needToken: h,
        needParse: k,
        needCheckErrCode: l,
        needCheckStatusCode: n,
        forceLogin: o
      } = f
      console.warn({ h, f, a })
      if (
        (delete f.needToken,
        delete f.needParse,
        delete f.needCheckErrCode,
        delete f.needCheckStatusCode,
        1 === h)
      )
        try {
          console.warn('makeRequestOptionsWithLoginState', f)
          f = await b.makeRequestOptionsWithLoginState(f)
          console.warn('m -->', f)
        } catch (a) {
          if (-1 != o) throw (t(a), i.config.CGI_ERR_NEED_RELOGIN)
          else;
        }
      f = s(f)
      try {
        // 重新请求令牌之后，发起 u
        let { resp: p, body: q } = await u(f, !0)
        if (-1 !== n) {
          const a = p.statusCode
          if (200 != a && 206 != a)
            throw (j.error(`${f.url} ${a}`), i.config.NETWORK_ERROR.format(a))
        }
        if (-1 === k) return { resp: p, body: q }
        let r = JSON.parse(q)
        if (-1 !== l) {
          let f = r.baseresponse || {},
            i = f.errcode
          if (void 0 !== i && 0 !== i) {
            if (1 === h && -1 != o && (t(i), i == m)) {
              if (c) {
                let c = !1
                try {
                  await b.requestRefreshTicket(), (c = !0)
                } catch (a) {
                  j.error(`refresh ticket catch error ${a}`), (c = !1)
                }
                if (c)
                  return j.info(`request after refresh ticket`), await v(a, !1)
              }
              console.warn('expired')
            }
            const k = g.parseCgiErrorCode(i, f.errmsg),
              l = new Error(k)
            throw ((l.errcode = i), l)
          }
        }
        console.warn('resolve', p, r)
        return { resp: p, body: r }
      } catch (a) {
        throw (j.error(`${f.url} ${a}`), a)
      }
    }
  module.exports = v
})()
