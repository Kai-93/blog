/*
 * @Author: Kaiser
 * @Date: 2019-11-28 23:04:40
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-11-29 09:29:49
 * @Description:
 */

const utils = require("../../utils/utils.js");

function Parent() {
  this.name = "parent";
  this.arr = [1, 2];
}
Parent.prototype.say = function() {
  console.log(`Hello ${this.name}`);
};

function Child() {
  // Parent.call(this);
  this.type = "child";
}

// Child的实例对象将共享Parent的实例对象
Child.prototype = new Parent();

Child.prototype.constructor = Child;

var child = new Child();
var child2 = new Child();

console.log("var child = new Child(), child:\n", child);
utils.drawDividingLine();
console.log("child.constructor: \n", child.constructor);
utils.drawDividingLine();
console.log(
  "child.__proto__ === Child: \n",
  child.__proto__ === Child.prototype
);
utils.drawDividingLine();
console.log("child.say(): \n");
child.say();

utils.drawDividingLine();

child.arr.push(3);
console.log("child.arr.push(3): \n");
console.log("child.arr === child2.arr: ", child.arr === child2.arr);
console.log(child.arr);
