# CSS

## 布局

### `Grid`
> 网格布局
> 和`flex`类似, 不过flex是一维进行布局, 就是在一行上进行布局, 主轴和副轴上进行排列  

## 动画

### `animation`

基本使用

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static Template</title>
    <style>
      .div1 {
        width: 100px;
        height: 100px;
        background: red;
        animation: changeColor 3s;
      }

      @keyframes changeColor {
        from {
          background: red;
        }
        to {
          background: green;
        }
      }
    </style>
  </head>
  <body>
    <div class="div1"></div>
  </body>
</html>
```
当css的样式生效的时候才会进行动画，根据定义的规则从开始到结束，执行一遍之后会变化成最开始的样子

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static Template</title>
    <style>
      .div1 {
        width: 100px;
        height: 100px;
        background: red;
        transform: translate3d(0, 0, 0);
        animation: changeColor 3s ease 3s 30 normal forwards;
      }

      @keyframes changeColor {
        0% {
          background: red;
          transform: translate3d(0, 0, 0);
        }
        25% {
          background: green;
          transform: translate3d(200px, 0, 0);
        }
        50% {
          background: red;
          transform: translate3d(200px, 200px, 0);
        }
        75% {
          background: green;
          transform: translate3d(0, 200px, 0);
        }
        100% {
          background: red;
          transform: translate3d(0, 0, 0);
        }
      }
    </style>
  </head>
  <body>
    <div class="div1"></div>
    <script src="./index.js"></script>
  </body>
</html>
```
`animation`几个常用属性使用
`animation: changeColor 3s ease 3s 30 normal forwards;`

`@keyframes`: animation-name 指定动画
`duration`: 0(number)s 一次动画的执行时间
`timing-function`: ease cubic-bezier(1,.16,.81,.46) 动画执行的节奏
`delay`: 0(number)s 延时执行
`iteration-count` 0, 1, 3 (number) | infinite 执行次数
`direction` normal | reverse 方向
`fill-mode`: forward | backward 动画完成保留哪一帧

效果如下

![css_animation](./img/css_animation.gif)

### `transition`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static Template</title>
    <style>
      .div1 {
        width: 100px;
        height: 100px;
        background: red;
        transform: translate3d(0, 0, 0);
        transition: all 5s;
      }
      .div1:hover {
        background: green;
        transform: translate3d(300px, 0, 0);
      }
    </style>
  </head>
  <body>
    <div class="div1"></div>
  </body>
</html>

```
![css_transition](./img/css_transition.gif)


