# <font size=7>javascript 中的 this 机制</font>

this:当前正在执行代码的 javascript 上下文对象  
this 完全取决于在 call-site 的调用方式  
call-site: 在代码中,函数内调用的位置,而不是声明的位置,可借助调用栈找到 call-site

## <font size=6 color=#d73a49>[1.MDN 上对 this 的解释](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)</font>

## Global context - 全局上下文

在全局环境下(任何函数外),且不论是否是严格模式的状态下执行代码,this 都将指向全局对象

```javascript
// In web browsers, the window object is also the global object:
console.log(this === window) // true

a = 37
console.log(window.a) // 37

this.b = 'MDN'
console.log(window.b) // "MDN"
console.log(b) // "MDN"
```

## Function context - 函数上下文

### <font size=5 color=#83d0f2 > 简单调用 </font>

在函数里面,this 将由函数的调用方式决定

由于不是在严格模式下,并且函数调用的时候没有设置,故默认指向全局对象

```javascript
function f1() {
  return this
}

// In a browser:
f1() === window // true

// In Node:
f1() === global // true
```

然而在严格模式下,下方 f2 是直接被调用的,并不是作为一个对象的方法或者属性,故 this 值为 undefined

```javascript
function f2() {
  'use strict' // see strict mode
  return this
}

f2() === undefined // true
```

通过 call() 和 apply(),可以将调用函数中的 this 的值修改为传入的第一个参数  
call() 和 apply() 两方法来自于 Function.prototype

```javascript
// An object can be passed as the first argument to call or apply and this will be bound to it.
var obj = { a: 'Custom' }

// This property is set on the global object
var a = 'Global'

function whatsThis() {
  return this.a // The value of this is dependent on how the function is called
}

whatsThis() // 'Global'
whatsThis.call(obj) // 'Custom'
whatsThis.apply(obj) // 'Custom'
```

call() / apply() 通过下方例子可传递其他参数

```javascript
function add(c, d) {
  return this.a + this.b + c + d
}

var o = { a: 1, b: 3 }

// The first parameter is the object to use as
// 'this', subsequent parameters are passed as
// arguments in the function call
add.call(o, 5, 7) // 16

// The first parameter is the object to use as
// 'this', the second is an array whose
// members are used as the arguments in the function call
add.apply(o, [10, 20]) // 34
```

使用 call() 和 apply() 方法时,如果传入的值不是对象,将参数进行类型判断,并调用相应的构造器,如 new
Number(7),new String('foo')

```javascript
function bar() {
  console.log(Object.prototype.toString.call(this))
}

bar.call(7) // [object Number]
bar.call('foo') // [object String]
```

### <font size=5 color=#83d0f2 > bind - 绑定函数 </font>

ECMAScript5 中有个 Function.prototype.bind() 方法  
f.bind(someObject)将创建一个新的方法,这个新方法和 f 拥有相同的函数主体和作用域,但在这个新函数中, this 将被 bind 方法永久绑定为传入的第一个参数,不论新函数将被在哪使用

```javascript
function f() {
  return this.a
}

var g = f.bind({ a: 'azerty' })
console.log(g()) // azerty

var h = g.bind({ a: 'yoo' }) // bind only works once!
console.log(h()) // azerty

var o = { a: 37, f: f, g: g, h: h }
console.log(o.a, o.f(), o.g(), o.h()) // 37,37, azerty, azerty
```

### <font size=5 color=#83d0f2 > 箭头函数 </font>

在箭头函数中,this 将保留为封闭的词法上下文,在全局下,this 将会是 全局对象

```javascript
var globalObject = this
var foo = () => this
console.log(foo() === globalObject) // true
```

注意:调用箭头函数原型链上的 call/bind/apply 方法并传入想要修改的 this 对象将会被忽略,其余参数将被传入正常使用

```javascript
// Call as a method of an object
var obj = { func: foo }
console.log(obj.func() === globalObject) // true

// Attempt to set this using call
console.log(foo.call(obj) === globalObject) // true

// Attempt to set this using bind
foo = foo.bind(obj)
console.log(foo() === globalObject) // true
```

在下方例子中:

fn 函数: this 的值在 obj.bar() 调用时被永久绑定为 bar 函数的 this,也就是 obj

```javascript
fn = () => this
```

fn2 函数: fn2 函数调用时的 this 是全局对象,故箭头函数的 this 将被绑定为 全局对象

```javascript
fn2 = function() {
  var x = () => this
  return x
}
```

```javascript
var obj = {
  bar: function() {
    var x = () => this
    return x
  }
}

var fn = obj.bar()

console.log(fn() === obj) // true

var fn2 = obj.bar

console.log(fn2()() == window) // true
```

### <font size=5 color=#83d0f2 > 作为一个对象的方法 </font>

当一个函数作为一个对象的方法被调用时,函数的 this 将被设置该对象

下面的例子中,f 的 this 将设置为 o

```javascript
var o = {
  prop: 37,
  f: function() {
    return this.prop
  }
}

console.log(o.f()) // 37
```

效果同上

```javascript
var o = { prop: 37 }

function independent() {
  return this.prop
}

o.f = independent

console.log(o.f()) // 37
```

同上

```javascript
o.b = { g: independent, prop: 42 }
console.log(o.b.g()) // 42
```

#### <font size=4 color=#83d0f2 > 在对象原型链上的 this </font>

Object.create,将 o 作为 p 的原型并创建了一个新的对象,调用 p.f() 方法时, p 并没有自己的 f 属性,但是其原型 o 上有 f 方法, p.f 将引用该方法

```javascript
var o = {
  f: function() {
    return this.a + this.b
  }
}
var p = Object.create(o)
p.a = 1
p.b = 4

console.log(p.f()) // 5
```

#### <font size=4 color=#83d0f2 > 在 getter 和 setter 里的 this </font>

上一个结论,同样适用于在下方例子中

```javascript
function sum() {
  return this.a + this.b + this.c
}

var o = {
  a: 1,
  b: 2,
  c: 3,
  get average() {
    return (this.a + this.b + this.c) / 3
  }
}

Object.defineProperty(o, 'sum', {
  get: sum,
  enumerable: true,
  configurable: true
})

console.log(o.average, o.sum) // 2, 6
```

### <font size=5 color=#83d0f2 > 作为一个构造器 </font>

当一个函数做用做构造器时,即使用 new 关键词,this 将被绑定为新创建的对象

下面例子中:  
new C() 的时候,没有返回会默认创建一个空对象,然后在这个空对象里创建一个 a 属性,值为 37  
new C2() 的时候,返回了一个{a:38}

tip: 如果函数的返回值不是对象时,将构建一个空对象返回

```javascript
function C() {
  this.a = 37
}

var o = new C()
console.log(o.a) // 37

function C2() {
  this.a = 37
  return { a: 38 }
}

o = new C2()
console.log(o.a) // 38
```

### <font size=5 color=#83d0f2 > 作为一个 dom 事件的处理器 </font>

this 被设置为事件触发的元素

```javascript
// When called as a listener, turns the related element blue
function bluify(e) {
  // Always true
  console.log(this === e.currentTarget)
  // true when currentTarget and target are the same object
  console.log(this === e.target)
  this.style.backgroundColor = '#A5D9F3'
}

// Get a list of every element in the document
var elements = document.getElementsByTagName('*')

// Add bluify as a click listener so when the
// element is clicked on, it turns blue
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', bluify, false)
}
```

### <font size=5 color=#83d0f2 > 在一个内联事件处理器中 </font>

demo1: this 将设置为被设置为监听对象的 dom 元素  
demo2: 返回 windiw

```javascript
<button onclick="alert(this.tagName.toLowerCase());">
  Show this
</button>

<button onclick="alert((function() { return this; })());">
  Show inner this
</button>
```

## <font size=6 color=#d73a49>[2.你不知道的 javascript 中对 this 的解释](https://github.com/ZhaoKai-Kaiser/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch2.md)</font>

在 你不知道的 javascript 中有如下四类规则:

> - 默认绑定
> - 隐式绑定
> - 显式绑定
> - new 绑定
> - 软绑定

### <font size=5 color=#83d0f2 > Default Binding - 默认绑定 </font>

场景是发生在函数的独立调用,且没有其他绑定规则的应用时会使用默认绑定

下面的代码片段就是发生了典型的默认绑定,为什么判定是默认绑定  
因为 foo 函数是直接调用的,没有其他的操作,即没有其他的绑定规则应用在这里,故应用了默认绑定 this 指向 Global/window

```javascript
function foo() {
  console.log(this.a)
}

var a = 2

foo() // 2
```

若此时使用了 'use strict'(严格模式),this 将是 undefined

```javascript
function foo() {
  'use strict'

  console.log(this.a)
}

var a = 2

foo() // TypeError: `this` is `undefined`
```

### <font size=5 color=#83d0f2 > Implicit Binding - 隐式绑定 </font>

implicit binding - 隐式绑定: call-site 是否有上下文对象

下面的代码,foo 是 obj 的一个方法,foo()调用时,使用了 obj 作为上下文,即 obj.foo(),故 foo 函数内部的 this 值为 obj

```javascript
function foo() {
  console.log(this.a)
}

var obj = {
  a: 2,
  foo: foo
}

obj.foo() // 2
```

需要注意的是,在链式调用中,只有最近的对象才会影响 this,如下方代码

```javascript
function foo() {
  console.log(this.a)
}

var obj2 = {
  a: 42,
  foo: foo
}

var obj1 = {
  a: 2,
  obj2: obj2
}

obj1.obj2.foo() // 42
```

在隐式绑定中有特殊的情况存在-<font color=red>绑定丢失</font>,如下方代码所示,obj.foo 并不是直接调用,而是声明了一个变量作为 obj.foo 的应用,实际上是 foo 函数的引用,此时 call-site 是 bar(),这只是一个函数的普通调用,不是各种装饰调用,故默认绑定将应用  
doFoo(obj.foo)的表现也是如此,doFoo 函数内部会有一个 fn 作为函数 foo 的引用

```javascript
function foo() {
  console.log(this.a)
}

function doFoo(fn) {
  // `fn` is just another reference to `foo`

  fn() // <-- call-site!
}

var obj = {
  a: 2,
  foo: foo
}

var bar = obj.foo // function reference/alias!

var a = 'oops, global' // `a` also property on global object

bar() // "oops, global"

doFoo(obj.foo) // "oops, global"
```

### <font size=5 color=#83d0f2 > Explicit Binding - 显式绑定 </font>

可以使用 Function.prototype.call,Function.prototype.apply 方法  
这些方法将传入的第一个参数(一个对象),作为调用函数的 this,并执行函数,如下方代码所示
如果第一个参数是原始类型的值(如 string,number 等),这类参数,将会被其类型对应的对象构造器重新创建对象,如 new String(),new Number()等  
需要注意的是显式绑定同样没有解决绑定丢失的问题

```javascript
function foo() {
  console.log(this.a)
}

var obj = {
  a: 2
}

foo.call(obj) // 2
```

#### <font size=5 color=#83d0f2 > Hard Binding - 硬绑定 </font>

如下图所示,在定义 bar 的手动调用了 foo.call(obj) 显示绑定 foo 的 this 为 obj,不管 bar 函数如何调用,foo 的 this 始终如一,故该方式称之为硬绑定  
es6 中内置了硬绑定 Function.prototype.bind

```javascript
function foo() {
  console.log(this.a)
}

var obj = {
  a: 2
}

var bar = function() {
  foo.call(obj)
}

bar() // 2
setTimeout(bar, 100) // 2

// `bar` hard binds `foo`'s `this` to `obj`
// so that it cannot be overriden
bar.call(window) // 2
```

硬绑定的实现

```javascript
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError(
        'Function.prototype.bind - what ' +
          'is trying to be bound is not callable'
      )
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function() {},
      fBound = function() {
        // 提示是 function 的实例 且 oThis存在就返回修改 this 为 oThis的函数调用结果,反之返回函数的调用结果
        return fToBind.apply(
          this instanceof fNOP && oThis ? this : oThis,
          aArgs.concat(Array.prototype.slice.call(arguments))
        )
      }
    // 保存原函数的 prototype
    fNOP.prototype = this.prototype
    // 重新设置原型链
    fBound.prototype = new fNOP()
    return fBound
  }
}
```

### <font size=5 color=#83d0f2 > new Binding - new 绑定 </font>

new 的时候做了如下四件事情:

> 1.凭空创建了一个全新的对象  
> 2.新对象与对象的原型链链接  
> 3.新对象与该函数调用时的 this 绑定  
> 4.除非函数 return 一个对象,否则将返回上面新创建的对象

```javascript
function foo(a) {
  this.a = a
}

var bar = new foo(2)
console.log(bar.a) // 2
```

### <font size=6 color=#83d0f2 > 优先级 </font>

下方代码显示: 显式绑定 > 隐式绑定

```javascript
function foo() {
  console.log(this.a)
}

var obj1 = {
  a: 2,
  foo: foo
}

var obj2 = {
  a: 3,
  foo: foo
}

obj1.foo() // 2
obj2.foo() // 3

obj1.foo.call(obj2) // 3
obj2.foo.call(obj1) // 2
```

下方代码显示:new 绑定 > 隐式绑定  
需要注意的是无法比较 new 绑定和显式绑定的优先级,原因是 new foo.call(obj1) 语法不被允许

```javascript
function foo(something) {
  this.a = something
}

var obj1 = {
  foo: foo
}

var obj2 = {}

obj1.foo(2)
console.log(obj1.a) // 2

obj1.foo.call(obj2, 3)
console.log(obj2.a) // 3

var bar = new obj1.foo(4)
console.log(obj1.a) // 2
console.log(bar.a) // 4
```

虽然不能比较 new 绑定和显式绑定的优先级,但可以比较硬绑定与 new 绑定的优先级,如下方代码所示  
foo.bind 硬绑定之后,obj1.a 值已经是 2 了,new bar(3) new 绑定,并没有改变 obj1.a 的值,而是返回了一个新对象 baz,且 baz.a 是 3

```javascript
function foo(something) {
  this.a = something
}

var obj1 = {}

var bar = foo.bind(obj1)
bar(2)
console.log(obj1.a) // 2

var baz = new bar(3)
console.log(obj1.a) // 2
console.log(baz.a) // 3
```

new 创建了一个函数可以可以忽略 this 的硬绑定,但是硬绑定的其他参数将被当设置为新函数的预置参数,如下方代码

```javascript
function foo(p1, p2) {
  this.val = p1 + p2
}

// using `null` here because we don't care about
// the `this` hard-binding in this scenario, and
// it will be overridden by the `new` call anyway!
var bar = foo.bind(null, 'p1')

var baz = new bar('p2')

baz.val // p1p2
```

总结优先级:  
 new 绑定 > 显式绑定(硬绑定) > 隐式绑定 > 默认绑定

## <font size=6 color=#83d0f2 > 补充: </font>

### <font size=6 color=#83d0f2 > 软绑定的实现 </font>

软绑定:this 可以被手动绑定成别的,通过显式绑定,隐式绑定修改,若不修改则保持原状

```javascript
if (!Function.prototype.softBind) {
  Function.prototype.softBind = function(obj) {
    var fn = this,
      curried = [].slice.call(arguments, 1),
      bound = function bound() {
        return fn.apply(
          // this 不存在或 this 等于 window 或 this 等于 global 则 obj 反之 this
          !this ||
            (typeof window !== 'undefined' && this === window) ||
            (typeof global !== 'undefined' && this === global)
            ? obj
            : this,
          // 传参
          curried.concat.apply(curried, arguments)
        )
      }
    bound.prototype = Object.create(fn.prototype)
    return bound
  }
}
```

### <font size=6 color=#83d0f2 > arrow function - 箭头函数 </font>

箭头函数的 this 将绑定封闭的作用域(函数或全局)

```javascript
function foo() {
  // return an arrow function
  return a => {
    // `this` here is lexically adopted from `foo()`
    console.log(this.a)
  }
}

var obj1 = {
  a: 2
}

var obj2 = {
  a: 3
}

var bar = foo.call(obj1)
bar.call(obj2) // 2, not 3!
```
