# 基础
对react技术栈的学习和记录
## 安装
* 安装一个普通的`react`应用  
> `npx create-react-app <react-name>`  

    `npx`在检测到本地没有 create-react-app 的这个命令后， 会向网上的npm注册表中查找相应的命令进行安装，这样相比于vue来说不需要本地安装手脚架工具

## API
### `ReactDOM.render`
* 参数 (`element`， `container`)
  > `element` 需要渲染的内容，可以是原生的dom，也可以是react中的组件，以根的形式存在   
  > `container` 挂载的容器，就是渲染的dom会在container以子代标签的形式存在 

一个`react`最小的应用
* 使用
  ```js
  import ReactDOM from "react-dom";

  ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('root')
  );
  ```

## 概念
* react有着不同类型的组件，不同类型的组件以类或者函数的形式存在，而在类中有一个渲染函数再`return`，在函数中直接`return `html，而更好的编写是以`JSX`的形式返回。
* 使用JavaScript表达式直接使用一对`{} 使用任意的JavaScript表达式`, 而不像是`vue`里面的`{{}}`
* `rander`函数，每次响应式数据发生变化的时候，都会重新执行这个函数, 但是每次更新不会全部更新，只会更新不同的地方


### 生命周期
* `componentDidMount()` 在组件已经渲染到DOM上运行
* `componentWillUnmount()` 组件被销毁的时候执行


## JSX
* 在`vs code`中使用JSX， 使用`Babel JavaScript`插件正确高亮显示`JSX`
* 推荐将`JSX`的内容放在()中
* `JSX`也是一个函数表达式, 会被编译成普通的函数进行调用
* 在`JSX`中属性包括原生属性，会使用小驼峰的形式
* `JSX`会自动进行转义，不需要担心`xss`攻击

  ```jsx
  const helloWord = (<h1>Hello World</h1>);
  ```

### 编译过程
* js
  ```jsx
  const helloWorld = (<h1 className="title">Hello World</h1>);
  ```
* js
  ```jsx
  const helloWorld = React.createElement({
    'h1',
    {className, 'title'},
    'hello World'
  })
  ```

## 组件
* 组件名称以大写字母开头
* 对于`React.Compontent`这个类实现类继承，在类里面，返回一个`render`函数
* 在组件内添加相应式数据，在组件的实现类里面重写构造函数，在`this.state = {}`里面添加数据和`vue`里面的
`data () { return {  } }`一样

  ```jsx
  class MyButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      };
    }
    render() {
      return (<button>Click Me</button>);
    }
  }
  ```
### 函数式组件
* 不需要render函数， 直接return JSX对象

  ```jsx
  function MyButton(props) {
    return (
      // 在onClick中没有箭头函数也没有, 也没有()执行符号
      <button className="square" onClick={props.changeCurrentHandle}>
        {props.value}
      </button>
    );
  }
  ```

### 在组件中添加事件
* 采用小驼峰命名方式
* 最好不要在自定义的组件上添加事件，需要在`html`上添加事件, 因为在自定义组件上添加事件会被当作传值给组件的属性, 当属性值为方法的时候也是可以被组件传递的

  ```jsx
  <button className="square" onClick={() => { this.props.changeCurrentHandle() }}>
    {this.props.value}
  </button>
  ```

### props
* 在组件中从父组件传递过来的数据
* 在每个组件中的props保存不变

### state
* 会随着变化而变化
* 不要直接修改state的值， 使用setState
* state 更新是异步的，无法使用更新的值，来改变下一个状态
* setState 会重新执行render函数重新渲染
## 使用

### 遍历渲染
* 需要给循环渲染的列表元素给予key值
* key值帮助react识别哪些元素是被改变了
* key应该在需要循环的元素上添加
* 在兄弟节点中是唯一的，在全局可以是相同的
```jsx
function Component1 () {
  return (
    <ul>
    {
      list.map((user, index) => (
        <li key={index}>{user.name}</li>
      );
    }
    <ul>
  );
}
```

### 组件的传值
* 和vue一样，通过`this.props`属性获取父组件传过来的值

### 条件渲染
* 在return中进行判断
```jsx
function Component1(props) {
  if (props.login) {
    return (<h1>logined</h1>);
  }
  return (<h1>not login</h1>);
}
```

### this指向问题
* 在以类编写的组件中

  ```jsx
  class MyBtn extends React.Component {
    clickHandle () {
      console.log(this) // undefined
    }
    render () {
      return (
        <button onClick={ this.clickHandle }>btn1</button>
      );
    }  
  }
  // 1. 改变this的指向, 在构造函数中
  class MyBtn extends React.Component {
    constructor() {
      this.clickHandle = this.clickHandle.bind(this)
    }
    clickHandle () {
      console.log(this) // Mybtn {}
    }
    render () {
      return (
        <button onClick={ this.clickHandle }>btn</button>
        // 或者
        <button onClick={ this.clickHandle.bind(this) }>btn</button>
      );
    }  
  }
  // 2. 在函数定义的时候或者绑定事件的时候使用箭头函数
  class MyBtn extends React.Component {
    clickHandle = () => {
      console.log(this) // Mybtn {}
    }
    render() {
      return (
         <button onClick={ this.test }>btn</button>
        // 或者
         <button onClick={ () => this.test() }>btn</button>
      );
    }
  }
  ```

## 在React中可以使用到的第三方工具

### `CSS In Js`
#### emotion 模块
* 安装
> `@emotion/styled @emotion/react`

* vs code安装语法高亮插件
> `vscode-styled-components`

### 时间处理
#### `dayjs`

### `qs`
* 解析请求参数

