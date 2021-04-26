/*
 * @Author: Kaiser
 * @Date: 2021-04-20 19:40:55
 * @Last Modified by: Kaiser
 * @Last Modified time: 2021-04-20 19:40:56
 * @Description:
 */
function test() {
  console.log('start');
  setTimeout(() => {
    console.log('children2');
    Promise.resolve().then(() => {
      console.log('children2-1');
    });
  }, 0);
  setTimeout(() => {
    console.log('children3');
    Promise.resolve().then(() => {
      console.log('children3-1');
    });
  }, 0);
  Promise.resolve().then(() => {
    console.log('children1');
  });
  console.log('end');
}

test();
