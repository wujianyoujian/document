# 基础

> Life is short, I use python

*  <i>缺点</i>
> 相对于其他语言(`c++, c, java`)来说 **慢**

* 功能
> 1. 爬虫
> 2. 大数据与数据分析(Spark)
> 3. 自动化运维与自动化测试
> 4.  web开发: Flask, Django
> 5.  机器学习: Tensor Flow
> 6.  胶水语言, 混合其它(`C++, Java`)来编程, 其它语言制作的各种模块(尤其是`C/C++ `)很轻松联结在一起

> 回归编程语言的本质, 基础! 基础! 基础! **数据结构与算法**
------
## 语法
### 基本类型
####  `Number` 数字
1. 整数 `int`
2. 浮点数 `float`
3. 布尔型 `bool` 关键字Ture, False值为1, 0
4. 复数 `complex`
```python
type(2/2) // float
type(2//2) // int '//' 表示整除
```
* 进制表示与转换(2, 8, 10, 16)
    ```python
    0b11 // 3 0b表示2进制
    0o11 // 9 0o表示8进制
    0x11 // 17 0x表示16进制
    
    bin(10) // bin方法可以将任意其它进制数转换为二进制
    int(0o11) // int方法可以将任意其它进制数转换为十进制
    oct(0xA) // oct方法可以将任意其它进制数转换为八进制
    hex(0b1000) // hex方法可以将任意其它进制数转换为十六进制
    ```
    
#### `String` 字符串
* 在python中 **字符串** 使用双引号(建议)
* 多行字符串使用**三引号**或者`\n`
* `print(r'c:\north\Njava')` // 所见所得
* 字符串操作方法

~~~python
# 不能修改元素
"Hello" * 3 // HelloHelloHello
// 字符串 * n, 字符串出现n次

"Hello, world"[2] // l
// [n] 取到第n+1个的字符

"Hello, world"[-3] // r
// [-n] 取到反序的第n个字符

"Hello, world"[0:4] // Hell
// [m, n] 从m+1个到n-1个字符

"Hello, world"[0, -2] // Hello, wor
// [m, -n] 从m+1个到length-n个字符

"Hello, world"[6:] // world
// [m:] 从m到最后一个

ord('w') // ord()返回ASCll值
~~~
##### % 格式化操作
* 与C语言中的类似
* `%d %s %f %c` 整数, 字符串, 浮点数, 字符

~~~python
name = '张三'
print('欢迎你, %s' % name)

# 1981.212
num = 81.212
print('%d' % num)
print('%.2f' % num)

# %04d 占4位, 空的用0补充, %4d 占四位, 没有空出来
print('%4d' % num)
~~~
* 参考链接
  
  > [字符串格式化详情](https://www.jb51.net/article/134290.htm)

##### format 格式化操作
* 很强大, 有很多格式表现形式, 但是也有限制

	~~~python
	# 位置
	print('欢迎你, {0}, {1}'.format('张三', '好久不见'))
	
	# 名称
	print('你好, {username}, 你的编号是{number}'.format(username="xiaoming", number=12345))
	
	# 传入字典, 使用format需要加上**
	a = {'user': 'xiaoming', 'num': 12098}
	print('你好{user}, 你的编号{num}'.format(**a))
	
	# 序列的格式化, 带入format的参数没有加上*, 就需要0[1]选取
	point = (9, 10)
	array = [1,2,3,4]
	print('x:{0[0]},y:{0[1]}'.format(point))
	print('x:{0},y:{1}'.format(*point))
	
	print('第3个元素是 {0[2]}'.format(array))
	print('第3个元素是 {2}'.format(*array))
	
	# 格式化类
	class User:
	
		def __init__(self, name, age):
			self.name = name
			self.age = age
	
		def __str__(self):
			return self.show()
	
		def show(self):
			return ('姓名{self.name},年龄{self.age}'.format(self=self))
	
	user = User('小王', 10)
	print(user)
	
	# 数字格式化, 浮点型不能强制转化为整数型
	num = 3
	Pi = 3.1415926
	print('{:.2f}'.format(Pi))
	print('{:+.2f}'.format(-Pi))  # +表示带符号
	print('{:0>3d}'.format(num))
	print('{:x<5d}'.format(num))  # > < 在大的在右小的在左 x
	print('{:,}'.format(100000))  # 100,000
	print('{:.1%}'.format(0.2))  # 25%
	~~~

---
* 参考链接

  [format](https://www.runoob.com/python/att-string-format.html)
---
#### `List` 列表

```python
// 可以存放任意类型的数据, 可以修改元素
[1,"sx", False, True]

// 嵌套列表
[1, 2, [False, True]]

// 如果带冒号的话, 还是返回一个列表
["hasx", "s", 1, "wa"][-1:] // ["wa"]

// 列表相加
[1, 2, 4]+[13, 10] // [1, 2, 4, 13, 10]

// 乘
[1, 3, 4] * 2 // [1, 3, 4, 1, 3, 4]

// 反转
[1, 2, 4][-1::-1] // [4, 2, 1]

// 判断一个元素是否在其中
3 in [1, 2, 3, 4] // True

// 不在其中
3 not in [1, 2, 3, 4] // False

// 总长度
len([1, 2, 3]) // 3

// 最大
max([1, 2, 3, 4]) // 4 // 最小 min
```

#### `Tuple` 元组

```python
// 操作方法与列表类似, 不能修改元素
(1, 2, 3)[1] // 2 

// 元组只含有一个元素的时候, ()会被认为一个运算符
type((1)) // int
type(("jee")) // string

// 只有一个元素的元组
type((1,)) // tuple

// 空元组
type(()) //tuple
```

#### `set` 集合
* **无序**
* **不重复**
* 以`{}`表示

```python
# - 集合相减, 求差集
{1, 2, 3, 4} - {3, 4} // {1, 2}
# & 求集合中相同的, 求交集
{2, 3, 1} & {1, 2, 3, 4} // {2, 1, 3}
# | 求两个集合的1和, 求并集
{1, 2, 3} | {1, 2, 4, 5, 10} // {1, 2, 3, 4, 5, 10}
# 判断空集合的类型, 使用type(set())
type({}) // dict 
```

#### `Dictionary` 字典 

* `键`(不可变类型) 	`值` 

  > `{key: value, key1: value}`
------

#### 基本类型总结

* `List`, `Tuple`, `String`属于`Sequence`(序列)
* 切片: 序列的[m:n] 的取值
* int , string, tuple不可变类型

```python
list
a = [1, 2, 4, 4]
b = a
a[0] = 9
a // [9, 2, 4, 4]
b // [9, 2, 4, 4]

# list, set, dict 属于引用类型的
# number, str, tupule 属于值类型的

a = [1, 2, 3, 4]
id(a)
>>> 46603048

a[0] = "nihao"
id(a)
>>> 46603048

b = "ss"
id(b)
>>> 49301216

b = "aa" + b
id(b)
>>> 53333056
```

### 命名规范
* 有意义, 使用原生单词
* 字母,数字,下划线组成, 不能以数字开头
* 不能使用保留关键字

### 运算符

* `+, -, *, /` 可以进行数字运算
* `0` 被认为 `false`, 非 `0` 被认为 `true`
* **and**, `x and y`, 其中一个为`false`返回`false`, x 为真返回 y
* **or**, `x or y`, 其中一个为`false`, 另一个不为`false`, 就返回不为`false`, 都为真返回前面的
* not 取反, not True -> False
#### 成员运算符
* `in`
* `not in`
------

* 对象的三个特征
> type, id, value

### 流程
* `pass` 空白语句

### 包, 模块, 类, 函数,变量

* 包以文件夹的形式表示, 模块就是一个.py文件, 类编写在模块中
* 模块与模块之间通过`import`导入

```python
# import n.py 都会执行n.py文件
# 同一级目录下

# A.py
a = [1, 2, 3]
b = 1

# B.py
import B
print(B.a)
---
from B import a
from B import a, b
from B import (a, b)
from B import *
print(a) // [1, 2, 3]

# __init__.py的用法
# 让文件夹变成包, __init__.py模块的名字就是包的名字, 导入该包下的模块会自动执行__init__.py文件, 可以用来初始化

# 内置变量__all__的用法
# 指定导出
# C.py
c = 1
d = 2
e = 3
f = 4
g = 5
__all__ = ['c', 'd', 'e' ,'f']
# 也可以在__init__中使用, 让其指定模块导出
__all__ = ['A', 'B']
# 'A', 'B'表示与__init__.py同级的A.py, B.py
```
### 函数
* `def func(*arg, **kw):`
> `*arg` 不定长参数, 以`tuple`类型存入, `**kw`, 不定长关键字参数, 以`dict`类型存入
* 序列解包

```python
# 函数的定义
def funcname(argumentlist):
	pass

def add(x, y):
	return x+y, y*x
result1, result2 = add(9, 10)

a, b, c = 1, 2, 3
print(a, b, c) # 1, 2, 3
d = 4, 5, 6
e, f, g = d
print(e, f, g) # 4, 5, 6

x = y = z = 1
```
### 面向的对象

#### 类
* 类变量 
* 类方法
* 实例变量
* 实例方法
* 静态方法
* 构造函数

```python
class Human():
	# 类变量
	num = 0
	
	# 构造函数
	def __init__(self ,name, age):
		# 实例变量
		self.name = name
		self.age = age

	# 实例方法
	def Walk(self):
		print(self.name + "在行走")
		
	# 类方法
	@classmethod
	def Total(cls):
		return cls.num += 1
		
	# 静态方法
	@staticmethod
	def run():
		print('people is running')
		
# 调用
human1 = Human('xiaowang', 20)
```
##### 继承
```python
class Student(Human):
	
	def __init__(self, name, age, school):
		# 调用父类的构造函数
		super(Student, self).__init__(name, age)
		self.school = school
	
	def doHomeWork(self):
		print(self.name + ' 在' + self.school + '做作业')
```

### `Json`和正则表达式
* 包`re`
    ```python
    import re
    
    language = 'javascriptc#PHP'
    # re.I 表示不区分大小写
    result = re.findall('(c#){1, 2}', language, re.I)
    
    print(result)
      
    ```
	```python
    # re.sub函数, 字符串的替换
    # 字符串自带的 replace 函数替换

    import re

    language = 'PythonC#\\nJavaPHPC#C#'

    result = re.sub('C#', 'Javascript', language, 1)
    result1 = language.replace('C#', 'HH', 2)

    # re.sub 0是全部替换, 而replace 0则只是替换0次(不替换)

    # print(result)
    # print(result1)

    # sub 的第二参数可以是一个函数, 参数需要用group转化下
    
    def convert(value):
        match = value.group()
        return '!!' + match + '!!'

    result3 = re.sub('C#', convert, language)
    
    print(result3)
    ```
### 高级语法
#### 内置类和函数
* `map`
* `filter`
* `reduce`
#### 列表推导式
```python
a = [1, 2, 3, 4, 5]
b = [i*2 for i in a] # [2, 4, 6, 8, 10]
```
#### 三元表达式
> `x if x > y else y` 与其它语言不同, 用if else表示, 为真在前

#### 装饰器
* 用来给已经定义好的函数添加功能, 用`@`符号
* **对修改是封闭的, 对扩展是开放的**

```python
import time
# 带参数
def decorator(func):
	def wrapper(*args, **kw):
		print(time.time())
		return func(*args, **kw)
	return wrapper

@decorator
def func_1(func_Name):
	print('show func_Name: ' + func_Name)

@decorator
def func_2(func_Name, func_Name1, **func_Name2):
	print('show ' + func_Name + ', ' + func_Name1 + " " + 	str(func_Name2['w']))

func_2('func_1', 'func_2', w = 1)
```

### `File`

* 内置函数open()
> open(file, mode...)

```python
"""使用with来进行文件的操作"""
with open('./static/test.txt', encoding='utf-8') as file_object:
    content = file_object.read()
    print(content)

```