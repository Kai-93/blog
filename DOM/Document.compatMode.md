<!--
 * @Author: Kaiser
 * @Date: 2020-04-22 10:26:56
 * @Last Modified by: Kaiser
 * @Last Modified time: 2020-04-22 11:31:13
 * @Description: Document.compatMode
 -->

 # Document.compatMode 

 Document.compatMode 用于表示页面是在什么模式下[(Quirks(怪异) Mode and Standards(标准) Mode)](https://developer.mozilla.org/en-US/docs/Web/HTML/Quirks_Mode_and_Standards_Mode)渲染的.

## 语法

```JavaScript
const mode = document.compatMode
```

> * 若mode等于BackCompat,则是怪异模式
> * 若mode等于CSS1Compat,则是非怪异(no-quirks)模式(也称为标准(standard)模式或几乎标准(almost standard)模式).

注意:上述第二条中的模式现在都是标准模式,标准(standard)模式或几乎标准(almost standard)模式都是旧说法,将不被在标准使用.

参考文献:  
[1]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart  
[2]: https://developer.mozilla.org/en-US/docs/Web/HTML/Quirks_Mode_and_Standards_Mode
