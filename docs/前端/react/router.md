# 安装
* 直接安装在浏览器环境下基于react-router的模块
> `yarn add react-router-dom`

## 路由器
* 也就是路由的模式，一种是`Browerhistory`模式，一种是`hashHistory`模式
  1. `BrowerHistory`，指向是真实的URL地址，在上传到服务器后，访问url的时候，会去访问真实的地址，但是该地址下没有当前资源会发生404的错误
  2. `HashHistory`，如`http://locahost:8000/#/`, 在# 后面的发送请求会自动忽略
* 在react中也是以组件的形式存在，需要导入，并包裹整个根组件

## 匹配
?> 使用`Switch`,`Route`两个组件来配合使用，`Switch`就表示是切换的意思，要根据`Route`里面的属性path来匹配相应的组件，组件要么放在`Route`里面，要么以传入到属性`component`中
```jsx
const Test = props => {
  return (<div>Test<div>)
}

<Switch>
  <Route path="/test">
    <Test />
  </Route>
  // 或者
  <Route path="/test" component={Test}></Route>
</Switch>

```
!> 从路由头开始匹配，而`/`会匹配所有的路由，一般将`/`的路由放在最后面，或者使用精准匹配(在路由Route中添加`exact`即可)的方式来解决

## 导航
* 路由跳转，`react-router-dom`提供一些组件，来进行视图上的跳转
* 组件有 `Link`, `NavLink`, `Redirect`
> `Link` 会渲染成`<a></a>`的形式，`NavLink`类似，不过有个激活状态表示，当路由是当前的`NavLink`的时候，会获得指定的类名

## 使用

### 基本使用
```jsx
```

## Hooks

### `useParams`
* 获取参数

### `useRouteMatch`
* 获取当前匹配到的路由信息
* 传入参数，可以对参数与当前匹配到的路由信息进行匹配，如果匹配成功会返回路由信息，匹配失败就会返回null



