/*
 * @Author: Kaiser
 * @Date: 2021-04-15 13:08:14
 * @Last Modified by: Kaiser
 * @Last Modified time: 2021-04-15 15:29:15
 * @Description:
 */

function check(child, Child) {
  console.log('child: ', child);
  console.log('child.constructor === Child: ', child.constructor === Child);
  console.log(
    'child.__proto__ === Child.prototype: ',
    child.__proto__ === Child.prototype,
  );
  console.log(`Is child a Child's instance: `, child instanceof Child);
  console.log('child.say(): ');
  child.say();
}

module.exports = {
  check,
};
