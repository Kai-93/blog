/*
 * @Author: Kaiser
 * @Date: 2020-04-01 11:52:11
 * @Last Modified by: Kaiser
 * @Last Modified time: 2020-04-01 11:52:22
 * @Description: babel配置
 */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            '> 1%' // 市场占有大于1%的浏览器
          ]
        }
      }
    ]
  ]
};
