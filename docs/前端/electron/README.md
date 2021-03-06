# 使用electron

* 使用`yarn`进行项目模块的管理

## 依赖
### 开发环境
* `electron`
> `yarn add electron --dev --platform=linux`

#### 在vs code中进行调试配置, 添加配置文件，选择`NodeJs`
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "调试",
            "type": "node",
            "request": "launch",
            "cwd": "${workspaceRoot}",
            "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/electron",
            "windows": {
                "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/electron.cmd"
            },
            "args": ["."],
            "outputCapture": "std"
        }
    ]
}
```

### 通信
#### 主进程和渲染进程之间的通信
* `ipcMain`
* `ipcRender`


```javascript
// 渲染进程给主进程发送信息
const { ipcRender } = require('electron')

ipcRender.send('sendToMainMsg1', { name: '1' })

// 主进程接受信息
const { ipcMain } = require('electron')

ipcMain.on('sendToMainMsg1', (event, param1) => {
    console.log(param1) // {n ame: 1 }
})
```

```javascript
// 主进程给渲染进程发送信息
// const { ipcMain } = require('electron')
// 在主进程里面通过拿到的窗口对象的webC  ontents来发送
win.webContents.send('')
```

* 这些方法都是异步操作不会使主进程发生堵塞
* 如果多个渲染窗口向主进程发送消息，那么主进程怎么知道发过来的是哪一个渲染进程的呢

```javascript
ipcMain.on('send', (event) => {
    event.sender //表示 webcontents
})`
```

#### remote
* 渲染进程使用主进程的方法通过remote方法

### 在electron中引入`vue`(`electron`以插件的形式存在)
1. 安装
> `yarn global add @vue/cli`

2. 添加到环境变量中
> 查看目录 `yarn global dir`
> 将node_modules/.bin下的当前绝对路径添加到path当中

3. 创建环境
`vue create <name>`

4. 在electron中引入vue,其实使用`electron-builder`插件的形式, 所以要先创建vue项目, 再引入,进入到项目当中
`vue add electron-bundile`

5. 运行
`yarn electron:serve`

### 自定义窗口标题栏
* 在引入了vue的基础上
1. 禁止系统默认的标题栏
    > `frame: false`
2.  将自定义的`web`内容作为标题栏
3.  双击标题栏实现放大和缩小
    > `-webkit-app-region: drag`
4. 监听窗口事件
5. 调用窗口的各种事件

### 保存窗口的信息
* 使用`localstorage`

### 注意
#### 运行问题
!> 出现，<font color="#f00">再试几次的错误</font>，尝试翻墙，这是在下载`vue.js devtools`
> 或者运行``
