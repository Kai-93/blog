function A() {}
A.prototype.add = function() {
  var args = Array.prototype.slice.call(arguments)
  var count = 0
  args.forEach(function(number) {
    count += number
  })
  return count
}

var a = new A()

console.log('a.__proto__ === A.prototype: ', a.__proto__ === A.prototype)
console.log(
  'A.__proto__ === Function.prototype: ',
  A.__proto__ === Function.prototype
)
console.log(
  'Function.__proto__ === Function.prototype: ',
  Function.__proto__ === Function.prototype
)
console.log(
  'Function.__proto__.__proto__ === Object.prototype: ',
  Function.__proto__.__proto__ === Object.prototype
)
console.log(
  'Object.__proto__ === Function.prototype: ',
  Object.__proto__ === Function.prototype
)

console.log(
  'Object.__proto__.__proto__ === Object.prototype: ',
  Object.__proto__.__proto__ === Object.prototype
)

console.log(
  'Object.__proto__.__proto__.__proto__ === null: ',
  Object.__proto__.__proto__.__proto__ === null
)
