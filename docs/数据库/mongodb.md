# MongoDB

> 在已经安装mongodb的基础上开启服务  

?> `net start MongoDB`

## 连接
* 默认
> `mongo`

* 带参数的链接
> `mongo "mongodb://username:password@host[:port]/defaultauthdb?<options>"`  
> 带有用户名密码, 主机, 指定数据库, 连接参数

## 命令

### 用户

#### 创建用
> 数据库带的角色
* `Read`：允许用户读取指定数据库
* `readWrite`：允许用户读写指定数据库
* `dbAdmin`：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
* `userAdmin`：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
* `clusterAdmin`：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
* `readAnyDatabase`：只在admin数据库中可用，赋予用户所有数据库的读权限
* `readWriteAnyDatabase`：只在admin数据库中可用，赋予用户所有数据库的读写权限
* `userAdminAnyDatabase`：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
* `dbAdminAnyDatabase`：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。
* `root`：只在admin数据库中可用。超级账号，超级权限。

```shell
db.createUser({
  user: <name: String>,
  pwd: <password: String>,
  roles: [
    { role: <role: String>, db: <database: String> }
  ]
})
```