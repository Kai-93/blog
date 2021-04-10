/*
 * @Author: Kaiser
 * @Date: 2020-04-06 20:28:41
 * @Last Modified by: Kaiser
 * @Last Modified time: 2020-04-06 20:29:22
 * @Description:
 */

var a = {
  a: 1
};

var b = [a];
console.log(b.find(el => el.a === 1) === a);
