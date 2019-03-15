# 20190317

## [Node assert](http://nodejs.cn/api/assert.html#assert_assert)

assert(断言)是什么?  
通俗来讲,是判断真实运行的结果与假设是否一致

node 的 assert 模块提供了一组简单的断言测试，可用于测试不变量。  
[关于相等性的比较信息参见此处](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)

## [mocha](https://mochajs.org/)

mocha 是一个功能丰富的可以运行在 node 和浏览器环境的 javascript 测试框架

### mocha.opts

该文件可设置 mocha 命令行的默认参数  
若不通过下方命令设置,mocha 将默认参数文件在 test/mocha.opts

```
--opts <path>
```

使用下方命令,可忽略 mocha.opts 中的设置

```
--no-opts
```

#### mocha 参数优先级

> - 1.命令行中的参数
> - 2.配置文件中的参数 (.mocharc.js, .mocharc.yml, etc.)
> - 3.package.json 中配置的参数
> - 4.mocha.opts 中配置的参数

## should

should 是一个强表达力,抢阅读力,与框架无关的断言库,它将使你的测试代码整洁,使你的错误信息更有效
