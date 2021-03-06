# `JavaWeb`

## JavaWeb API与使用
### Tomcat服务器

### servlet
> 第一次访问的时候加载执行init方法
#### 生命周期

* 创建servlet对象
* 执行init()初始化方法
* 处理请求，doGet，doPost
* 销毁

#### url匹配
* 精准匹配
* 路径匹配
    > `/user/*`
    `/user/a/*`
    `path = /user/a/b` 
匹配第二种, 匹配长的扩展名匹配（使用扩展名匹配不能使用路径匹配）
* 缺省匹配

### 添加`servlet`
1. 注解方式
    ```java
    @WebServlet("/checkUserIfExist")
    class CheckUserIfExist extends HttpServlet {
        @override
        doGet(HttpServletRequest req, HttpServletResponse res) {
        }
    }
    ```
2. xml文件方式配置
    ```xml
    <servlet>
        <servlet-name>userServlet</servlet-name>
        <servlet-class>com.wujianyoujian.controller.UserServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>userServlet</servlet-name>
        <url-pattern>/user/user.do</url-pattern>
    </servlet-mapping>
    ```

#### 错误页面配置
* 在web.xml中进行配置即可
    ```xml
    <error-page>
        <error-code>404</error-code>
        <location>/WEB-INF/page/error/404.jsp</location>
    </error-page>
    ```

#### 初始化参数
```xml
<servlet>
    <servlet-name>userServlet</servlet-name>
        <servlet-class>com.wujianyoujian.controller.UserServlet</servlet-class>
    <init-param>
        <param-name>password</param-name>
        <param-value>123456</param-value>
    </init-param>
</servlet>
```

```java
class TestServlet extends HttpServlet {
    @Override
    public void init(ServletConfig config) throws ServletException {
        this.config = config
    }
}
```

#### 配置过滤器
* `filter` - `interface`
    ```xml
    <!-- 现在xml中进行配置 -->
    <filter>
        <filter-name>filter1</filter-name>
        <filter-class>com.wujianyoujian.filter.HttpFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>filter1</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
    ```

实现filter方法, 使用`filterChain`作为开关, 释放
```java
package com.wujianyoujian.filter;
import javax.servlet.*;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;


/**
 * @author wujianyoujian
 * @create 2021-03-31 16:32
 */
public class HttpFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        ((HttpServletRequest)servletRequest).setAttribute("beforeServlet", 1);
        filterChain.doFilter(servletRequest, servletResponse);
        servletResponse.setContentType("text/html");
        servletResponse.setCharacterEncoding("utf-8");
    }

    @Override
    public void destroy() {

    }
}
```
### JSP
* 在jsp页面中无法直接访问`WEB-INF`下的静态文件, 使用`<%@include %>` `<JSP:include page=""></JSP>`
#### JSP指令
##### `page`, 指定响应的一些参数，编码，可以导入包
##### `include` 引入页面  
* 注意在被引入的页面里面不能重复定义page 的contentType属性值
    ```jsp
    <%@include file="header.jsp"%>
    ```
#### JSP标签
* `<%-- 主页 --%>`
    ```jsp
    <!-- 包含页面 -->
    <jsp:include page="footer.jsp">
        <jsp:param name="user" value="xiaowang"/>
    </jsp:include>
    <!-- 请求转发 -->
    <jsp:forward page="user.jsp">
    </jsp:forward>
    ```
* `<%-- 尾部 --%>`
    ```jsp
    <div class="footer">
        footer
        <%=request.getParameter("user")%>
    </div>
    ```
#### 上下文对象
* `pagecontext`
* `request`
  * 方法
    * `request.getScheme()` => `http`
    * `request.getServerName()` => `127.0.0.1`
    * `request.getServerPort()` => `8000`
    * `request.getContextPath()` => `/web`
* `session`
* `application`

#### 内置对象

#### el表达式
* 更加方便的读取上下文的值
* 不能写入
* 不支持if判断和控制语句

#### JSTL标签工具库
[文章](https://www.runoob.com/jsp/jsp-jstl.html)
* 导入相应的jstl和standard的包
* <b>注意, 要将`Artifacts`中的`Available Elements` 中的lib右键`Put into Output Root`</b>
* 引用jsp文件的时候，路径是相对于web项目的路径的
    ```jsp
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <c:set scope="page" var="name" value="xiaoMing" />
        ${pageScope.name}
    ```
#### 监听器
* 监听容器的变化
* `request`, `http`

#### 虚拟文件路径映射
在IDEA中进行设置, 在`run configurations`的`tomcat`的`deployment`中添加
![avatar](./img/printImage1.png)

## 流程
### 创建一个javaWeb项目
1. 创建一个存放web的目录和web.xml配置文件，web/WEB-INF/web.xml
    ```xml
    <?xml version="1.0" encoding="utf-8" ?>
    <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
            version="4.0">
    </web-app>
    ```
2. 将项目标记成`javaweb`项目，在`project structure`中`facets`，点击添加+，为web。再在`Artifacts`中添加`web application: exploded/from module`

3. 配置`tomcat`, 在`Run/Debug configurations`中添加`Tomcat > local`,在`Deployment`中
4. 在web目录创建一个`index.jsp`, 点击运行最后就会运行项目

### 导入运行基本依赖包
#### servlet包
* `servlet-api`
* `jsp-api`
* `jstl`
* `standard`
#### jdbc包
* `mysql-connect`
* `druid`

### 获取Http请求的数据
* `req<HttpServletRequest>.getParameter()`

### 返回数据
```java
if (ifExist) {
    resModel = new ResModel(0, "用户存在");
} else {
    resModel = new ResModel(0, "用户不存在");
}
resp.addHeader("content-type", "application/json");
PrintWriter writer = resp.getWriter();
writer.write(resModel.toString());
writer.flush();
writer.close();
```

### 文件上传
1. 有文件进行上传的时候需要对表单设置参数`enctype="multipart/form-data"`, 请求使用表单自身的请求，方式为`POST`
    ```html
    <form enctype="multipart/form-data" id="register" method="post" action="user/register.do">
        <input type="file" name="profile" />
    </form>
    ```
2. 对于servlet需要设置注解`@MultipartConfig`
3. 接受传过来的流文件，并且保存
    ```java
    Part profile = req.getPart("profile");
    String fileName = profile.getSubmittedFileName();
    InputStream inputStream = profile.getInputStream();
    OutputStream outputStream = new FileOutputStream("D:\\uploads\\" + fileName);
    byte[] buff = new byte[1024];
    int len = 0;
    while ((len = inputStream.read(buff)) != -1) {
        outputStream.write(buff, 0, len);
        outputStream.flush();
    }
    inputStream.close();
    outputStream.close();
    ```

## 注意

### <font color="#f00">JSP文件引入外部js文件发生中文乱码问题</font>
?> 在配置文件`web.xml`加入下面语句, 在`web-app`标签内的
```xml
<jsp-config>
    <jsp-property-group>
        <display-name>HtmlConfiguration</display-name>
        <url-pattern>*.html</url-pattern>
        <page-encoding>UTF-8</page-encoding>
    </jsp-property-group>
    <jsp-property-group>
        <display-name>JspConfiguration</display-name>
        <url-pattern>*.jsp</url-pattern>
        <page-encoding>UTF-8</page-encoding>
    </jsp-property-group>
    <jsp-property-group>
        <display-name>JsConfiguration</display-name>
        <url-pattern>*.js</url-pattern>
        <page-encoding>UTF-8</page-encoding>
    </jsp-property-group>
</jsp-config>
```

### 返回对象的字符JOSON流必须严格按照JSON的标准
* 属性为双引号