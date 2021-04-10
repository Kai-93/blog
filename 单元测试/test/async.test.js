/*
 * @Author: Kaiser
 * @Date: 2020-04-01 13:50:03
 * @Last Modified by: Kaiser
 * @Last Modified time: 2020-04-01 14:52:11
 * @Description:
 */
// fix ReferenceError: regeneratorRuntime is not defined
import 'regenerator-runtime/runtime';

function fetchData() {
  return new Promise(resolve => {
    resolve('peanut butter');
  });
}

test('async demo', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter1');
});
