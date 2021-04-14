<!--
 * @Author: Kaiser
 * @Date: 2020-02-14 10:27:13
 * @Last Modified by: Kaiser
 * @Last Modified time: 2021-04-12 21:55:30
 * @Description: BFC
 -->
# BFC - Block formatting context

## 特性
**BFC** 是页面中的一块渲染区域，它属于普通文档流，具有BFC特性的元素将被视为隔离了的容器，元素里面的元素将不会影响外面的布局

## 触发条件
如下情况将触发BFC特性：
* 文档的根元素（html标签）
* 浮动元素（float，除none之外）
* 绝对定位的元素（position：absolute || fixed）
* display 为非 inline-block、table-cells、table-caption、flex
