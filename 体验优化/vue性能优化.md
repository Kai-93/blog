<!--
 * @Author: Kaiser
 * @Date: 2019-12-06 12:01:05
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-12-09 12:14:36
 * @Description: 
 -->
# vue性能优化

## 生产环境的部署
[**官方解释**](https://cn.vuejs.org/v2/guide/deployment.html)

### 生产环境

Vue 源码会根据 **process.env.NODE_ENV** 决定是都启用 生产环境模式 ,默认是 开发环境模式 ,借助构建工具 (Webpack) 以开启 生产环境模式 ,在构建过程中警告语句将被去除.

### 模板预编译

模板一般会在运行时被编译成渲染函数,通常经常这个过程很快,若想要加快这个速度,可以在构建代码时就将模板编译成渲染函数,在 webpack 中可是使用 [**vue-template-loader**](https://github.com/ktsn/vue-template-loader).

### 提取组件的CSS

当使用单文件组件时,组件内的 CSS 会以 <style\> 标签的方式通过 JavaScript 动态注入.这有一些小小的运行时开销,将所有组件的 CSS 提取到同一个文件可以避免这个问题,也会让 CSS 更好地进行压缩和缓存.

### 跟踪运行时错误

在组件渲染时出现运行错误,错误将会被传递至全局 [**Vue.config.errorHandler**](https://cn.vuejs.org/v2/api/#errorHandler) 配置函数,可利用该方法来追踪错误

### 利用 Object.freeze() 提升性能

冻结了之后,将变量赋予data属性,vue将不会为其增加监听器.
