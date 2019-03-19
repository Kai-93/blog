# <font size=7>[javascript 中的 this 机制](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)</font>

this:当前正在执行代码的 javascript 上下文对象

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

## <font size=6> Function context - 函数上下文 </font>

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
