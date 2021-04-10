/*
 * @Author: Kaiser
 * @Date: 2020-03-31 18:01:50
 * @Last Modified by: Kaiser
 * @Last Modified time: 2020-04-01 12:39:00
 * @Description:
 */

// 直接测试定时器
// test('setTimeout', done => {
//   setTimeout(() => {
//     expect(1).toBe(1);
//     done();
//   }, 2000);
// });

function timeout(callback) {
  setTimeout(() => {
    callback();
  }, 5000);
}

// 测试函数中的定时器
test('setTimeout - function', done => {
  timeout(() => {
    expect(1).toBe(1);
    // 必须调用done方法
    done();
  });
  // 模式定时器快进十秒钟
  jest.advanceTimersByTime(6000);
});
