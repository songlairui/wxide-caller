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
    g({
      test: !1,
      version: this.state.version,
      desc: this.state.desc,
      onFilesIgnored(a) {
        b = a
      },
      onFilesMissing: (a = []) => {
        c = a
      }
    })
  }
}

methods.comfirmUpload.bind(instance)()
