/*
 * @Author: Kaiser
 * @Date: 2020-04-09 17:21:07
 * @Last Modified by: Kaiser
 * @Last Modified time: 2020-04-09 17:33:50
 * @Description: 在浏览器环境下运行
 */
function Foo() {
  this.getName = function () {
    console.log(3);
    return {
      getName: getName,
    };
  };
  getName = function () {
    console.log(1);
  };
  return this;
}

Foo.getName = function () {
  console.log(2);
};
Foo.prototype.getName = function () {
  console.log(6);
};
var getName = function () {
  console.log(4);
};

function getName() {
  console.log(5);
}
Foo.getName(); // 2
getName(); // 4
// console.log(Foo()); // window
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3
new Foo().getName().getName(); // 3 1
new new Foo().getName(); // 3
