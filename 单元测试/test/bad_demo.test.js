/*
 * @Author: Kaiser
 * @Date: 2020-04-01 12:42:31
 * @Last Modified by: Kaiser
 * @Last Modified time: 2020-04-01 13:45:22
 * @Description: 这是错误的异步测试示范
 */

function fetchData(callback) {
  setTimeout(() => {
    callback('peanut butter');
  }, 100);
}

test('bad demo', done => {
  function callback(data) {
    expect(data).toBe('peanut butter');
    done();
  }
  fetchData(callback);
  // 因为使用了fake timer,故需要模拟定时器快进十秒钟
  jest.advanceTimersByTime(6000);
});
