/*
 * @Author: Kaiser
 * @Date: 2020-03-26 10:59:40
 * @Last Modified by: Kaiser
 * @Last Modified time: 2020-04-28 20:21:33
 * @Description: 入口
 */

require('./css/common.css');

[(1, 2, 3)].map((n) => alert(n + 1));

Promise.resolve(1).finally(() => {
  alert('finally');
});

export default {};
