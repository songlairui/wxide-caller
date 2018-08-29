// fake - f2b0fd116ee25849124e867e0da34f23.js 初始页
const { rrequire } = require('../../utils')

!(function(require) {
  const c = rrequire('./233d77ecf0781f44985f684f70e316d0.js'), // request
    d = rrequire('./56c390e04c10e91a4aa2a2c19d9a885d.js'), // 配置
    e = rrequire('./72653d4b93cdd7443296229431a7aa9a.js'),
    f = rrequire('./3b5f8e2469c474c8d433c1c6926d8999.js'), // 配置
    g = rrequire('./f171257bbcaef547a3cf27266ccb0db2.js'), // url 配置
    // h = require('./9c906d27ca74e18d0deaaa231e71fdfa.js'), // 登陆成功后界面处理
    // j = require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'), // parseError？
    k = rrequire('./5bdce4f0657e887a1fda83e134c0b823.js'), // upper api？ require c
    l = require('./f-89ba')
    // l = rrequire('./89ba85d67a88f7636d657c22b5d3e038.js'), // export api for others？
    m = 'darwin' === process.platform ? 'darwin' : 'win',
    n = d.LOGIN_QR_STATUS,
    o = {
      REQ_ERR_RETRY_INTERVAL: 500,
      SCANNED_TIMEOUT: 500,
      CANCELLED_TIMEOUT: 2e3,
      KEEP_ALIVE_TIMEOUT: 2e3,
      RELOAD_TO_LONGPOLL_TIMEOUT: 100,
      LONGPOLL_TIMEOUT: 6e4
    },
    p = 3,
    q = 10,
    r = /"(https:\/\/long.open.weixin.qq.com\/connect\/l\/qrconnect\?uuid=.+?)"/,
    s = /src="\/(connect\/qrcode\/.+)"/
  // t = require('./da7c31daaf542cf1796023d8e344b98a.js')  // 发起请求
  let reloadErrCountdown = q
  let _longPollURL,
    _longPollID,
    reloadQRCodeTimeout,
    pollingReq,
    autoRefreshCountdown

  const state = {}
  function setState(...x) {
    console.warn('setState', ...x)
    if (x && typeof x === 'object') {
      Object.assign(state, ...x)
    }
  }

  async function longPoll(a) {
    clearTimeout(_longPollID)
    pollingReq = c(
      {
        url: `${_longPollURL}${a ? '&last=' + a : ''}&_=${+new Date()}`,
        headers: { 'Content-Type': 'application/javascript' },
        timeout: o.LONGPOLL_TIMEOUT
      },
      async (a, b, c) => {
        console.warn('eval', c)
        eval(c)
        Object.assign(global, window)
        const e = wx_errcode
        switch (e) {
          case d.LOGIN_WX_ERRR_CODE.SUCCESS: {
            console.warn('-------------=============-------- 405')
            let a = g.LOGIN_REDIRECT_URL
            ;(a = a.replace(/&amp;/g, '&')),
              (a +=
                (-1 < a.indexOf('?') ? '&' : '?') +
                `code=${wx_code}&state=${m}`),
              setState({
                status: n.CONFIRM,
                errMsg: ''
              })
            try {
              const b = await l.requestLogin(a)
              onLoginSuccess(b)
            } catch (a) {
              console.warn('error', a)
              'string' == typeof a && -1 < a.indexOf('connect')
                ? setState({
                    status: n.REDIRECT_NETWORK_ERROR,
                    errMsg: ''
                  })
                : reloadQRCode()
            }
            break
          }
          case d.LOGIN_WX_ERRR_CODE.SCANNED: {
            setState({
              status: n.SCAN,
              errMsg: ''
            })
            _longPollID = setTimeout(longPoll, o.SCANNED_TIMEOUT, e)
            break
          }
          case d.LOGIN_WX_ERRR_CODE.CANCELLED: {
            setState({
              status: n.CANCEL,
              errMsg: ''
            })
            _longPollID = setTimeout(longPoll, o.CANCELLED_TIMEOUT, e)
            break
          }
          case d.LOGIN_WX_ERRR_CODE.TIMEOUT: {
            0 < autoRefreshCountdown &&
              (reloadQRCode(),
              autoRefreshCountdown--,
              0 >= autoRefreshCountdown &&
                setState({
                  status: n.OUTDATED,
                  errMsg: ''
                }))
            break
          }
          case d.LOGIN_WX_ERRR_CODE.ERROR: {
            reloadQRCode()
            break
          }
          case d.LOGIN_WX_ERRR_CODE.KEEP_ALIVE:
            _longPollID = setTimeout(longPoll, o.KEEP_ALIVE_TIMEOUT)
          default:
        }
        e !== d.LOGIN_WX_ERRR_CODE.TIMEOUT && (autoRefreshCountdown = p)
      }
    )
  }

  async function reloadQRCode() {
    clearTimeout(_longPollID)
    let a
    try {
      const b = await k.getLoginPage()
      a = b.body
    } catch (a) {
      if (
        (e.error(`login fail with code ${a.code}\n${a.message}\n${a.stack} `),
        reloadErrCountdown--,
        0 >= reloadErrCountdown ||
          'ECONNRESET' === a.code ||
          'ENOTFOUND' === a.code)
      )
        return void this.setState({
          status: n.NETWORK_ERROR,
          errMsg: a.toString()
        })

      clearTimeout(reloadQRCodeTimeout)
      reloadQRCodeTimeout = setTimeout(reloadQRCode(), o.REQ_ERR_RETRY_INTERVAL) // 调用自身
      return
    }
    let b, c
    try {
      const d = await k.extractLoginInfo(a)
      b = d.qrcode
      c = d.longPollURL
      console.warn('二维码:', b)
      this.QRCodeImgElement && (this.QRCodeImgElement.src = b)
      _longPollURL = c
      _longPollID = setTimeout(() => longPoll(), o.RELOAD_TO_LONGPOLL_TIMEOUT)
    } catch (a) {
      e.error(`get login qr code fail with ${a.code}\n${a.message}\n${a.stack}`)
      this.reloadErrCountdown--
      console.warn({
        status: n.UNKNOWN,
        errMsg: a.toString()
      })
      if (0 >= this.reloadErrCountdown) return

      clearTimeout(reloadQRCodeTimeout),
        (reloadQRCodeTimeout = setTimeout(
          reloadQRCode(),
          o.REQ_ERR_RETRY_INTERVAL
        ))
    }
  }
  function onLoginSuccess(b){
    console.warn('----------------', b)
  }
  module.exports = {
    reloadQRCode
  }
})(require)
