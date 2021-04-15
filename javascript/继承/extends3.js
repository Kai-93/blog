/*
 * @Author: Kaiser
 * @Date: 2019-11-28 23:04:40
 * @Last Modified by: Kaiser
 * @Last Modified time: 2021-04-15 15:16:52
 * @Description:
 */

const { check } = require('./check');
function Parent(name) {
  this.name = name;
  this.type = 'parent';
}
Parent.prototype.say = function () {
  console.log(`Hello ${this.name}`);
};

function Child(name) {
  // 将parent函数中的方法挂载到this上
  Parent.call(this, name);
  this.type = 'child';
}

// 通过原型链找到方法和属性
Child.prototype = Parent.prototype;
Child.prototype.constructor = Child;

var child = new Child('Kaiser');

check(child, Child);
