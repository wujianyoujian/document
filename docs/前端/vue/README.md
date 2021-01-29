# Vue
> 以2.6或3.0的语法进行学习vue基础部分
## `Router`
> [VueRouter](https://router.vuejs.org/zh/guide/essentials/navigation.html)

### `router.push方法`中`name`和`path`的区别
* `params.id -> path/:id -> /6dd12314`
* `query.id -> path?id= ->?id=6dd12314`  

?> 使用`name`进行跳转的时候, 需要满足`name`必须是在`route`路由中定义好了的. 不然不会跳转成功

?> 使用`path`的时候, 无法使用`params`这个参数, 因为`params`是以路径参数的形式存在的. 使用拼凑的方式`router.push(path: 'user/' + userid)`

### 命名路由
> 给路由定义`name`值, 就有上面所说的作用

### 命名视图
> 给视图命名就是给`<router-view></router-view>`的`name`值, 可以对同级或者多个视图传入相应的组件

```javascript
// vue
<router-view class="view one"></router-view>
<router-view class="view two" name="sidebar"></router-view>
// routes
{
  path: '/user/:id',
  components: { default: User, sidebar: Sidebar },
  props: { default: true, sidebar: false }
}
```

### router传参
> [router传参](https://router.vuejs.org/zh/guide/essentials/passing-props.html#%E5%B8%83%E5%B0%94%E6%A8%A1%E5%BC%8F)

给路

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