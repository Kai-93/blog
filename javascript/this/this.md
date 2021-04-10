<!--
 * @Author: Kaiser
 * @Date: 2020-04-23 10:18:29
 * @Last Modified by: Kaiser
 * @Last Modified time: 2020-04-23 10:28:04
 * @Description: this
 -->

 # this

 this由运行是函数是如何被调用的决定.

 ## 箭头函数的this

 箭头函数的this指向最近的封闭的词法作用域的this

 ## call,apply,bind

 这个三个方法可以修改this的指向

 ### call,apply

 call和apply在修改时即调用了函数

 ### bind

 bind方法在调用时返回一个不能修改this指向的函数,可随时调用

 ### 构造函数

 当使用new关键词将函数作为构造函数时,将默认初始化一个空对象,该对象的constructor将指向构造函数,其__proto__将指向构造函数的prototype属性,且该默认对象将返回作为实例化的对象.

 若在构造函数中return了一个值,该值若是原始类型,将调用相应类型的构造方法并返回,若是对象,则该对象代替this返回.

# 参考
[1] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this  
[2] https://juejin.im/post/5e9dc9f0e51d45471a1cda81#heading-2
