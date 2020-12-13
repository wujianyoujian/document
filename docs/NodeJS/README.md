# 使用

## 事件循环
> `Event Loop`  

?> `Javascript`是单线程的, 但是浏览器是多进程的

---

参考文章:  
> [知乎文章](https://zhuanlan.zhihu.com/p/87684858)  
> [前端面试之道](https://juejin.im/book/6844733763675488269/section/6844733763763568654)
## Package.json
[目录结构](http://nodejs.cn/learn/the-package-json-guide#%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84)

## 自带模块

### 读取环境变量
* `process.env`
  >  `process.env` 包含了启动进程时候设置的所有环境变量  
  > `process.env.NODE_ENV`, `process.env.NODE_ENV = ''`读取和设置

### 读取命令行输入的参数
* `process.argv`
  > 返回一个数组  
  > 自带两个数据  
  > 1. node命令的路径  
  > 2. 执行文件的路径  

### 计算耗时
```javascript
console.time('doSomething')

// 
doSomething()

console.timeEnd('doSomething')

```
> ` doSomething: 12.890ms`

## 第三方模块

### `Progress`
[官网](https://www.npmjs.com/package/progress)

> 控制台创建进度条  

?> `npm install progress`, `yarn add progress`

### `nodemon`

> 更改代码之后之后自动重启
?> `npm install nodemon --save-dev `, `yarn add nodemon --dev` 

## 一些命令
### npm
#### 全局
> `npm root -g` 全局安装目录
### yarn
* `yarn add <package_name> --dev` 开发环境依赖
* `yarn add <package_name>` 环境依赖
#### 全局
> `yarn global` 显示一些全局命令  
> `yarn global add <package_name>` 全局安装  
> `yarn global dir`  全局安装目录  
> `yarn global list` 全局安装模块的列表


