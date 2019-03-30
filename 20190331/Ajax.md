# <font size=7>[Ajax](https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX)</font>

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
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', 'test.html');
    httpRequest.send();
  }

  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        alert(httpRequest.responseText);
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
})();
</script>
```

## <font size=6>[XMLHttpRequest API](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)</font>

### <font size=5>请求的类型</font>

### <font size=5>response 处理</font>

### <font size=5>二进制数据处理</font>

### <font size=5>监控进度</font>

### <font size=5>提交表单和更新文件</font>

### <font size=5>获取最后修改的时间</font>

### <font size=5>跨站点请求</font>

### <font size=5>绕过缓存</font>

### <font size=5>安全</font>

Access-Control-Allow-Origin

## <font size=6>[Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)</font>

### <font size=5>Headers</font>

可以通过 headers 对象修改 headers 的属性

### <font size=5>Response</font>

### <font size=5>Body</font>

