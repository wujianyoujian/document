# uni-app

## 规范
> 页面遵循`vue`单文件组件的规范
> 组件标签靠近小程序
* vue

```html
<templte>
    <div></div> 
</templte>
export default {
    data() {
      return {}
    }
}

<style>
</style>
```

* uni-app

```html
<templte>
    <view></view> 
</templte>

export default {
  data() {
    return {}
  }
}

<style>
</style>

```
## 搭建环境
### 使用HBuilderX创建项目
> [HBuilder创建项目](https://uniapp.dcloud.io/quickstart?id=_1-%e9%80%9a%e8%bf%87-hbuilderx-%e5%8f%af%e8%a7%86%e5%8c%96%e7%95%8c%e9%9d%a2)


### 使用vue-cli命令创建项目
`vue create -p dcloudio/uni-preset-vue <projectName>`  

> [通过vue-cli创建项目](https://uniapp.dcloud.io/quickstart?id=_2-%e9%80%9a%e8%bf%87vue-cli%e5%91%bd%e4%bb%a4%e8%a1%8c)

## 组件
> [组件Api网站](https://uniapp.dcloud.io/component/README)
### view
> 与`div`类似, 用来包裹各种标签和组件

### scroll-view
> 滚动视图组件，竖向滚动需要设置高度

### swiper
> 轮播图

### movable-area
> 可移动区域

!> `direction`默认none, 需要改变值否则无法拖动
```html
<movable-area style="width:100%;height: 100px;border: 1px solid #007AFF;">
  <movable-view
    style="width: 30px;height: 30px;border: 1px solid #4CD964;"
    direction="all"
    @change="onChange"
  >
    1
  </movable-view>
</movable-area>
```
### icon
* `type`
* `color`
* `size`

> uni-app中包含了一些图标
```html
<icon type="success"></icon>
```
### process
> 进度条
### button
* `type`
* `size`

## 自定义组件
> 使用与vue相同
```html
<!-- 父组件 -->
<template>
  <view>
    <btn color="red"></btn>
  </view>
</template>

<script>
import btn from '@/components/btn/btn.vue'
export default {
  components: {
    btn
  }
}
</script>  

```
```html
<!-- 子组件 -->
<template>
  <!-- 第一个color是样式的属性名，第二个color是属性值 -->
  <view class="button-box" :style="{color: color}">点击</view>  
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "white"
    }
  }
}
</script>
```
### 插槽
> `slot`
## 组件之间的通信

### 父子组件的通信
> 还是和`vue`一样
```html
<!-- 子组件 -->
<view @click="clickHandle"></view>
 
<script>
export default {
  methods: {
    clickHandle () {
      this.$emit('toclick', 'info')
    }
  }
}
</script>  
```
```html
<!-- 父组件 -->
<view @toclick="Handle"></view>
 
<script>
export default {
  methods: {
    Handle (msg) {
      console.log(msg)
    }
  }
}
</script> 
```

## 条件编译
* 只编译到H5端
```html
<!-- #ifdef H5 -->
<!-- #endif -->
```

* 就编译到H5端又编译到app端
```html
<!-- #ifdef H5 || APP-PLUS -->
<!-- #endif -->
```

* 不编译到某一端, 其他平台都存在
```html
<!-- #ifndef H5 -->
<!-- #endif -->
```
?> 这只是`html`部分的代码, 对于`js`和`css`也需要进行条件编译, 只是注释方式不一样
## 项目当中的路径问题
* `@`
> 表示项目的根路径
