# <font size=6>[Ajax - Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)</font>

Fetch 与 XMLHttpRequest 类似,但其更易使用,更强大,更灵活

## <font size=6>[基本使用方式](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)</font>

> Fetch 返回的 Promise 不会 reject HTTP 的错误状态,它会正常 resolve 错误结果,Fetch 仅会 reject 网络错误和其他防止请求完成的错误

> Fetch 默认不会发送和接受任何来自于服务器的 cookies,如若需要在参数中设置

简单的 demo

```javascript
var data = {}
var url = 'http://demo.com/a'
var myHeaders = new Headers()
// 设置请求头部
myHeaders.append('Content-Type', 'text/plain')
// 设置初始化参数
var myInit = {
  method: 'POST',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default',
  body: JSON.stringify(data)
}
//实例请求
var myRequest = new Request(url', myInit)
// fetch
fetch(myRequest)
  .then(response =>{
    // 对数据格式错处理
     return response.json()
  })
  .then(data=>{
    // 处理业务
    console.log(data)
  })
  // catch error
  .catch(error => {
    console.error(error)
  })
```

## <font size=6>[Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers)</font>

Headers 是 Fetch 的接口,允许在 http 的 request 和 response 的 headers 自定义大量 [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)中定义的头部信息

### <font size=5>[Headers 构造器](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers)</font>

通过下方例子构建

```javascript
/**
 * init:自定义信息
 **/

var myHeaders = new Headers(init)
```

### <font size=5>方法</font>

#### <font size=4>[Headers.append()](https://developer.mozilla.org/en-US/docs/Web/API/Headers/append)</font>

可在 Headers 对象中新增 一个 HTTP header 设置

#### <font size=4>[Headers.delete()](https://developer.mozilla.org/en-US/docs/Web/API/Headers/delete)</font>

从 Headers 对象中移出一个 header

#### <font size=4>[Headers.entries()](https://developer.mozilla.org/en-US/docs/Web/API/Headers/entries)</font>

返回一个迭代器,可用来遍历 Headers 对象

#### <font size=4>[Headers.forEach()](https://developer.mozilla.org/en-US/docs/Web/API/Headers/forEach)</font>

可遍历 Headers 对象中的每一个属性

#### <font size=4>[Headers.get()](https://developer.mozilla.org/en-US/docs/Web/API/Headers/get)</font>

从 Headers 对象中查找指定的 header

#### <font size=4>[Headers.has()](https://developer.mozilla.org/en-US/docs/Web/API/Headers/has)</font>

判断 Headers 对象中是否拥有指定的 header

#### <font size=4>[Headers.keys()](https://developer.mozilla.org/en-US/docs/Web/API/Headers/keys)</font>

以迭代器的形式返回 Headers 对象中所有的 header 的 name

#### <font size=4>[Headers.set()](https://developer.mozilla.org/en-US/docs/Web/API/Headers/set)</font>

对 Headers 对象中已经存在的 header 设置新值

#### <font size=4>[Headers.values()](https://developer.mozilla.org/en-US/docs/Web/API/Headers/values)</font>

以迭代器的形式返回 Headers 对象中所有的 header 的值

#### <font size=4>[Headers.getAll()](https://developer.mozilla.org/en-US/docs/Web/API/Headers/getAll)</font>

以数组的形式返回 Headers 对象中所有的 header 的值

## <font size=6>[Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)</font>

Request 表示资源请求,可以通过 Request.Request()构造器灵活配置请求信息

### <font size=5>[Headers 构造器](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request)</font>

通过下方例子构建

```javascript
/**
 * input:url(String类型)或request对象
 * init:自定义信息,可选
 **/

var myRequest = new Request(input[, init]);
```

### <font size=5>[属性](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request)</font>

#### <font size=4>[Request.cache - Read only](https://developer.mozilla.org/en-US/docs/Web/API/Request/cache)</font>

请求的 cache 模式,控制着浏览器对 [HTTP cache](https://developer.mozilla.org/en-US/docs/Web/API/Request/cache) 的管理
cache 的值:

> - default: 浏览器在其 HTTP 缓存中查找所要匹配的请求.
>   > - 如果有找到了且是[新鲜](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)的,就从缓存中获取
>   > - 如果有找到了且是陈旧的,浏览器会向远端服务器发起一个[条件请求](https://developer.mozilla.org/en-US/docs/Web/HTTP/Conditional_requests),若浏览器说没有修改,则从缓存中获取,反之,将从浏览器下载资源并更行缓存
>   > - 如果没找到,则正常发起请求获取资源并更新缓存

> - no-store: 浏览器将发起请求时不会先去缓存中查找,然后不会下载资源保存在缓存中

> - reload: 浏览器将发起请求时不会先去缓存中查找,但之后会下载资源保存在缓存中

> - no-cache: 浏览器在其 HTTP 缓存中查找所要匹配的请求.
>   > - 如果找到了,不论[新鲜](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)还是陈旧的,浏览器都将向远端服务器发起一个[条件请求](https://developer.mozilla.org/en-US/docs/Web/HTTP/Conditional_requests),若浏览器说没有修改,则从缓存中获取,反之,将从浏览器下载资源并更行缓存
>   > - 如果没找到,则正常发起请求获取资源并更新缓存

> - force-cache: 浏览器在其 HTTP 缓存中查找所要匹配的请求.
>   > - 如果找到了,不论[新鲜](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)还是陈旧的,浏览器都将从缓存中获取
>   > - 如果没找到,则正常发起请求获取资源并更新缓存

> - only-if-cached: 浏览器在其 HTTP 缓存中查找所要匹配的请求.该模式仅用在 request.modeo 等于 same-origin 的时候
>   > - 如果找到了,不论[新鲜](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)还是陈旧的,浏览器都将从缓存中获取
>   > - 如果没找到,将返回[504 Gateway timeout](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504)

#### <font size=4>[Request.context - Read only](https://developer.mozilla.org/en-US/docs/Web/API/Request/context)</font>

已弃用

#### <font size=4>[Request.credentials - Read only](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials)</font>

表示是否允许请求(跨域请求)携带用户证书(cookies, basic http auth, 等等)

> - omit: 不发送也不接受 cookies
> - same-origin: 如果是在同域名的情况下则允许.(默认值)
> - include: 即使是在跨域的情况下也允许携带

#### <font size=4>[Request.destination - Read only](https://developer.mozilla.org/en-US/docs/Web/API/Request/destination)</font>

返回一个字符串用来描述请求内容的类型,将会是[RequestDestination](https://developer.mozilla.org/en-US/docs/Web/API/RequestDestination)中的一个

#### <font size=4>[Request.headers - Read only](https://developer.mozilla.org/en-US/docs/Web/API/Request/headers)</font>

返回整个 request 的 headers 对象

#### <font size=4>[Request.integrity - Read only](https://developer.mozilla.org/en-US/docs/Web/API/Request/integrity)</font>

表示请求的 [subresource integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) (e.g., sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=).  
[subresource integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) 是一个安全特性,可以使浏览器验证要获取的资源是否被意外的人为修改

#### <font size=4>[Request.method - Read only](https://developer.mozilla.org/en-US/docs/Web/API/Request/method)</font>

表示请求的方法 (GET, POST, 等等)

#### <font size=4>[Request.mode - Read only](https://developer.mozilla.org/en-US/docs/Web/API/Request/mode)</font>

表示请求的模式(例如, cors, no-cors, same-origin, navigate.)

> - same-origin: 在该模式将不允许跨域请求
> - no-cors: 防止除 HEAD,GET 和 POST 之外的请求,和非简单头部,如果有任何 ServiceWorkers 拦截了请求将不会修改或添加简单请求之后的 header,javascript 也将无法访问 response 中的任何属性,为了安全性
> - cors:允许跨域请求
> - navigate: 该模式支持导航

#### <font size=4>[Request.redirect - Read only](https://developer.mozilla.org/en-US/docs/Web/API/Request/redirect)</font>

?? 什么鬼

#### <font size=4>[Request.referrer - Read only](https://developer.mozilla.org/en-US/docs/Web/API/Request/referrer)</font>

表示请求中引用

#### <font size=4>[Request.referrerPolicy - Read only](https://developer.mozilla.org/en-US/docs/Web/API/Request/referrerPolicy)</font>

表示请求的引用政策 (如, no-referrer).

#### <font size=4>[Request.url - Read only](https://developer.mozilla.org/en-US/docs/Web/API/Request/url)</font>

表示请求的 url

#### <font size=4>[body - Read only](https://developer.mozilla.org/en-US/docs/Web/API/Body/body)</font>

请求中 body 的 getter

#### <font size=4>[bodyUsed - Read only](https://developer.mozilla.org/en-US/docs/Web/API/Body/bodyUsed)</font>

表示请求中是否有 body

### <font size=5>方法</font>

#### <font size=4>[Request.clone()](https://developer.mozilla.org/en-US/docs/Web/API/Request/clone)</font>

返回一个当前 request 对象的副本

#### <font size=4>[Body.arrayBuffer()](https://developer.mozilla.org/en-US/docs/Web/API/Body/arrayBuffer)</font>

返回一个 Promise,并 resolve,其参数为 [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

#### <font size=4>[Body.blob()](https://developer.mozilla.org/en-US/docs/Web/API/Body/blob)</font>

返回一个 Promise,并 resolve,其参数为 [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)

#### <font size=4>[Body.formData()](https://developer.mozilla.org/en-US/docs/Web/API/Body/arrayBuffer)</font>

返回一个 Promise,并 resolve,其参数为 [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

#### <font size=4>[Body.json()](https://developer.mozilla.org/en-US/docs/Web/API/Body/json)</font>

返回一个 Promise,并 resolve,其参数为 [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)

#### <font size=4>[Body.text()](https://developer.mozilla.org/en-US/docs/Web/API/Body/text)</font>

返回一个 Promise,并 resolve,其参数为一个字符串

## <font size=6>[Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)</font>

Response 是 Fetch 请求的响应,可以通过 Response()构造,该对象提供各种属性和方法,十分强大

### <font size=5>[Response 构造器](https://developer.mozilla.org/en-US/docs/Web/API/Response)</font>

通过下方例子构建

```javascript
/**
 * body:可以是对象,Blob,BufferSource,FormData,ReadableStream,URLSearchParams,USVString
 * init:可选
 * status: 响应状态
 * statusText: 描述响应状态的文本
 * headers: 响应的头部
 **/

var myResponse = new Response(body, init)
```

详情见[https://developer.mozilla.org/en-US/docs/Web/API/Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)

## <font size=6>[Body](https://developer.mozilla.org/en-US/docs/Web/API/Body)</font>

Body 代表了请求和相应的 body,允许声明内容的类型和处理内容的方法
