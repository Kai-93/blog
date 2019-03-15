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
