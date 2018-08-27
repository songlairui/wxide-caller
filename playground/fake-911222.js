const { resolve } = require('../utils')

const rerequire = function(path) {
  return require(resolve(path))
}

const b = require('path'),
  c = require('mkdir-p'),
  d = rerequire('./1dea83a77e99a7c94f6b6f01f5c175b0.js'),
  e = rerequire('./551bb965e1f344281d555a429cd2140c.js'),
  f = rerequire('./aca8387a2744eff1c61b81cdb985e514.js'),
  g = rerequire('./a89be4febc57a81e9865a060f74e14c8.js'),
  i = rerequire('./3d1dfba33285839f5aa317a53698f4c5.js'),
  j = rerequire('./1f28f42c846af07c2adfb1a5eb2d92b6.js'),
  k = rerequire('./59a4de6f8f83ea2bc7d7a501d45d5c9d.js'),
  q = rerequire('./9fdd4ac31a05c27355910f0d74accd4c.js'),
  { Weappdest: r } = rerequire('./92320c1386e6db6a6f2556736a9bc280.js'),
  s = rerequire('./da7c31daaf542cf1796023d8e344b98a.js'),
  t = () => {}

function main(a, h) {
  const m = h.onProgressUpdate || t
  return new Promise(async (n, o) => {
    let p = a.compileType
    m('checkfilestart', '正在检查文件')
    try {
      await d(a, h),
        await e(a, h),
        await f(a, h),
        p == q.plugin && (await g(a, h))
    } catch (a) {
      return o(a)
    }
    m('checkfileend', '检查文件完成')
    // l.getCurrentConfig()
    const u = 1 * new Date()
    let v = b.join(r, `${+new Date()}`)
    c.sync(v)
    try {
      m('compilejsfilestart', '正在编译 JS 文件'),
        await i(a, {
          distPath: v,
          onProgressUpdate: m,
          onFilesIgnored: h.onFilesIgnored || t
        }),
        m('compilejsfilestart', '编译 JS 文件完成'),
        m('compileotherfilestart', '正在编译其他文件'),
        await j(a, { distPath: v }),
        await k(a, { distPath: v }),
        m('compileotherfileend', '编译其他文件完成')
    } catch (a) {
      return o(a)
    }
    const w = 1 * new Date()
    // s('client_pack_source_time', a.appid, `${w - u}`)
    return n(v)
  })
}

module.exports = main
