/*
 * @Author: Kaiser
 * @Date: 2019-11-28 23:04:40
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-11-29 09:20:11
 * @Description:
 */

const utils = require("../../utils/utils.js");

function Parent() {
  this.name = "parent";
}
Parent.prototype.say = function() {
  console.log(`Hello ${this.name}`);
};

function Child() {
  Parent.call(this);
  this.type = "child";
}

var child = new Child();

console.log("var child = new Child(), child:\n", child);
utils.drawDividingLine();
console.log("child.constructor: \n", child.constructor);
utils.drawDividingLine();
console.log(
  "child.__proto__ === Child: \n",
  child.__proto__ === Child.prototype
);
utils.drawDividingLine();
console.log("child.say(): \n", child.say());
