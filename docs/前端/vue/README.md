# Vue
> 以2.6或3.0的语法进行学习vue基础部分

## vue 3.x
* 组件不必有唯一的根标签
* `组合式API`
* `...more`

## `项目准备`
1. 删除多余文件
2. 准备数据，请求封装
3. 从上往下写

## Vue API和使用

### 计算属性
* 有依赖项
* 缓存
  > 没有发生变化的时候会使用上一次的值
* 有`getter`, `setter`方法
### 插槽
> 默认default

* 基本使用
  ```vue
  <!-- to-do-button.vue -->
  <button>
    <slot>default</slot>  
  </button>
  <!-- app.vue -->
  <to-do-button>{{ list }}</to-do-button>
  ```

* 具名插槽
  ```vue
  <!-- base-layout.vue -->
  <template>
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </template>
  <!-- app.vue -->
  <base-layout>
    <template v-slot:header>header</template>
    <template v-slot:default>main</template>
    <template v-slot:footer>footer</template>
  </base-layout>
  ```

* 作用域插槽
  ```vue
  <!-- to-do-list.vue -->
  <template>
    <ul>
      <li v-for="(item, index) in items">
        <!-- {{ item }} -->
        <!-- 可以子组件的值，在父组件中进行自定义，作为内容传递给slot -->
        <slot :item="item"></slot>
      </li>
    </ul>
  </template>

  <script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'to-do-list',
    data() {
      return {
        items: ['Feed a cat', 'Buy milk']
      }
    }
  })
  </script>

  <style></style>

  <!-- app.vue -->
  <to-do-list>
    <template v-slot:default="{ item }">
      {{ item + ' text' }}
    </template>
  </to-do-list>
  ```
### `Provide/Inject`

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


## 动画
```css
.slide-right-enter, .slide-right-leave-to {
  transform: translate3d(100%, 0, 0);
}
.slide-right-enter-to, .slide-right-leave {
  transform: translate3d(0, 0, 0);
}
.slide-right-enter-active, .slide-right-leave-active {
  transition: all .2s ease-in-out;
}
```

## 使用
### 路径
* `@`

?> 表示根路径`src`

### 配置文件

#### `vue.config.js` 

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


