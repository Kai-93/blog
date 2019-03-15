# javascript中的number

javascript 不区分整数值和浮点值,所有数字都是浮点数值表示  
javascript 采用 IEEE 754 标准定义的 64 位浮点格式表示数字

## [IEEE 754](https://en.wikipedia.org/wiki/Double-precision_floating-point_format)

![IEEE 754](https://upload.wikimedia.org/wikipedia/commons/a/a9/IEEE_754_Double_Floating_Point_Format.svg)

> - sign: 1 bit
> - exponent: 11 bit
> - fraction: 52 bit

公式如下：
![公式](https://wikimedia.org/api/rest_v1/media/math/render/svg/61345d47f069d645947b9c0ab676c75551f1b188)

详细分析如下图所示：  
![分析图](https://devnoimg.meiyezhushou.com/images/1.jpg)

## 故采用 IEEE 754标准的语言都将会有大数问题
安全数的范围为 -2^53~2^53,超过这个范围的将无法保证数字的准确度，末尾的超过部分将变成0

下方代码是 javascript 中解决大数问题的基本思路：  
通过字符串来解决。尾数与上一次需要向高位进一的数相加，将除10的余数保存在字符串上，再判断是否需要向高位进一，具体实现代码，如下所示：
```javascript
function add (num1, num2) {
  // 实现该函数
  num1 = num1.split('')
  num2 = num2.split('')
  let result = ''
  let temp = 0
  while (num1.length || num2.length || temp) {
    temp += Number(num1.pop() || 0) + Number(num2.pop() || 0)
    result = (temp % 10) + result
    temp = temp > 9
  }
  return String(result)
}
```
