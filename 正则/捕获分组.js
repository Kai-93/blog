/*
 * @Author: Kaiser
 * @Date: 2020-01-25 13:45:45
 * @Last Modified by: Kaiser
 * @Last Modified time: 2020-01-26 15:41:26
 * @Description:
 */
// 每一个(***)是一个捕获分组
// 在result中第一个将是正则整体执行的结果
// 后面跟随着各个捕获分组匹配到的结果
const reg = /^(1)(2)/;
// 使用?:之后将不能从result中获取到匹配结果
// const reg = /^(?:1)(2)/;
const result = reg.exec("12");
console.log(result);

// console.log("12".match(/^(?:1)(2)/));
