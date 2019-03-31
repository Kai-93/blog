# <font size=7>[Ajax](https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX)</font>

Ajax = Asynchronous JavaScript + XML,本身并不是技术,而是组合已有技术而成,其中主要的技术是 XMLHttpRequest object.

## <font size=6>[入门](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started)</font>

### <font size=5>什么是 Ajax</font>

Ajax 是异步的 JavaScript 和 XML,简单来说是使用 XMLhttpRequest 对象和服务器通信,支持的格式有:JSON, XML, HTML, and text 文件

Ajax 有两个主要的特性:

> - 接受和处理来自服务器的数据
> - 在接受和处理服务器数据过程中不需要刷新页面

### <font size=5>一个简单的例子</font>

```javascript
<button id="ajaxButton" type="button">Make a request</button>

<script>
(function() {
  var httpRequest;
  document.getElementById("ajaxButton").addEventListener('click', makeRequest);

  function makeRequest() {
    // 创建XMLHttpRequest实例
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    // 当request的状态修改时会出发onreadystatechange方法
    httpRequest.onreadystatechange = alertContents;
    // 第一个参数设置 request method GET, POST, HEAD等任何服务器支持的方法
    // 第二个参数设置 request url
    // 第三个参数是可选的,false - 同步请求, true-异步请求
    httpRequest.open('GET', 'test.html', true);
    // send方法将参数作为数据发送请求
    httpRequest.send();
  }


// Value	State	Description
// 0	UNSENT	Client has been created. open() not called yet.
// 1	OPENED	open() has been called.
// 2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
// 3	LOADING	Downloading; responseText holds partial data.
// 4	DONE	The operation is complete.

  function alertContents() {
     try {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          // status 是 http response 的状态码
          if (httpRequest.status === 200) {
            // httpRequest.responseText是服务器相应的数据,是一个字符串
            alert(httpRequest.responseText);
          } else {
            alert('There was a problem with the request.');
          }
        }
      }
      catch( e ) {
        alert('Caught Exception: ' + e.description);
      }
    }
  }
})();
</script>
```

## <font size=6>[XMLHttpRequest API](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)</font>

在什么是 Ajax 中已经初步了解了 XMLHttpRequest,现在来深入

### <font size=5>请求的类型</font>

此处的类型指的是请求有同步和异步之分,可由 open 方法的第三个参数设置,false 为同步,true 为异步

### <font size=5>response 处理</font>

#### <font size=4>分析和操作 responseXML 属性</font>

如果获取的数据类型是 XML,可从 responseXML 属性中获取,以下有四种方法解析 XML 文档

> - [XPath](https://developer.mozilla.org/en-US/docs/Web/XPath)

> - [DOMParser-将 XML 或 HTML 转化成 DOM](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser)

> - [XMLSerializer](https://developer.mozilla.org/en-US/docs/Web/API/XMLSerializer)

> - [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

#### <font size=4>处理 reponseTExt 中包含的 HTML 文档</font>

如果 responseText 包含的是一个原生态的 HTMl,有如下方法可以处理:

> - [使用 XMLHttpRequest.responseXML](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/HTML_in_XMLHttpRequest)

> - [直接将内容插入到文档中,fragment.body.innerHTML = content](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/HTML_in_XMLHttpRequest)

> - [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

### <font size=5>[二进制数据处理](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data)</font>

下面是例子,详情请点击标题

```javascript
var oReq = new XMLHttpRequest()

oReq.onload = function(e) {
  var arraybuffer = oReq.response // not responseText
  /* ... */
}
oReq.open('GET', url)
oReq.responseType = 'arraybuffer'
oReq.send()
```

### <font size=5>监控进度</font>

XMLHttpRequest 提供了一些事件将会在 request 过程中的不同阶段被触发

> - [progress](https://developer.mozilla.org/en-US/docs/Web/API/ProgressEvent) - 检测到数据改变了,便会触发
> - load - 传输完成触发,此时所有的数据都在 response 中
> - error - 请求出错
> - abort - 请求被取消了
> - loadend - 传输结束,但是不知道是成功还是失败

```javascript
var oReq = new XMLHttpRequest()

// 不支持文件协议
oReq.addEventListener('progress', updateProgress)
oReq.addEventListener('load', transferComplete)
oReq.addEventListener('error', transferFailed)
oReq.addEventListener('abort', transferCanceled)

oReq.open()

// ...

// progress on transfers from the server to the client (downloads)
function updateProgress(oEvent) {
  // 此处可做进度监控
  if (oEvent.lengthComputable) {
    var percentComplete = (oEvent.loaded / oEvent.total) * 100
    // ...
  } else {
    // Unable to compute progress information since the total size is unknown
  }
}

function transferComplete(evt) {
  console.log('The transfer is complete.')
}

function transferFailed(evt) {
  console.log('An error occurred while transferring the file.')
}

function transferCanceled(evt) {
  console.log('The transfer has been canceled by the user.')
}
```

### <font size=5>提交表单和更新文件</font>

#### <font size=4>使用 XMLHTTPRequest</font>

如果上传文件需要使用[FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)

> - POST + application/x-www-form-urlencoded

> Content-Type: application/x-www-form-urlencoded  
> foo=bar&baz=The+first+line.%0D%0AThe+second+line.%0D%0A

> - POST + text/plain

> Content-Type: application/x-www-form-urlencoded  
> foo=bar&baz=The+first+line.%0D%0AThe+second+line.%0D%0A

> - POST + multipart/fomr-data

> Content-Type: multipart/form-data;boundary=---------------------------314911788813839

> -----------------------------314911788813839  
> Content-Disposition: form-data; name="foo"

> bar  
> -----------------------------314911788813839  
> Content-Disposition: form-data; name="baz"

> The first line.  
> The second line.

> -----------------------------314911788813839--

> - GET - 使用 querystring

### <font size=5>获取最后修改的时间</font>

[document.lastModified](https://developer.mozilla.org/en-US/docs/Web/API/Document/lastModified)该属性可以查看当前文档的最后修改事件

在 response 的 header 中有"Last-modified"属性可以查看数据的最新修改时间

```javascript
function getHeaderTime() {
  var nLastVisit = parseFloat(
    window.localStorage.getItem('lm_' + this.filepath)
  )
  var nLastModif = Date.parse(this.getResponseHeader('Last-Modified'))

  if (isNaN(nLastVisit) || nLastModif > nLastVisit) {
    window.localStorage.setItem('lm_' + this.filepath, Date.now())
    isFinite(nLastVisit) && this.callback(nLastModif, nLastVisit)
  }
}

function ifHasChanged(sURL, fCallback) {
  var oReq = new XMLHttpRequest()
  oReq.open('HEAD' /* use HEAD - we only need the headers! */, sURL)
  oReq.callback = fCallback
  oReq.filepath = sURL
  oReq.onload = getHeaderTime
  oReq.send()
}
```

### <font size=5>[跨站点请求](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)</font>

### <font size=5>绕过缓存</font>

可以通过在 url 后面添加时间戳的方式绕过缓存,如 url?ts 或 url?a=1&ts

## <font size=6>[Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)</font>

Fetch 与 XMLHttpRequest 类似,但其更强大,更灵活

#### <font size=5>[Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers)</font>

Headers 代表了请求和相应的 headers,Headers.Headers()是在构造器,提供了丰富的 api

#### <font size=5>[Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)</font>

Request 代表了 Fetch 的资源请求,可以通过 Request.Request()构造器灵活配置请求信息

#### <font size=5>[Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)</font>

Response 代表了 Fetch 请求的返回,可以通过 Response.Response()构造,该对象提供各种属性和方法,十分强大

#### <font size=5>[Body](https://developer.mozilla.org/en-US/docs/Web/API/Body)</font>

Body 代表了请求和相应的 body,允许声明内容的类型和处理内容的方法
