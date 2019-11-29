/*
 * @Author: Kaiser
 * @Date: 2019-11-28 22:57:39
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-11-28 23:04:47
 * @Description:
 */
for (var i = 0; i < 5; i++) {
  (function(j) {
    setTimeout(() => {
      console.log(j);
    }, 10);
  })(i);
}
