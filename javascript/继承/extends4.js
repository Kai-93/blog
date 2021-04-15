/*
 * @Author: Kaiser
 * @Date: 2019-11-28 23:04:40
 * @Last Modified by: Kaiser
 * @Last Modified time: 2021-04-15 13:11:07
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
  Parent.call(this, name);
  this.type = 'child';
}
// 修改原型, 通过原型链来找到属性和方法
Child.prototype = Parent.prototype;
// 修改构造器的指向
Child.prototype.constructor = Child;

var child = new Child('Kaiser');

check(child, Child);
