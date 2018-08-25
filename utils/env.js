const path = require('path')

if (typeof localStorage === 'undefined' || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage
  global.localStorage = new LocalStorage(path.resolve(__dirname, './scratch'))
}
if (typeof BroadcastChannel === 'undefined') {
  global.BroadcastChannel = require('broadcast-channel')
}
global.CLI = {
  isTestMode: false
}
global.appConfig = { isDev: false, isBeta: false, isGamma: false }

const DIRECT = 'DIRECT'
const proxyDict = {
  'https://servicewechat.com': DIRECT
}

global.nw = {
  App: {
    getDataPath() {
      return 'C:\\Users\\songlr\\AppData\\Local\\微信web开发者工具\\User Data\\Default'
    },
    getProxyForURL(...x) {
      return (
        proxyDict[x[0]] ||
          console.warn('\n--------------------------need proxy for--', x),
        DIRECT
      )
    }
  }
}

Object.assign(global, {
  appVersion: '1.02.1808101'
})
