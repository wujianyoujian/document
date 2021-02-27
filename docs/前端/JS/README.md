# JavaScript基础

## 位运算符
> 其实就是二进制的运算

### &
> 与运算, 两者都为1为true

?> `5 & 2 -> 0101 & 0010 = 0000 -> 0`

### |
> 或运算, 其中一个为1为就为true

?> `5 | 2 -> 0101 | 0010 = 0111 -> 7` 

### ~
> 取反运算

?> `~5 -> ~0101 = 1010 -> 10`

### ^
> 异或运算, 一个为0, 一个为1才为true

?> `5 ^ 1 -> 0101 ^ 0001 = 0100 -> 4`

### << N
> 向前位移, 往前移一位

?> `3 << 1 -> 0011 << 1 = 0110 -> 6 `

### >> N
> 向后位移, 往后移一位

?> `3 >> 1 -> 0011 >> 1 = 0001 -> 1`


## 常用方法

### 字符串

#### split
> 分割字符串

### 数组

#### splice
> 删除或者添加数组

#### join
> 拼凑数组返回字符串

#### slice
> 返回数组指定范围的新数组

## 正则表达式
* 构建正则表达式对象
> `new RegExp()`

### 特殊字符

#### `x(?=y)`
> 先行断言  
> 表示匹配x后面紧跟着y  
> 但是y不是匹配到结果  

#### `(?<=y)x`
> 后行断言
> 意思和先行断言差不多, 也是匹配x, 当x前面是y的时候

### `x(?!y)`
> 正向否定查找
> 匹配x, 后面紧跟不是y的匹配项

### `(?<!y)x`
> 返向否定查找
> 匹配x, 前面紧跟不是y的匹配项

### 匹配模式

### 例子
#### 由重复单词的单词组成

?> `/^(\w+)\1+$/`

---

[正则表达式学习](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)  
[正则表达式语法](https://www.runoob.com/regexp/regexp-tutorial.html)  
[正则表达式函数](https://www.runoob.com/jsref/jsref-obj-regexp.html)  

## 事件机制

> [事件机制](https://zhuanlan.zhihu.com/p/73091706)

## 性能优化
### 防抖
> 频繁操作, 如果频繁点击并且每次点击间隔没有超过300ms只会出触发一次
```javascript
debounce(fn) {
  let timer = null
  return function() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, 300)
  }
}
//
btn.onclick = debounce(() => {
  console.log('防抖')
})
```

### 节流
> 频繁操作, 如下, 每300ms执行一次
```javascript
function throttle(fn) {
  let timer = null
  return function() {
    if (timer) return
    timer = setTimeout(() => {
      fn()
      timer = null
    }, 300)
  }
}
//
btn.onclick = throttle(() => {
  console.log('节流')
})
```

## 高级部分
### this的指向

## `ES6`
