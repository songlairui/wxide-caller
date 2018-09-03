const path = require('path')

if (typeof localStorage === 'undefined' || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage
  global.localStorage = new LocalStorage(path.resolve(__dirname, './scratch'))
  const old = global.localStorage.setItem
  global.localStorage.setItem = function (...x) {
    // console.warn('setitem ...x', ...x)
    if(x[0] === 'userInfo' && x[1] === '{}') return console.error('except userInfo')
    old.bind(global.localStorage)(...x)
  }
}
if (typeof BroadcastChannel === 'undefined') {
  const BroadcastChannel = function BroadcastChannel(type) {
    this.type = type
  }
  BroadcastChannel.prototype.onmessage = function(...x) {
    console.warn('onmessage', `...x`)
  }
  BroadcastChannel.prototype.postMessage = function(data) {
    console.warn('postMessage', `data`)
    this.onmessage && this.onmessage({data})
  }

  global.BroadcastChannel = BroadcastChannel
}

if (typeof window === 'undefined') {
  global.window = {}
}

global.CLI = {
  isTestMode: false
}
global.appConfig = {
  isDev: false,
  isBeta: false,
  isGamma: false
}
global.devInfo = {
  appid: 'wx898945e5568b4ea3',
  id: '1535343208019',
  isOnline: false,
  isTemp: false,
  projectid: 'wx898945e5568b4ea3_wxapp',
  projectname: 'wxapp',
  projectpath: '/Users/larry/Desktop/wxapp'
}

const DIRECT = 'DIRECT'
const proxyDict = {
  'https://servicewechat.com': DIRECT
}

global.nw = {
  App: {
    getDataPath() {
      // return '/Users/larry/Library/Application Support/微信web开发者工具/Default'
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
  appVersion: '1.02.1808101',
  devType: 'miniprogram'
  // isDevWindow: true
})
