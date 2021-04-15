/*
 * @Author: Kaiser
 * @Date: 2019-11-28 23:04:40
 * @Last Modified by: Kaiser
 * @Last Modified time: 2021-04-15 13:22:51
 * @Description:
 */

const { check } = require('./check');

function Parent(name) {
  this.name = name;
  this.type = 'parent';
  this.arr = [1, 2];
}

Parent.prototype.say = function () {
  console.log('this: ', this);
  console.log(`Hello ${this.name}`);
};

function Child(name) {
  this.name = name;
  this.type = 'child';
}

// Child的实例对象将共享Parent的实例对象, 其中属性值将共享
Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child = new Child('child');
var child2 = new Child('child2');

check(child, Child);

child.arr.push(3);
console.log('child.arr.push(3): ');
console.log('child.arr === child2.arr: ', child.arr === child2.arr);
console.log(child.arr);
