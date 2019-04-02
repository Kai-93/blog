# <font size=7>[Event - 事件](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Event)</font>

# <font size=6>[事件冒泡和捕获](ttps://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Event#Event_bubbling_and_captureh)</font>

## <font size=5>事件注册的方法</font>

### <font size=4>事件处理器属性 s</font>

### <font size=4>内联事件处理器--不要使用</font>

### <font size=4>addEventListener() and removeEventListener()</font>

### <font size=4>该使用哪种机制</font>

## <font size=5>事件的其他概念</font>

### <font size=4>默认事件</font>

### <font size=4>事件的冒泡和捕获</font>

When an event is fired on an element that has parent elements (e.g. the <video> in our case), modern browsers run two different phases — the capturing phase and the bubbling phase.

#### <font size=3>捕获</font>

In the capturing phase:

The browser checks to see if the element's outer-most ancestor (<html>) has an onclick event handler registered on it in the capturing phase, and runs it if so.
Then it moves on to the next element inside <html> and does the same thing, then the next one, and so on until it reaches the element that was actually clicked on.

#### <font size=3>冒泡</font>

In the bubbling phase, the exact opposite occurs:

The browser checks to see if the element that was actually clicked on has an onclick event handler registered on it in the bubbling phase, and runs it if so.
Then it moves on to the next immediate ancestor element and does the same thing, then the next one, and so on until it reaches the <html> element.

![事件模型](https://mdn.mozillademos.org/files/14075/bubbling-capturing.png)

In modern browsers, by default, all event handlers are registered in the bubbling phase.

#### <font size=3>使用 event.stopPropagation() 来阻止冒泡</font>

#### <font size=3>事件委托</font>
