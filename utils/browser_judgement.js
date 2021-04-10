/*
 * @Author: Kaiser
 * @Date: 2020-03-25 11:46:41
 * @Last Modified by: Kaiser
 * @Last Modified time: 2020-03-25 21:00:13
 * @Description: 浏览器的判断
 */
var userAgent = navigator.userAgent.toLocaleLowerCase();

/**
 * 是否是chrome浏览器
 */
export const isChrome = /chrome/.test(userAgent);
/**
 * 360浏览器
 */
export const is360 = /(qihu)|(360)/.test(navigator.userAgent.toLocaleLowerCase());
/**
 * 是否是360兼容模式
 */
export const is360Com = /compatible/.test(navigator.userAgent.toLocaleLowerCase());
