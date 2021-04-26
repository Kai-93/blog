/*
 * @Author: Kaiser
 * @Date: 2019-11-28 23:04:40
 * @Last Modified by: Kaiser
 * @Last Modified time: 2021-04-21 07:01:34
 * @Description:
 */
const { check } = require('./check');

function Parent(name) {
  this.name = name;
  this.type = 'parent';
  this.say = function () {
    console.log(`Hello ${this.name}`);
  };
}

function Child(name) {
  // call时将this以指针传入, Parent调用时修改了this的属性, 即继承了Parent
  Parent.call(this, name);
  this.type = 'child';
}

var child = new Child('Kaiser');

check(child, Child);
