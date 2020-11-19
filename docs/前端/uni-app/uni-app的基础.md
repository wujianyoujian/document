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

### 字体图标
* 从阿里云字体图标网站下载  

* 从uni-app下载字体插件直接使用
> [icons](https://ext.dcloud.net.cn/plugin?id=28)  
> 插件下载后直接下载到components文件夹中, 可以直接easycom, 不许需要在另外的引入

## 组件
> [组件Api网站](https://uniapp.dcloud.io/component/README)

### 组件导入
> 像vue中那样进行导入  
> uni-app有easy com, 自动导入的功能, 文件夹名字和组件名字是一样的话
> components/组件名/组件名.vue

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
## 生命周期
### 应用生命周期
!> 只在`app.vue`中存在 
* `onLaunch`
> 应用初始化触发一次，全局只触发一次 
* `onShow`
> 应用启动，从后台进入前台触发
* `onHide`
> 从前台进行后台触发
### 页面生命周期
* `onLoad`
  > 监听页面加载
* `onShow`
  > 页面的显示
* `onReady`
  > 页面初次渲染完成
* `onHide`
  > 页面隐藏
* `onUnload`
  > 页面卸载
### 组件的生命周期
!> 和vue的生命周期是一样的

  > [生命周期函数](https://cn.vuejs.org/v2/guide/instance.html#%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)

### 一些其它的生命周期
#### `onTabItemTap`
> 当tabBar切换的时候会进行触发, 参数是当前页面路径的数据
## 项目运行
### 运行到`ios`
* 先电脑安装·爱思助手·, 再手机连接电脑
* 直接运行, 之后还需要在手机信任企业证书, 应用才会正确打开
## 项目配置
### 项目结构
```
├─components  
├─pages   
├─static  
├─unpackage  
├─App.vue  
├─main.js  
├─manifest.json  
├─pages.json  
├─uni.scss
├───
```
* `pages`
> 和微信小程序差不多，存放页面
* `static`
> 存放静态文件
* `unpackage`
> 打包好的文件
* `App.vue`
> 和`vue`当中根组件的作用一样
* `main.js`
> 项目的入口文件
* `manifest.json`
> 应用的配置文件，用于指定应用的名称，图标，权限等
* `pages.json`
> 和微信小程序的一样，页面文件的路径，窗口样式等
* `uni-scss`
### 底部导航栏(tabBar)
> 和微信小程序的底部导航栏一样, 可以设置
* `text`
> 文本
* `pagePath`
> 页面的路径
* `iconPath`
> 图标的路径
* `selectedIconPath`
> 例子
```json
"tabBar": {
    "color": "#666",
    "selectedColor":"#f07373",
    "backgroundColor":"#fff",
    "list": [{
        "text": "首页",
        "pagePath":"pages/index/index",
        "iconPath":"static/home.png",
        "selectedIconPath":"static/home-active.png"
      }, {
        "text":"收藏",
        "pagePath":"pages/follow/follow",
        "iconPath":"static/follow.png",
        "selectedIconPath":"static/follow-active.png"
      }, {
        "text":"我的",
        "pagePath":"pages/my/my",
        "iconPath":"static/my.png",
        "selectedIconPath":"static/my-active.png"
      }
    ]
  }
```
> 点击选择图标的路径

### 自定义导航栏
* 首先设置页面样式里面
> `"navigationStyle":"custom"`  设置后不会显示导航的标题  
> `"navigationBarTextStyle": "white | black"` 只有黑色和白色可以进行设置, 设置导航栏的文字颜色和状态栏
### 在项目中使用`scss`
> 下载`scss`编译插件

### 项目当中的路径问题
* `@`
> 表示项目的根路径
