# <font size=7>Ajax - XMLHttpRequest</font>

Ajax = Asynchronous JavaScript + XML,本身并不是技术,而是组合已有技术而成,其中主要的技术是 XMLHttpRequest object.

## <font size=6>XMLHttpRequest</font>

### <font size=5>基本使用方式</font>

通过[XMLHttpRequest()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/XMLHttpRequest)构建 XMLHttpRequest 实例对象,然后使用[open()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open)初始化,再通过[send()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send)发送请求

```javascript
// 将返回一个XMLHttpRequest实例对象
const request = new XMLHttpRequest()
// 请求完成,处理数据
request.onload = function() {}
/**
 * 请求初始化
 * method - GET,POST,PUT,DELETE等等
 * url - 资源地址
 * async - 可选,默认是true-该请求为异步,false-该请求为同步
 * user - 可选,默认是null,用于授权使用
 * password - 可选,默认是null,用于授权使用
 **/
request.open(method, url, async, user, password)
/**
 * 请求发送
 * body - 请求中需要发送的数据体
 **/
request.send(body)
```

### <font size=5>属性</font>

属性继承自[XMLHttpRequestEventTarget](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestEventTarget)和[EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)

#### <font size=4>[XMLHttpRequest.onreadystatechange](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/onreadystatechange)</font>

当请求实例的 [readyState](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState) 改变时,便会出发该方法,且该方式适用于异步请求中

#### <font size=4>[XMLHttpRequest.readyState - Read only](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState)</font>

[readyState](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState) 的值如下:  
XMLHttpRequest.UNSENT = 0, 请求实例已创建  
XMLHttpRequest.OPENED = 1 open()已经调用,初始化完毕  
XMLHttpRequest.HEADERS_RECEIVED = 2 信息设置完成,请求已发送,且已经接受到响应头部
XMLHttpRequest.LOADING = 3 数据处理中,响应主体正在接收
XMLHttpRequest.DONE = 4 请求已完成

#### <font size=4>[XMLHttpRequest.response - Read only](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState)</font>

返回反应主体,内容的主要格式有[ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer),[Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob),[Document](https://developer.mozilla.org/en-US/docs/Web/API/Document),[JavaScript Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object),[DOMString](https://developer.mozilla.org/en-US/docs/Web/API/DOMString)等,取决于请求中的 [responseTy](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType) 属性

#### <font size=4>[XMLHttpRequest.responseText - Read only](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseText)</font>

返回一个字符串,表示请求的状态,若不成功为 null

#### <font size=4>[XMLHttpRequest.responseType - Read only](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType)</font>

表示了相应主体的数据格式

#### <font size=4>[XMLHttpRequest.responseURL - Read only](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseURL)</font>

返回一个连续的响应的 url

#### <font size=4>[XMLHttpRequest.responseXML - Read only](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseXML)</font>

响应若能解析成 xml,则返回,反之 null,同时请求失败了也为 null

#### <font size=4>[XMLHttpRequest.status - Read only](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status)</font>

返回响应的状态

#### <font size=4>[XMLHttpRequest.statusText - Read only](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState)</font>

返回一个字符串用来描述 http 请求状态啊

#### <font size=4>[XMLHttpRequest.timeout](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout)</font>

该属性可以设置请求的超时时间,以毫秒为单位

#### <font size=4>[XMLHttpRequest.ontimeout]()</font>

当请求超时时会调用改方法

#### <font size=4>[XMLHttpRequest.upload - Read only](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload)</font>

该方法返回一个[XMLHttpRequestUpload]()对象,可用于监控进程

#### <font size=4>[XMLHttpRequest.withCredentials - Read only](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState)</font>

返回一个布尔值,表示是否在请求是携带证书,例如 cookie，授权 headers 或 TLS 客户端证书

### <font size=5>方法</font>

#### <font size=4>[XMLHttpRequest.abort()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort)</font>

该方法将终止请求,将 readyState 设置为 XMLHttpRequest.UNSENT(0)

#### <font size=4>[XMLHttpRequest.getAllResponseHeaders()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders)</font>

以字符串的形式返回响应头部

#### <font size=4>[XMLHttpRequest.getResponseHeader()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getResponseHeader)</font>

返回指定的响应头部

#### <font size=4>[XMLHttpRequest.open()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open)</font>

初始化请求

#### <font size=4>[XMLHttpRequest.overrideMimeType()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/overrideMimeType)</font>

还是草案,

#### <font size=4>[XMLHttpRequest.send()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send)</font>

发送请求,参数将作为请求的数据主体

#### <font size=4>[XMLHttpRequest.setRequestHeader()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader)</font>

可以通过这个方法可以设置请求头部信息,该方法在 open 之后,send 之前调用

### <font size=5>事件</font>

#### <font size=4>[abort](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort_event)</font>

当请求被取消了就会触发该方法

#### <font size=4>[error](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/error_event)</font>

当请求发生错误时会触发该方法

#### <font size=4>[load](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/load_event)</font>

当请求成功完成时将触发该方法

#### <font size=4>[loadend](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/loadend_event)</font>

当请求完成时将触发,不论成功或失败

#### <font size=4>[loadstart](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/loadstart_event)</font>

当请求开始处理处理数据时出发该方法

#### <font size=4>[progress](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/progress_event)</font>

当接收到新的数据时将触发该方法,该方法可以监控到请求的进度
