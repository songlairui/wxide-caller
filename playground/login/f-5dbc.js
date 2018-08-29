const { rrequire } = require('../../utils')

!(function(require) {
  const c = rrequire('./233d77ecf0781f44985f684f70e316d0.js'), // request
    d = rrequire('./f171257bbcaef547a3cf27266ccb0db2.js'),
    e = rrequire('./56c390e04c10e91a4aa2a2c19d9a885d.js'),
    f = e.LOGIN_WX_ERRR_CODE,
    g = /"(https:\/\/long.open.weixin.qq.com\/connect\/l\/qrconnect\?uuid=.+?)"/,
    h = /src="\/(connect\/qrcode\/.+)"/,
    i = 'darwin' === process.platform ? 'darwin' : 'win',
    j = { LINK: 'link', IMAGE: 'image' }
  module.exports = {
    QRCODE_FORMAT: j,
    getLoginPage: () =>
      new Promise((a, b) => {
        c({ url: d.LOGIN_URL }, (c, d, e) => {
          c ? b(c) : a({ response: d, body: e })
        })
      }),
    extractLoginInfo: (a, b = j.LINK) =>
      new Promise((e, f) => {
        try {
          const i = a.match(h)[1],
            k = `${d.OPEN_DOMAIN}${i}`,
            l = a.match(g)[1]
          b === j.IMAGE
            ? c(
                {
                  url: k,
                  encoding: null,
                  headers: { 'Content-Type': 'image/jpeg' }
                },
                (a, b, c) => {
                  a ? f(a) : e({ longPollURL: l, qrcode: c })
                }
              )
            : e({ longPollURL: l, qrcode: k })
        } catch (a) {
          f(a)
        }
      }),
    getLoginInfo: (a = j.LINK) =>
      new Promise((b, e) => {
        c({ url: d.LOGIN_URL }, (f, i, k) => {
          if (f) e(f)
          else
            try {
              const f = k.match(h)[1],
                i = `${d.OPEN_DOMAIN}${f}`,
                l = k.match(g)[1]
              a === j.IMAGE
                ? c(
                    {
                      url: i,
                      encoding: null,
                      headers: { 'Content-Type': 'image/jpeg' }
                    },
                    (a, c, d) => {
                      a ? e(a) : b({ longPollURL: l, qrcode: d })
                    }
                  )
                : b({ longPollURL: l, qrcode: i })
            } catch (a) {
              e(a)
            }
        })
      })
  }
})(require)
