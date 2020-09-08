!> 和`vue`使用定义的数据不同的地方在于需要加上`{{}}`才能正确表示
### 定义数据
```js
Page({
    data: {
      name: 'LiSi'
    }
})
```
### 设置数据
```js
this.setData({
    name: '李四'
})
```
### 条件判断
```html
<view wx:if="{{ifShow}}">test</view>
```
### 列表渲染
```js
data: {
  list: [1, 2, 4, 5]
}
```
```html
<!-- item 默认值 -->
<view wx:for="{{list}}">{{item}}</view>
<!-- 指定 -->
<view wx:for="{{list}}" wx:for-item="age" wx:for-index="i">{{age}} {{i}}</view>
```