/*
 * @Author: Kaiser
 * @Date: 2020-04-01 12:42:31
 * @Last Modified by: Kaiser
 * @Last Modified time: 2020-04-01 13:47:39
 * @Description: 这是错误的异步测试示范
 */

function fetchData() {
  return new Promise(resolve => {
    resolve('peanut butter');
  });
}

test('promise', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
