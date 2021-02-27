# Mysql

## 控制台登录
### 启动数据库
`net start mysql`
### 关闭数据库
`new stop mysql`

## 操作数据库

### DQL
* 查询

### DML
* 插入
* 修改
* 删除

### DDL
* 库和表的管理

### TCL
* 事务

## 查询

## 其他操作
### 修改密码
* mysql> ALTER user 'root'@'localhost' IDENTIFIED BY '123456';
### 修改用户名
* update user set user='xly' where user='root';
<font color="#f66">注意MySQL需要在管理员下的命令行运行，否则就没有权限"></font>    
[csdn参考文章](https://www.cnblogs.com/laumians-notes/p/9069498.html)

[菜鸟网参考](http://www.runoob.com/mysql/mysql-install.html)

---
## 问题
[node连接mysql身份验证方式报错解决](https://blog.csdn.net/XDMFC/article/details/80263215#commentBox)

<font color="#f44">向数据库发送请求，返回的是一个数组，有时候需要的是一个对象，所以要根据实际的要求返回</font> 
