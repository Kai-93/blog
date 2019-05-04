# <font size=7>flexible原理解析</font>

虽然flexible这个适配方案已经可以放弃使用，建议使用viewport，vw方法，但市面上还是有大量使用该方案的产品，所以还是值得解析一下。

github仓库：[https://github.com/amfe/lib-flexible](https://github.com/amfe/lib-flexible)

## <font size=6>使用方法</font>

### <font size=5>安装</font>

```cmd
npm i -S amfe-flexible
```

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
<script src="./node_modules/amfe-flexible/index.js"></script>
```

## <font size=6>原理解析</font>

源码只有短短43行，讲解分为两部分：代码中的注释和与原理总结

### <font size=5>源码注释</font>

```javascript
// 首先是一个立即执行函数，执行时传入的参数是window和document
(function flexible (window, document) {
  var docEl = document.documentElement // 返回文档的root元素
  var dpr = window.devicePixelRatio || 1 
  // 获取设备的dpr，即当前设置下物理像素与虚拟像素的比值

  // 调整body标签的fontSize，fontSize = (12 * dpr) + 'px'
  // 设置默认字体大小，默认的字体大小继承自body
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10
  // 设置root元素的fontSize = 其clientWidth / 10 + ‘px’
  function setRemUnit () {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // 当页面展示或重新设置大小的时候，触发重新
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // 检测0.5px的支持，支持则root元素的class中有hairlines
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))

```

### <font size=5>原理总结</font>

首先有几个名词需要解释一下:

#### <font size=4>rem</font>

以rem为单位，其值是相对root html元素，与em这个相对于父元素的单位不同。

rem是flexible这套适配方案的核心

[rem的详情点击此处](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size#Rems)

#### <font size=4>Element​.clientWidth</font>

![Element​.clientWidth](https://mdn.mozillademos.org/files/346/Dimensions-client.png)

如上图所示，clientWidth是元素内部的宽度，包括padding，但不包括border，margin和垂直的滚动条

[Element​.clientWidth的详情点击此处](https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth)

#### <font size=4>Document​.document​Element</font>

Document​.document​Element 返回文档的root元素，HTML文档的[<html>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html)元素

#### <font size=4>window.devicePixelRatio</font>

window.devicePixelRatio返回当前显示设备下物理像素与设备独立像素的比值，同样也可以解读为一个设备独立像素是有几个物理像素来展示的。

##### <font size=3>物理像素</font>

物理像素是组成成像传感器的最基础单元的尺寸。

##### <font size=3>设备独立像素 - Device Independent Pixels（dip）</font>

设备独立像素是一个物理测量单位，是操作系统层面设置的虚拟像素。对于前端来说是定值。

当页面设置了<meta name="viewport" content="width=device-width">，那document.documentElement.clientWidth就等于设备独立像素的宽度

[window.devicePixelRatio的详情点击此处](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)

#### <font size=4>总结</font>

首先通过设置meta，其主要作用的是width=device-width，使用这个之后，document.documentElement.clientWidth就等于设备独立像素的宽度，这样能保证不会出现横向滚动条。

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
```
然后给root元素设置fontSize为document.documentElement.clientWidth的十分之一，这样1rem就等于document.documentElement.clientWidth/10,以此做适配。

rem并非是完美的适配方案，使用了rem，最后渲染时还是转换成px，这时小数部分就四舍五入，有些结果并不是我们想要的。

## <font size=6>meta viewport</font>

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
```

meta标签中的viewport作用是什么呢？

viewport，在浏览器环境中，表示当前的浏览器的可视区域，正在被浏览的页面，在这块区域中被展示。

viewport，设置了viewport的初始尺寸，仅可使用在移动端。


|      值       |        可能的子值         |                                           描述                                            |
| :-----------: | :-----------------------: | :---------------------------------------------------------------------------------------: |
|     width     |   整数 或 device-width    |                             定义viewport的宽度，用于展示网页                              |
|    height     |   整数 or device-height   |                         定义viewport的高度，但几乎未被浏览器使用                          |
| initial-scale | 一个大于0.0小于10.0的数字 |                              定义了设备尺寸与viewport的比例                               |
| maximum-scale | 一个大于0.0小于10.0的数字 | 定义了可以放大的最大值，大于等于minimum-scale，且浏览器的设置可以忽略它，iOS10+默认忽略它 |
| minimum-scale | 一个大于0.0小于10.0的数字 | 定义了可以缩小的最小值，小于等于maximum-scale，且浏览器的设置可以忽略它，iOS10+默认忽略它 |
| user-scalable |         yes 或 no         |      no，用户不能缩放；yes，用户可以缩放，但浏览器的设置可以忽略它，iOS10+默认忽略它      |


