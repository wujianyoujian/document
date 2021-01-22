# uniCloud云开发平台

## 使用
> 1. 在创建新项目的时候启用uniCloud进行开发
> 2. 在生成的项目文件中会比普通的文件多出一个cloudfunctions文件夹也就是云函数
> 3. 右键创建一个新的云服务空间(需要实名认证)
> 4. 使用就是新建云函数, 再右键上传部署


## 云数据库
### 初始化
> 使用`db_init.json`, 进行云数据库的初始化
```json
{
    // 集合（表名）
    "collection_name": { 
        // 数据
        "data": [ 
           {
                "_id": "da51bd8c5e37ac14099ea43a2505a1a5",
               "name": "tom"
           }
        ]
    }
}
```
### 使用
```js
// 获取数据库
const db = uniCloud.database()
// 数据库当中的表
const collection = db.collection('user')
```
#### 增加
* `add`

#### 删除
* `remove`

#### 更新
* `update`
* `set`

#### 查找
* `get()`
> 获取所有
* `doc().get()`
> `doc`只定位id
* `where().get()`
> 添加查找

#### 字段
> `field` 指定需要返回的字段
> 为`false`不返回这个字段, 为`true`只返回这个字段
```javascript
db.collection('article').field({'content': false}).get()
```
#### 聚合
[聚合操作](https://uniapp.dcloud.io/uniCloud/cf-database?id=aggregate)

> 进行聚合操作之前需要加上`.aggregate()`表示要进行聚合操作

##### `match`
> 查找匹配的文档

```javascript
db.collection('articles').aggregate()
  .match({
    title: 'title1'
  })
  .end()
```
##### `project`
> 某个字段是否返回

```javascript
db.collection('articles').aggregate()
  .project({
    title: 0 // 表示去除title字段, 其他字段全部返回
  })
  .end()

db.collection('articles').aggregate()
.project({
  title: 1 // 只会返回默认的_id, 和指定的title字段
  })
  .end()
```

##### `end`
> 表示聚合操作定义完成, 发起操作

## uniCloud.
### `callFunction`
> 执行云服务空间的函数
```js
// 参数
params: Object {
  // 函数名
  name: string,
  // 参数
  data: Object,
  // 成功的回调
  success: function,
}
// 可以使用promise的方法返回
/* 云函数 */
# 包含上传的参数
event: Object
# 机器的配置
context: Object
```
### `uploadFile`
> 上传文件

?> [上传图片](https://uniapp.dcloud.io/uniCloud/storage?id=uploadfile)

### `deleteFile`
> 删除图片

* `fileList`
  > `Array<string>`