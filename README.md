# wxide - caller

调用wx IDE js

## 扫码登陆

```bash
  node playground/login/test.js
```
控制台中打开二维码地址，
扫码，得到反馈。
登陆成功之后 返回信息 写入`loginfo.json`

## 打包文件

```bash
  node playground/fake-upload-full.js
```

## 取得准备上传的请求内容

```bash
  node playground/testUploadPrepare.js
```

## 取得准备上传的含有ticket的url地址,并上传

```bash
  node playground/login/test-f15.js
```