/*
 * @Author: Kaiser
 * @Date: 2021-04-10 17:54:49
 * @Last Modified by: Kaiser
 * @Last Modified time: 2021-04-10 21:58:25
 * @Description: 测试发起简单,复杂请求时后端的接收情况
 */

const http = require('http');

const server = http.createServer((req, res) => {
  const { url } = req;
  console.log(url);
  res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Headers', '*');
  if (url === '/easy') {
    res.write('this is easy');
  }
  if (url === '/hard') {
    res.write('this is hard');
  }
  res.end();
});
server.listen(3000, () => {
  console.log('Server is running at 3000');
});
