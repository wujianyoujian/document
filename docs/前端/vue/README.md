# Vue
> 以2.6或3.0的语法进行学习vue基础部分

## 使用
### 路径
* `@`

?> 表示根路径`src`

### 配置文件
> `vue.config.js`

* 定义路径别名
```js
const path = require('path')  
function resolve (dir) {
  return path.join(__dirname, dir)
}  
module.exports = {
    chainWebpack (config) {
      config.resolve.alias
        .set('@', resolve('src'))
        .set('@scss', resolve('src/assets/scss'))
    }
}
```