# [mocha](https://mochajs.org/)

mocha 是一个功能丰富的可以运行在 node 和浏览器环境的 javascript 测试框架

## mocha.opts

该文件可设置 mocha 命令行的默认参数  
若不通过下方命令设置,mocha 将默认参数文件在 test/mocha.opts

```
--opts <path>
```

使用下方命令,可忽略 mocha.opts 中的设置

```
--no-opts
```

### mocha 参数优先级

> - 1.命令行中的参数
> - 2.配置文件中的参数 (.mocharc.js, .mocharc.yml, etc.)
> - 3.package.json 中配置的参数
> - 4.mocha.opts 中配置的参数
