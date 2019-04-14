# <font size=7>web前端错误捕获</font>
在前端日志系统中,首先是错误的捕获,本文将介绍捕获的基本方法
## <font size=6>onerror</font>
> - 当JavaScript脚本运行错误时,window会触发ErrorEvent接口的error事件,并执行window.onerror方法
> - 当资源加载失败时,加载资源的元素将触发Event接口的error事件,并执行元素的onerror方法,该事件并不会冒泡到window
> 
window.onerror方式将帮助我们捕获绝大多数的错误
> - message：错误信息（字符串）。
> - source：发生错误的脚本URL（字符串）
> - lineno：发生错误的行号（数字）
> - colno：发生错误的列号（数字）
> - error：Error对象（对象）

window.addEventListener('error')
```JavaScript
window.addEventListener('error', function(event) { ... })
// ErrorEvent 类型的event包含有关事件和错误的所有信息。
```
element.onerror
```JavaScript
element.onerror = function(event) { ... }
// element.onerror使用单一Event参数的函数作为其处理函数。
```
## <font size=6>script error</font>
但是当加载不同域的脚本发成错误时将会抛出 script error,我们无从得知具体的错误,当然也是有解决方案的

## <font size=5>crossorigin="anonymous" + Access-Control-Allow-Origin: *(or domain)</font>

```javascript
// 在前端如何设置script标签
<script src="http://127.0.0.1/js/foo.js" crossorigin="anonymous"></script>
```

```javascript
// 在服务端如何设置header
response.setHeader('Access-Control-Allow-Origin', '*')
```

如何能在onerror中拿到错误信息

## <font size=5>try/catch</font>

```javascript
try {
  // 不同域脚本中定义的方法,会发生错误
    foo()
  } catch (err) {
    // 如何便能在这里捕获到错误
    console.log(err)
  }
```

## <font size=6>promise reject</font>

但是上述仍不能捕获一种错误,即实例Promise对象,但是调用时没有定义reject方法,同时不凑巧该实例发生了错误,此时window.unhandledrejection事件就出现了
```javascript
 window.onunhandledrejection = function(event) {
    console.log('onunhandledrejection')
    console.log(event)
    // 如此便能捕获错误,event.reason将包含reject的参数信息
  }
```
