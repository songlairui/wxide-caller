const path = require('path')
const { rrequire } = require('../utils')
const s = console.warn.bind(console)
const i = require(path.resolve(__dirname, './tmp.json'))

const f = require('zlib'),
  g = require('rmdir'),
  j = rrequire('./f171257bbcaef547a3cf27266ccb0db2.js'),
  k = rrequire('./949d8235c744ced2a80121e4dba34c28.js'),
  n = rrequire('./84858de8a097c9cf84ff2c2e3d86e2a9.js'),
  q = rrequire('./common/locales/index.js'),
  v = rrequire('./9fdd4ac31a05c27355910f0d74accd4c.js')

const payload = {
  test: !1,
  version: '1.0.0',
  desc: '---test upload-------',
  onFilesIgnored(a) {
    console.warn('onFilesIgnored', a)
  },
  onFilesMissing: (a = []) => {
    console.warn('console.warn(a)', a)
  }
}

async function main(K, A, b = payload) {
  const o = 2,
    p = 1024 * o

  s('uploadstart', '正在上传')
  let L = K.data,
    M = K.pDestPath
  g(A, () => {})
  let N = parseInt(K.totalSize / 1024)
  if (N > p) {
    let a = new Error(q.config.CODE_SIZE_EXCEED.format([N, p]))
    throw ((a.code = k.CODE_SIZE_EXCEED), a)
  }
  let O,
    P = global.appConfig.isBeta
  if (b.test) {
    if (
      ((n[`last-up-test-${i.projectid}`] = N),
      (O = P
        ? `${j.testSourceNewFeatureURL}?gzip=1`
        : `${j.testSourceURL}?gzip=1`),
      b.remoteDebug)
    ) {
      let a = 1
      'ios' === b.remoteDebugLocal
        ? (a = 2)
        : 'android' === b.remoteDebugLocal && (a = 3)
      const c = b.remoteProxyPort || 0,
        d = b.disableUrlCheck ? 1 : 0
      O = `${
        j.testSourceURL
      }?gzip=1&open_remote=yes&remote_network_type=${a}&remote_proxy_port=${c}&disable_url_check=${d}&remote_support_compress_algo=1`
    }
    b.autoPreview && !b.remoteDebug && (O += '&hot_update=yes')
    let { page: a, query: c, searchQuery: d, boxQI: e } = b
    if (a) {
      let b = encodeURIComponent(`${a}?${c}`)
      O = `${O}&path=${b}`
    }
    if (i.attr.gameApp && c) {
      let a = encodeURIComponent(`?${c}`)
      O = `${O}&path=${a}`
    }
    if ((d && (O = `${O}&search_query=${encodeURIComponent(d)}`), e)) {
      O = `${O}&search_extInfo=${encodeURIComponent(
        JSON.stringify({ box_qi: e })
      )}`
    }
  } else {
    n[`last-up-load-${i.projectid}`] = N
    let a = encodeURIComponent(b.desc),
      c = encodeURIComponent(b.version),
      d = encodeURIComponent(b.uuid)
    O = P
      ? `${
          j.commitSourceNewFeatureURL
        }?user-version=${c}&user-desc=${a}&uuid=${d}&gzip=1`
      : `${j.commitSourceURL}?user-version=${c}&user-desc=${a}&uuid=${d}&gzip=1`
  }
  let Q = f.gzipSync(L)
  const R = 1 * new Date(),
    S = b.tempProject
      ? {
          url: `${O}&appid=${b.tempProject.appid}&devplugin=${
            i.compileType == v.plugin ? 1 : 0
          }`,
          method: 'post',
          body: Q,
          needToken: 1
        }
      : {
          url: `${O}&devplugin=${i.compileType == v.plugin ? 1 : 0}`,
          method: 'post',
          body: Q,
          needToken: 1,
          needAppID: 1
        }
  b.tempProject &&
    b.tempProject.attr &&
    (b.tempProject.attr.platform && (S.url += '&platform=1'),
    b.tempProject.attr.platform &&
      b.tempProject.attr.extInfo &&
      (S.url += `&ext_appid=${b.tempProject.attr.extInfo.appid || ''}`))
  console.warn('upload param prepare:', S)
  return S
}

module.exports = main
