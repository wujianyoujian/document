# `JDBC`
* 操作数据库的公共接口
* 内部代码块加载到内存的时候回执行

## 快捷操作
### `ctrl + T` 查看一个类的继承关系树，自顶向下

## 操作
1. url
2. driver
3. register
4. connect

### statement

### preparestatement
* 性能高
* 防止sql注入

### 事务
* 回滚
```java
public void test5() {
        // 事务
    Connection con = null;
    PreparedStatement statement = null;
    int result;
    String sql = "insert into user_table (user, password, balance) values (?, ?, ?)";
    try {
        con = JdbcConnectUtil.getConnect();
        con.setAutoCommit(false);
        
        statement = con.prepareStatement(sql);
        statement.setString(1, "GG");
        statement.setString(2, "123456");
        statement.setInt(3, 1200);
        result = statement.executeUpdate();
        System.out.println(result);
        
        int num = 1 / 0; 
        
        statement = con.prepareStatement(sql);
        statement.setString(1, "GG");
        statement.setString(2, "123456");
        statement.setInt(3, 1200);
        result = statement.executeUpdate();
        System.out.println(result);

        con.commit();

    } catch (SQLException throwables) {
        throwables.printStackTrace();
        try {
            con.rollback();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    } finally {
          JdbcConnectUtil.closeConnect(con, statement, null);
      }
  }
```

### 连接池
#### druid
##### 配置
```js
druid.url=jdbc:mysql://127.0.0.1:3307/shop?useUnicode=true&characterEncoding=utf-8&serverTimezone=UTC
druid.username=root
druid.password=approximately222
druid.driverClassName=com.mysql.jdbc.Driver
```
##### 使用
* 基本api大致都相同, 只用初始化操作的时候的不同
* 将初始化操作写在静态代码块中
```java
protected static DataSource DATA_SOURCE = null;

    static {
        DATA_SOURCE = new DruidDataSource();
        Properties properties = new Properties();
        try {
            properties.load(BaseDao.class.getClassLoader().getResourceAsStream("jdbc.properties"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        ((DruidDataSource) DATA_SOURCE).configFromPropety(properties);
        ((DruidDataSource) DATA_SOURCE).setDefaultAutoCommit(false);
    }
```
#### hikari