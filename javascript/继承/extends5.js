/*
 * @Author: Kaiser
 * @Date: 2019-11-28 23:04:40
 * @Last Modified by: Kaiser
 * @Last Modified time: 2021-04-15 15:25:23
 * @Description:
 */
const { check } = require('./check');
class Parent {
  constructor(name) {
    this.name = name;
    this.type = 'parent';
  }
  say() {
    console.log(`Hello ${this.name}`);
  }
}
class Child extends Parent {
  constructor(name) {
    super(name);
    this.type = 'child';
  }
}

var child = new Child('Kaiser');

check(child, Child);

