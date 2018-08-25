const { resolve } = require('../utils')
const g = require(resolve('f0466135fc8b3a662084784e5f4ac792'))
const l = require(resolve('9fdd4ac31a05c27355910f0d74accd4c'))

const instance = {
  state: {
    version: '1.0.0', // 上传版本号
    desc: '---test upload-------'
  },
  props: {
    project: {
      compileType: 'weapp'
    }
  },
  setState(data) {
    Object.assign({}, this.state, data)
  }
}

const methods = {
  comfirmUpload() {
    if (this.lock) return
    if (!this.state.version)
      return (
        this.setState({ versionError: !0 }), void this.refs.versionInput.focus()
      )
    if (
      l.plugin == this.props.project.compileType &&
      !/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/.test(this.state.version)
    )
      return (
        this.refs.versionInput.focus(), void this.setState({ versionError: !0 })
      )
    let a = this.state.desc
    a || (a = this.getPlaceHolder()),
      (this.lock = !0),
      this.setState({ saveBtnTitle: '上传中', versionError: !1 })
    let b = [],
      c = []
    setTimeout(async () => {
      console.warn('开始上传')
      let d = this.props,
        e = d.project
      if (
        e.setting &&
        e.setting.scriptsEnable &&
        e.scripts &&
        e.scripts.beforeUpload
      ) {
        d.consoleActions.clear(),
          d.consoleActions.log('正在执行自定义上传前命令...')
        try {
          await m.run({
            command: e.scripts.beforeUpload,
            options: { cwd: e.projectpath, shell: !0 },
            stderr: d.consoleActions.error,
            stdout: d.consoleActions.log
          })
        } catch (a) {
          return (
            d.consoleActions.error('执行自定义预览前预处理命令失败'),
            void (this.lock = !1)
          )
        }
      }
      g({
        test: !1,
        version: this.state.version,
        desc: a,
        onFilesIgnored(a) {
          b = a
        },
        onFilesMissing: (a = []) => {
          c = a
        }
      })
        .then(a => {
          this.onUploadEnd(b, c),
            this.props.setPkgSize({
              upload: a.wxpkg_size,
              uploadSubpackages: a.subpackage_info,
              lastUploadTime: +new Date()
            }),
            this.props.saveUploadInfo({
              desc: this.state.desc,
              version: this.state.version
            })
        })
        .catch(a => {
          console.warn(a)
          this.lock = !1
          // h.error(`upload ${a}`)
          this.setState({ show: !1 })
          console.warn({
            show: !0,
            showCancel: !1,
            content: `上传错误，原因：${a}`
          })
        })
    })
  }
}

methods.comfirmUpload.bind(instance)()
