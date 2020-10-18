# Vuex

> Vuex是一个专为Vue开发的状态管理模式, 将组件的共享状态也就是数据抽取出来, 以全局单例模式管理  

[Vuex](https://vuex.vuejs.org/zh/)

![avatar](../img/vuex.png)

## 使用

> 在模化的打包系统中使用, 比如`vue-cli`创建的项目中

1. 安装`vuex`, `yarn add vuex`
2. 创建一个`/src/store/index.js`文件
3. 在`index.js`需要导入vuex, 在vue中注册vuex, 实例化这个vuex, 最后导出给根组件, 从根组件中注入到每一个子组件当中, 可以使得每一个子组件都能够获取到`store`
  ```javascript
  // /src/store/index.js
  import Vue from 'vue'
  import Vuex from 'vuex'

  Vue.use(Vuex)

  export default new Vuex.store({
    // 数据
    state: {
      count: 0
    },
    // 变动
    mutation: {

    }
  })

  // main.js
  import Vue from 'vue'
  import App from './App.vue'
  import router from './router'
  import store from './store/index'

  Vue.config.productionTip = false

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
   ```
4. 在组件当中获取存储的值
> `this.$store.state.count` 通过$store就可以获取到state中存储的值了
5. 改变存储的值, 不能直接改变store中的值, 只能显示提交(`commmit`)
> 需要先在store中的mutations(变动)定义方法
  ```javascript
  // store.js
  new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      increase (state) {
        state.count ++
      }
    }
  })
  // 组件中使用
  this.$store.commit('increase')
  ```

## `state`
> vuex使用单一状态树, 每一个应用都包含一个`store`实例
> 需要在定义的时候进行初始

## `Mutations`
> `mutation`必须是同步函数  
> 使用常量代替Mutation事件类型

## `Action`


## `Getters`
> 在Vuex中有一个getter, 相当于store中的计算属性

```javascript
new Vuex.Sotre({
  state: {
    book: {
      fileName: ''
    }
  },
  mutatuions: {
  },
  getters: {
    fileName: state => state.book.filename
  }
})
```

## 辅助函数
> 更加方便的或取vuex.store的值, 方法
> 有`mapState`, `mapGetters`, `mapMutations`, `mapActions`
> 使用扩展运算符

### mapState
```javascript
import { mapState } from 'vuex'
computed: {
  ...mapState(['count'])
}
```

### mapGetters
```javascript
import { mapGetters } from 'vuex'

computed: {
  ...mapGetters(['fileName'])
}
```

### mapMutations
```javascript
import { mapMutations } from 'vuex'

methods: {
  ...mapMutations(['increase']),
  increaseHandle () {
    this.increase()
  }
}

```
### 模块化
> modules: {}

```javascript
// a.js
export default {
  state: {
    count: 0
  },
  mutations: {
    increase (state) {
      state.count ++
    }
  }
}
// store
import a from 'a.js'
new Vuex.Store({
  modules: {
    a
  },
  getters: {
    count: state => state.a.count
  },
  actions: {
    trigger_increase (context) {
      context.commit('increase')
    }
  }
})
```