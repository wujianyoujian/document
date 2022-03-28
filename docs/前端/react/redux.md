# Redux

* 单一数据源
* state是只读的
* 使用纯函数进行修改

## 安装

### 安装redux
> `yarn add redux`

### 安装react-redux
> `yarn add react-redux`
## store
* state值，获取，监听
## state
* 数据源
## action
* 将数据从应用 -> store 的载体
* 本质是一个javaScript`对象`
* 必须要有type参数

## reducer
* 本质是函数
* 需要有`return state`, 才能被store接收

> 相当于action为对象的key，reducer表示key对应的方法，由action确定，reducer来执行

## 基本使用
?> 在`vue`中 `state`直接存放在`store`中，而在`react`中`state`相当于存放在`reducer`中，在`reducer`中的方法中改变值的变化，将`state`返回给`store`，而在外可以通过`store`监听和获取`state`

1. 创建一个action，表示要执行的操作
    ```js
    export const plusAction() = {
      return {
        type: 'PLUS' // require true
      }
    }
    export const minusAction() = {
      return {
        type: 'MINUS'
      }
    }
    ```
2. 创建一个`reducer`，接收`（state，action）`，将`state`返回给`store`
    ```js
    const initialState = {
      value: 0
    }
    export const counterReducer = (state = initialValue, action) => {
      switch(action.type) {
        case 'PLUS':
          return {
            value: state.value + 1
          };
        case 'MINUS':
          return {
            value: state.value - 1
          };
        default:
          return state; // 返回默认值
      }
    }
    ```
3. 创建一个`store`，接收`reducer`
    ```js
    const { createStore } from 'redux'
    const { counterReducer } from './reducers/index.js'
    export const store = createStore(counterReducer)
    ```
4. 导入`store`，当数据需要发生变换的时候，`dispatch`派发（对象）`action`，执行`reducer`里面相应的方法，返回`store`

5. 监听`state`的变换，在`componentWillDidMount`生命周期的时候设置监听器，设置后每次`dispatch`都会监听变化

    ```jsx
    import React from 'react'
    import { store } from './store/index.js'
    import { plusAction, minusAction } from './actions/index.js'
    
    class IndexPage extends React.Component {
      plusClickHandle = () => {
        store.dispatch(plusAction())
      }
      minusClickHandle = () => {
        store.dispatch(minusAction())
      }
      componentWillDidMount() {
        store.subscribe(() => {
          console.log(store.getState().value)
        })
        this.setState({}) // 监听变化进行 更新
      }
      render() {
        return (
          <div class="index-page">
            <button onClick={ this.plusClickHandle }> + </button>
            <button onClick={ this.minusClickHandle }> - </button>
            <div>{store.getState().value}</div>
          </div>
        );
      }
    }
    ```

## `React-redux`
* 在`react`中更好使用`redux`
> `yarn add react-redux`
### `connect`
* 参数`(mapStateToProps, mapDispatchToProps)`
* 可以在组件的props中获取`state`，和派发`action`

#### 基础使用
?> connect，会将state和dispatch合并到组件的props，这里的合并是平级的，也就是说，在state对象里面的属性值，会变成props里面的属性值

!> 好像使用connect获取state值会有问题，如直接在jsx中使用this.props会有问题

1. 和之前使用类似需要创建`reducer`来创建`store`导出
    ```js
    // reducers/index.js
    const initialState = {
      counter: 0
    };

    export reducer = (state = initialState, action) => {
      switch(action.type) {
        case 'PLUS':
          return {
            counter: state.counter + 1
          };
        default:
          return state;
      }
    }
    ```
    ```js
    // store/index.js
    import { createStore } from 'redux';
    import { reducer } from './reducers/index.js';

    export default createStore(reducer);
    ```
2. 在需要的使用的最外层包裹`Provider`, 使用`store`作为参数传入
    ```jsx
    import { Provider } from 'react-redux';

    <Provider store={ store }>
      <Home></Home>
    </Provider>
    ```
3. 在需要改变state状态的组件中使用`connect(null, mapDispathToProps)(Btn)`使用第二个参数，在`Btn`组件中可以通过`this.props`获取dispatch相应的方法，执行方法就是相当于执行`stroe.dispatch({type: 'PLUS'})`
    ```jsx
    import React from 'react';

    class Btn extends React.Component {
      
      clickHandle = () => {
        this.props.plusAction()
      }

      render() {
        return (
          <button onClick={ this.clickHandle }></button>
        );
      }
    }

    const mapDispatchToProps = (dispatch) => {
      return {
        plusAction: () => {
          dispatch({
            type: 'PLUS'
          });
        }
      };
    };

    export default connect(null, mapDispatchToProps)(Btn);
    ```
4. 在需要获取state值的地方使用`connect(mapStateToProps)`的第一个方法，就可以直接通过`this.props`获取
    ```jsx
    import React from 'react';

    class Text extends React.Component {
      render() {
        return (
          <div>{this.props.counter}</div>
        );
      }
    }

    const mapStateToProps = (state) => {
      return state;
    }

    export default connect(mapStateToProps)(Text);
    ```

### `reducer`拆分
?> 在使用`connect`获取`state`时候，`mapStateToProps`直接返回`state -> this.props -> {data1, data2}`, `mapStateToProps`返回`state.data1 -> this.props -> data1`
* `combineReducers`
  ```js
  import reducer1 from './reducers/reducer1.js'
  import reducer2 from './reducers/reducer2.js'

  const reducerRoot = combineReducers({
    data1: reducer1,
    data2: reducer2
  })
  ```
* 其他用法与上面差不多


### 异步`action`

#### `redux-thunk`
1. 创建`store`，加入中间件
    ```js
    import { createStore, applyMiddleWare } from 'redux';
    import thunk from 'redux-thunk';
    import { reducer } from './reducers/index.js';

    export const store = createStore(reducer, applyMiddleWare(thunk));
    ```

2. 创建异步的`creator action`
    ```js
    export const fetchList = () => {
      return async (dispatch) => {
        // 获取数据
        const list = await getList(param)
        dispatch({
          type: 'GET_LIST',
          list
        })
      }
    };
    ```
3. 使用`connect`进行`dispatch`，将数据存放在store中
    ```jsx
    import { connect } from 'react-redux'
    import { fetchList } from './actions'

    const Btn = (props) => {
      return (
        <button onClick={props.getList}>click</button>
      )
    }

    const mapDispatchToProps = (dispatch) => {
      return {
        getList: () => {
          dispatch(fetchList)
        }
      }
    }

    export default connect(null, mapDispatchToProps)(Btn)
    ```
4. 获取在`store`中的`lis`t数据
    ```jsx
    import { connect } from 'react-redux'

    const Text = (porps) => {
      return (<div>
        <ul>
          {
            props.list?.length ? props.list.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))
          }
        </ul>
      </div>)
    }
    const mapStateToProps = (state) => {
      return state
    }
    export default connect(mapStateToProps, null)(Text)
    ```