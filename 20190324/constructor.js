function A() {}
A.prototype.add = function() {
  var args = Array.prototype.slice.call(arguments)
  var count = 0
  args.forEach(function(number) {
    count += number
  })
  return count
}
console.log(
  'Object.prototype.constructor === Object: ',
  Object.prototype.constructor === Object
)
console.log(
  'Function.prototype.constructor === Function: ',
  Function.prototype.constructor === Function
)
console.log('A.prototype.constructor === A: ', A.prototype.constructor === A)
var a = new A()
console.log('a.constructor === A: ', a.constructor === A)
console.log('a.add: ', a.add(1, 2))
console.log('a.hasOwnProperty("add"): ', a.hasOwnProperty('add'))
console.log(
  'A.prototype.hasOwnProperty("add"): ',
  A.prototype.hasOwnProperty('add')
)
console.log(
  'a.hasOwnProperty("constructor"): ',
  a.hasOwnProperty('constructor')
)
console.log(
  'A.prototype.hasOwnProperty("constructor"): ',
  A.prototype.hasOwnProperty('constructor')
)
