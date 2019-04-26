# <font size=7>[Webpack原理简单讲解](https://webpack.js.org/concepts/)</font>
webpack是JavaScript应用程序的静态模块打包器,webpack处理应用程序时,将递归构建一个依赖关系图,依赖图映射了项目中需要的每一个模块,并打包生成一个或多个bundle.

当在命令行运行指令 webpack 的时候,webpack将默认从当前目录下查找 webpack.config.js 文件

webpack的配置(webpack.config.js)中有四个核心概念需要理解:
> - 入口(entry)
> - 输出(output)
> - loader
> - 插件(plugins)

然后再来了解一些webpack打包的基本逻辑

## <font size=6>入口(entry)</font>

entry属性将告诉webpack从哪个模块开始构建依赖图,并计算出所有这个模块直接或间接依赖的模块.

entry为String或Array时,entry输出的Chunk的名称将默认是main  
entry为Object时,webpack将输出多个Chunk,Chunk的名称将会是key

[点击此处查看详细内容](https://webpack.js.org/concepts/entry-points/)

## <font size=6>输出(output)</font>

output属性将告诉webpack最终打包文件的输出路径,以及如何命名打包文件.

```JavaScript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  // ./dist/main.js
  output: {
    // 文件名字可以直接设置
    filename: 'my-first-webpack.bundle.js', 
    // 也可以用过变量设置
    // id - Chunk的唯一标识,从0开始
    // name - Chunk的名称
    // hash - Chunk的唯一标识(即id)的hash值
    // chunkhash - Chunk内容的hash值
    filename: '[id].[name].[hash].[chunkhash].js',
    // 配置输出文件的存放目录
    // __dirname是运行命令行时所在路径
    path: path.resolve(__dirname, 'dist'), 
  }
};
```
[node中的path,点击此处](https://nodejs.org/api/path.html)  
[点击此处查看详细内容](https://webpack.js.org/configuration/output/)

## <font size=6>loader</font>
module属性配置如何处理模块,其中rules配置模块的读取和解析规则,通常用来配置Loader.

未增加自定义配置的情况下,webpack只能处理JavaScript文件和JSON文件,Loader可以使webpack处理其他类型的文件到模块中,添加到依赖图中,被应用程序使用.

> 条件匹配: 通过 test / include / excluede 三个配置来匹配文件,支持string和array

> 应用规则: 匹配命中文件之后,使用use中的配置来应用loader,同时可以按"从后往前"的顺序应用多个loader

> 重置顺序: 一组loader的执行顺序迷人是从右向左执行,通过 enforce 选项可以让其中一个loader的执行顺序放到最后或最前


```JavaScript
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [ // 在rules中可以设置多个规则
      {
        test: /\.txt$/, // 设置用来匹配什么文件需要被转换
        // 只命中src目录里的js文件，加快 Webpack 搜索速度
        include: path.resolve(__dirname, 'src'),
        // 排除 node_modules 目录下的文件
        exclude: path.resolve(__dirname, 'node_modules'),
        // 处理顺序为从后到前，即先交给 sass-loader 处理，再把结果交给 css-loader 最后再给 style-loader。
        use: ['style-loader', 'css-loader', 'sass-loader'],
        // use中同样可以设置Object
        use: [
              {
                loader:'babel-loader',
                options:{
                  cacheDirectory:true,
                },
                // enforce:'post' 的含义是把该 Loader 的执行顺序放到最后
                // enforce 的值还可以是 pre，代表把 Loader 的执行顺序放到最前面
                enforce:'post'
              },
        ]
      }
    ]
  }
};
```
[点击此处查看详细内容](https://webpack.js.org/concepts/loaders/)

## <font size=6>插件(plugins)</font>

loaders用来转换某些类型的模块(文件),plugin 则用来执行,打包优化,资源管理和插入环境变量,等各种任务

plugin 是用来扩展 Webpack 功能的，通过在构建流程里注入钩子实现，它给 webpack 带来了很大的灵活性。

通过require方法引入插件,并将其实例化的对象加入plugins中

```JavaScript
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```
上方例子, html-webpack-plugin 插件会给应用生成一个HTML文件,并在文件中插入打包好的文件.

> tip: 使用 Plugin 的难点在于掌握 Plugin 本身提供的配置项，而不是如何在 Webpack 中接入 Plugin。

[点击此处查看详细内容](https://webpack.js.org/concepts/plugins/)

## <font size=6>webpack打包的基本逻辑</font>

> 1. 初始化参数

从配置文件和Shell语句中读取并合并参数,得出最终的参数

> 2. 开始编译

用第一步得到的参数初始化Compiler对象,加载所有配置的插件,执行对象中的run方法开始执行编译

> 3. 确认入口

根据配置中的entry找出所有的入口文件

> 4. 编译模块

从入口文件出发,调用所有配置的loader对模块进行翻译,再找出该模块依赖的模块,递归查找所有的模块依赖

> 5. 完成模块编译 

经过第四部使用loader对所有模块进行翻译后,得到每个模块被翻译后的最终内容以及他们之间的依赖关系

> 6. 输出资源

根据入口和模块之间的依赖关系,组装成一个个包含多个模块的Chunk,再把每个chunk转换成一个单独的文件并加入到输出列表中

> 7. 输出完成

确认好输出内容后,根据配置确认输出的路径和文件名,把文件内容写入到文件系统中

> tip: 上述过程中,webpack会在特定时间广播出特定时间,插件接受到想要的事件广播之后便会执行特性的逻辑,并且插件可以调用webpack提供的API改变webpack的运行结果

## <font size=6>输出文件分析</font>

> webpack配置文件

```JavaScript
const path = require('path')
// Since webpack 4 the "extract-text-webpack-plugin" should not be used for css.
// Use "mini-css-extract-plugin" instead
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')

// 这个在 npm run dev 和 npm run build 时候是不同的
const TARGET = process.env.npm_lifecycle_event
const APP_PATH = path.join(__dirname, '/src')
const dist = path.resolve(__dirname, 'dist')
const common = {
  entry: `${APP_PATH}/index.js`,
  output: {
    path: dist,
    filename: 'index.js'
  }
}

let other = {}

if (TARGET === 'dev') {
  other = {
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.css$/,
          // TODO 理解loader的执行顺序
          use: [
            'style-loader', // Adds CSS to the DOM by injecting a <style> tag
            'css-loader'
          ]
        }
      ]
    },
    plugins: [new HtmlWebpackPlugin({ template: `${APP_PATH}/index.html` })]
  }
}

if (TARGET === 'build') {
  console.log('就是这里')
  other = {
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader, // 提取额外的css文件
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: `${APP_PATH}/index.html` }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    ]
  }
}

module.exports = merge(common, other)

```

> index.html
> 
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Webpack</title>
  </head>
  <body></body>
</html>

```

> index.js

```JavaScript
require('./style.css')
require('./moduleA.js')
const b = require('./moduleB.js')
setTimeout(() => {
  console.log('new b is running')
  b()
}, 1000)

```

> moduleA.js

```JavaScript
var newDiv = document.createElement('div') 
var newContent = document.createTextNode("Hi there! I'm module A!")
newDiv.appendChild(newContent)
document.body.appendChild(newDiv)
```

> moduleB.js

```JavaScript
module.exports = function() {
  var newDiv = document.createElement('div')
  var newContent = document.createTextNode("Hi there! I'm module B!")
  newDiv.appendChild(newContent)
  document.body.appendChild(newDiv)
}

```

> style.css

```css
body {
    background: pink;
}
```

> 打包之后的文件

```JavaScript
// webpack.config.js
// entry的参数是String
module.exports = {
  entry: './src/index.js'  // 这是默认值,当然可以自定义
}

// entry的参数是Array
module.exports = {
  entry: ['./app/entry1', './app/entry2']  
}

// entry的参数是Object
module.exports = {
  entry: { 
    a: './app/entry-a', 
    b: ['./app/entry-b1', './app/entry-b2']
    }  
}

// entry的参数可以同步函数
module.exports = {
  entry: () => {
    return {
      a:'./pages/a',
      b:'./pages/b',
    }
  }
}

// entry的参数可以异步函数
module.exports = {
  entry: () => {
    return new Promise((resolve)=>{
      resolve({
        a:'./pages/a',
        b:'./pages/b',
      });
    });
  }
}
```

```javascript
;(function(modules) {
  // webpackBootstrap
  // The module cache
  var installedModules = {}

  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    // 判断需要 require 的函数是否已经在缓存中了
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports
    }
    // Create a new module (and put it into the cache)
    // 初始化需要require的module,并保存到缓存中
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    })

    // Execute the module function
    // 立即执行函数的参数 + moduleId 定位到当前需要执行的函数
    // 这里将执行webpack打包之后的函数
    // 传入module.exports  module 以及 require函数
    // 然后将执行模块的内在逻辑,递归处理依赖, 并将模块的输出保存
    debugger
    // debugger2 - 模块执行
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    )

    // Flag the module as loaded
    // 标志当前模块已加载
    module.l = true

    // Return the exports of the module
    // 返回模块的输出
    return module.exports
  }
  //  ----- 对主逻辑不重要的代码 - start -----
  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules

  // expose the module cache
  __webpack_require__.c = installedModules

  // define getter function for harmony exports
  __webpack_require__.d = function(exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter })
    }
  }

  // define __esModule on exports
  __webpack_require__.r = function(exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
    }
    Object.defineProperty(exports, '__esModule', { value: true })
  }

  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  __webpack_require__.t = function(value, mode) {
    if (mode & 1) value = __webpack_require__(value)
    if (mode & 8) return value
    if (mode & 4 && typeof value === 'object' && value && value.__esModule)
      return value
    var ns = Object.create(null)
    __webpack_require__.r(ns)
    Object.defineProperty(ns, 'default', { enumerable: true, value: value })
    if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function(key) {
            return value[key]
          }.bind(null, key)
        )
    return ns
  }

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function(module) {
    var getter =
      module && module.__esModule
        ? function getDefault() {
            return module['default']
          }
        : function getModuleExports() {
            return module
          }
    __webpack_require__.d(getter, 'a', getter)
    return getter
  }

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property)
  }

  // __webpack_public_path__
  __webpack_require__.p = ''
  //  ----- 对主逻辑不重要的代码 - ending -----
  // Load entry module and return exports
  debugger
  //  debugger1 - 逻辑从这里开始 
  // __webpack_require__ 即 require 函数
  // 并设置了入口函数的key, moduleId = './src/index.js'
  return __webpack_require__((__webpack_require__.s = './src/index.js'))
})({
  './node_modules/css-loader/dist/cjs.js!./src/style.css': function(
    module,
    exports,
    __webpack_require__
  ) {
    eval(
      'exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);\n// Module\nexports.push([module.i, "body {\\n    background: pink;\\n}", ""]);\n\n\n\n//# sourceURL=webpack:///./src/style.css?./node_modules/css-loader/dist/cjs.js'
    )
  },
  './node_modules/css-loader/dist/runtime/api.js': function(
    module,
    exports,
    __webpack_require__
  ) {
    'use strict'
    eval(
      "\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return '@media ' + item[2] + '{' + content + '}';\n      } else {\n        return content;\n      }\n    }).join('');\n  }; // import a list of modules into the list\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === 'string') {\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      var id = this[i][0];\n\n      if (id != null) {\n        alreadyImportedModules[id] = true;\n      }\n    }\n\n    for (i = 0; i < modules.length; i++) {\n      var item = modules[i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      // when a module is imported multiple times with different media queries.\n      // I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (item[0] == null || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || '';\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n  return '/*# ' + data + ' */';\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/dist/runtime/api.js?"
    )
  },

  './node_modules/style-loader/lib/addStyles.js': function(
    module,
    exports,
    __webpack_require__
  ) {
    eval(
      '/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\nvar stylesInDom = {};\n\nvar\tmemoize = function (fn) {\n\tvar memo;\n\n\treturn function () {\n\t\tif (typeof memo === "undefined") memo = fn.apply(this, arguments);\n\t\treturn memo;\n\t};\n};\n\nvar isOldIE = memoize(function () {\n\t// Test for IE <= 9 as proposed by Browserhacks\n\t// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n\t// Tests for existence of standard globals is to allow style-loader\n\t// to operate correctly into non-standard environments\n\t// @see https://github.com/webpack-contrib/style-loader/issues/177\n\treturn window && document && document.all && !window.atob;\n});\n\nvar getTarget = function (target, parent) {\n  if (parent){\n    return parent.querySelector(target);\n  }\n  return document.querySelector(target);\n};\n\nvar getElement = (function (fn) {\n\tvar memo = {};\n\n\treturn function(target, parent) {\n                // If passing function in options, then use it for resolve "head" element.\n                // Useful for Shadow Root style i.e\n                // {\n                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }\n                // }\n                if (typeof target === \'function\') {\n                        return target();\n                }\n                if (typeof memo[target] === "undefined") {\n\t\t\tvar styleTarget = getTarget.call(this, target, parent);\n\t\t\t// Special case to return head of iframe instead of iframe itself\n\t\t\tif (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n\t\t\t\ttry {\n\t\t\t\t\t// This will throw an exception if access to iframe is blocked\n\t\t\t\t\t// due to cross-origin restrictions\n\t\t\t\t\tstyleTarget = styleTarget.contentDocument.head;\n\t\t\t\t} catch(e) {\n\t\t\t\t\tstyleTarget = null;\n\t\t\t\t}\n\t\t\t}\n\t\t\tmemo[target] = styleTarget;\n\t\t}\n\t\treturn memo[target]\n\t};\n})();\n\nvar singleton = null;\nvar\tsingletonCounter = 0;\nvar\tstylesInsertedAtTop = [];\n\nvar\tfixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");\n\nmodule.exports = function(list, options) {\n\tif (typeof DEBUG !== "undefined" && DEBUG) {\n\t\tif (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");\n\t}\n\n\toptions = options || {};\n\n\toptions.attrs = typeof options.attrs === "object" ? options.attrs : {};\n\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n\t// tags it will allow on a page\n\tif (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();\n\n\t// By default, add <style> tags to the <head> element\n        if (!options.insertInto) options.insertInto = "head";\n\n\t// By default, add <style> tags to the bottom of the target\n\tif (!options.insertAt) options.insertAt = "bottom";\n\n\tvar styles = listToStyles(list, options);\n\n\taddStylesToDom(styles, options);\n\n\treturn function update (newList) {\n\t\tvar mayRemove = [];\n\n\t\tfor (var i = 0; i < styles.length; i++) {\n\t\t\tvar item = styles[i];\n\t\t\tvar domStyle = stylesInDom[item.id];\n\n\t\t\tdomStyle.refs--;\n\t\t\tmayRemove.push(domStyle);\n\t\t}\n\n\t\tif(newList) {\n\t\t\tvar newStyles = listToStyles(newList, options);\n\t\t\taddStylesToDom(newStyles, options);\n\t\t}\n\n\t\tfor (var i = 0; i < mayRemove.length; i++) {\n\t\t\tvar domStyle = mayRemove[i];\n\n\t\t\tif(domStyle.refs === 0) {\n\t\t\t\tfor (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();\n\n\t\t\t\tdelete stylesInDom[domStyle.id];\n\t\t\t}\n\t\t}\n\t};\n};\n\nfunction addStylesToDom (styles, options) {\n\tfor (var i = 0; i < styles.length; i++) {\n\t\tvar item = styles[i];\n\t\tvar domStyle = stylesInDom[item.id];\n\n\t\tif(domStyle) {\n\t\t\tdomStyle.refs++;\n\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\n\t\t\t}\n\n\t\t\tfor(; j < item.parts.length; j++) {\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\t\t} else {\n\t\t\tvar parts = [];\n\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\n\t\t}\n\t}\n}\n\nfunction listToStyles (list, options) {\n\tvar styles = [];\n\tvar newStyles = {};\n\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar item = list[i];\n\t\tvar id = options.base ? item[0] + options.base : item[0];\n\t\tvar css = item[1];\n\t\tvar media = item[2];\n\t\tvar sourceMap = item[3];\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\n\n\t\tif(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});\n\t\telse newStyles[id].parts.push(part);\n\t}\n\n\treturn styles;\n}\n\nfunction insertStyleElement (options, style) {\n\tvar target = getElement(options.insertInto)\n\n\tif (!target) {\n\t\tthrow new Error("Couldn\'t find a style target. This probably means that the value for the \'insertInto\' parameter is invalid.");\n\t}\n\n\tvar lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];\n\n\tif (options.insertAt === "top") {\n\t\tif (!lastStyleElementInsertedAtTop) {\n\t\t\ttarget.insertBefore(style, target.firstChild);\n\t\t} else if (lastStyleElementInsertedAtTop.nextSibling) {\n\t\t\ttarget.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);\n\t\t} else {\n\t\t\ttarget.appendChild(style);\n\t\t}\n\t\tstylesInsertedAtTop.push(style);\n\t} else if (options.insertAt === "bottom") {\n\t\ttarget.appendChild(style);\n\t} else if (typeof options.insertAt === "object" && options.insertAt.before) {\n\t\tvar nextSibling = getElement(options.insertAt.before, target);\n\t\ttarget.insertBefore(style, nextSibling);\n\t} else {\n\t\tthrow new Error("[Style Loader]\\n\\n Invalid value for parameter \'insertAt\' (\'options.insertAt\') found.\\n Must be \'top\', \'bottom\', or Object.\\n (https://github.com/webpack-contrib/style-loader#insertat)\\n");\n\t}\n}\n\nfunction removeStyleElement (style) {\n\tif (style.parentNode === null) return false;\n\tstyle.parentNode.removeChild(style);\n\n\tvar idx = stylesInsertedAtTop.indexOf(style);\n\tif(idx >= 0) {\n\t\tstylesInsertedAtTop.splice(idx, 1);\n\t}\n}\n\nfunction createStyleElement (options) {\n\tvar style = document.createElement("style");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = "text/css";\n\t}\n\n\tif(options.attrs.nonce === undefined) {\n\t\tvar nonce = getNonce();\n\t\tif (nonce) {\n\t\t\toptions.attrs.nonce = nonce;\n\t\t}\n\t}\n\n\taddAttrs(style, options.attrs);\n\tinsertStyleElement(options, style);\n\n\treturn style;\n}\n\nfunction createLinkElement (options) {\n\tvar link = document.createElement("link");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = "text/css";\n\t}\n\toptions.attrs.rel = "stylesheet";\n\n\taddAttrs(link, options.attrs);\n\tinsertStyleElement(options, link);\n\n\treturn link;\n}\n\nfunction addAttrs (el, attrs) {\n\tObject.keys(attrs).forEach(function (key) {\n\t\tel.setAttribute(key, attrs[key]);\n\t});\n}\n\nfunction getNonce() {\n\tif (false) {}\n\n\treturn __webpack_require__.nc;\n}\n\nfunction addStyle (obj, options) {\n\tvar style, update, remove, result;\n\n\t// If a transform function was defined, run it on the css\n\tif (options.transform && obj.css) {\n\t    result = typeof options.transform === \'function\'\n\t\t ? options.transform(obj.css) \n\t\t : options.transform.default(obj.css);\n\n\t    if (result) {\n\t    \t// If transform returns a value, use that instead of the original css.\n\t    \t// This allows running runtime transformations on the css.\n\t    \tobj.css = result;\n\t    } else {\n\t    \t// If the transform function returns a falsy value, don\'t add this css.\n\t    \t// This allows conditional loading of css\n\t    \treturn function() {\n\t    \t\t// noop\n\t    \t};\n\t    }\n\t}\n\n\tif (options.singleton) {\n\t\tvar styleIndex = singletonCounter++;\n\n\t\tstyle = singleton || (singleton = createStyleElement(options));\n\n\t\tupdate = applyToSingletonTag.bind(null, style, styleIndex, false);\n\t\tremove = applyToSingletonTag.bind(null, style, styleIndex, true);\n\n\t} else if (\n\t\tobj.sourceMap &&\n\t\ttypeof URL === "function" &&\n\t\ttypeof URL.createObjectURL === "function" &&\n\t\ttypeof URL.revokeObjectURL === "function" &&\n\t\ttypeof Blob === "function" &&\n\t\ttypeof btoa === "function"\n\t) {\n\t\tstyle = createLinkElement(options);\n\t\tupdate = updateLink.bind(null, style, options);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\n\t\t\tif(style.href) URL.revokeObjectURL(style.href);\n\t\t};\n\t} else {\n\t\tstyle = createStyleElement(options);\n\t\tupdate = applyToTag.bind(null, style);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\t\t};\n\t}\n\n\tupdate(obj);\n\n\treturn function updateStyle (newObj) {\n\t\tif (newObj) {\n\t\t\tif (\n\t\t\t\tnewObj.css === obj.css &&\n\t\t\t\tnewObj.media === obj.media &&\n\t\t\t\tnewObj.sourceMap === obj.sourceMap\n\t\t\t) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tupdate(obj = newObj);\n\t\t} else {\n\t\t\tremove();\n\t\t}\n\t};\n}\n\nvar replaceText = (function () {\n\tvar textStore = [];\n\n\treturn function (index, replacement) {\n\t\ttextStore[index] = replacement;\n\n\t\treturn textStore.filter(Boolean).join(\'\\n\');\n\t};\n})();\n\nfunction applyToSingletonTag (style, index, remove, obj) {\n\tvar css = remove ? "" : obj.css;\n\n\tif (style.styleSheet) {\n\t\tstyle.styleSheet.cssText = replaceText(index, css);\n\t} else {\n\t\tvar cssNode = document.createTextNode(css);\n\t\tvar childNodes = style.childNodes;\n\n\t\tif (childNodes[index]) style.removeChild(childNodes[index]);\n\n\t\tif (childNodes.length) {\n\t\t\tstyle.insertBefore(cssNode, childNodes[index]);\n\t\t} else {\n\t\t\tstyle.appendChild(cssNode);\n\t\t}\n\t}\n}\n\nfunction applyToTag (style, obj) {\n\tvar css = obj.css;\n\tvar media = obj.media;\n\n\tif(media) {\n\t\tstyle.setAttribute("media", media)\n\t}\n\n\tif(style.styleSheet) {\n\t\tstyle.styleSheet.cssText = css;\n\t} else {\n\t\twhile(style.firstChild) {\n\t\t\tstyle.removeChild(style.firstChild);\n\t\t}\n\n\t\tstyle.appendChild(document.createTextNode(css));\n\t}\n}\n\nfunction updateLink (link, options, obj) {\n\tvar css = obj.css;\n\tvar sourceMap = obj.sourceMap;\n\n\t/*\n\t\tIf convertToAbsoluteUrls isn\'t defined, but sourcemaps are enabled\n\t\tand there is no publicPath defined then lets turn convertToAbsoluteUrls\n\t\ton by default.  Otherwise default to the convertToAbsoluteUrls option\n\t\tdirectly\n\t*/\n\tvar autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;\n\n\tif (options.convertToAbsoluteUrls || autoFixUrls) {\n\t\tcss = fixUrls(css);\n\t}\n\n\tif (sourceMap) {\n\t\t// http://stackoverflow.com/a/26603875\n\t\tcss += "\\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";\n\t}\n\n\tvar blob = new Blob([css], { type: "text/css" });\n\n\tvar oldSrc = link.href;\n\n\tlink.href = URL.createObjectURL(blob);\n\n\tif(oldSrc) URL.revokeObjectURL(oldSrc);\n}\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/addStyles.js?'
    )
  },

  './node_modules/style-loader/lib/urls.js': function(module, exports) {
    eval(
      '\n/**\n * When source maps are enabled, `style-loader` uses a link element with a data-uri to\n * embed the css on the page. This breaks all relative urls because now they are relative to a\n * bundle instead of the current page.\n *\n * One solution is to only use full urls, but that may be impossible.\n *\n * Instead, this function "fixes" the relative urls to be absolute according to the current page location.\n *\n * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.\n *\n */\n\nmodule.exports = function (css) {\n  // get current location\n  var location = typeof window !== "undefined" && window.location;\n\n  if (!location) {\n    throw new Error("fixUrls requires window.location");\n  }\n\n\t// blank or null?\n\tif (!css || typeof css !== "string") {\n\t  return css;\n  }\n\n  var baseUrl = location.protocol + "//" + location.host;\n  var currentDir = baseUrl + location.pathname.replace(/\\/[^\\/]*$/, "/");\n\n\t// convert each url(...)\n\t/*\n\tThis regular expression is just a way to recursively match brackets within\n\ta string.\n\n\t /url\\s*\\(  = Match on the word "url" with any whitespace after it and then a parens\n\t   (  = Start a capturing group\n\t     (?:  = Start a non-capturing group\n\t         [^)(]  = Match anything that isn\'t a parentheses\n\t         |  = OR\n\t         \\(  = Match a start parentheses\n\t             (?:  = Start another non-capturing groups\n\t                 [^)(]+  = Match anything that isn\'t a parentheses\n\t                 |  = OR\n\t                 \\(  = Match a start parentheses\n\t                     [^)(]*  = Match anything that isn\'t a parentheses\n\t                 \\)  = Match a end parentheses\n\t             )  = End Group\n              *\\) = Match anything and then a close parens\n          )  = Close non-capturing group\n          *  = Match anything\n       )  = Close capturing group\n\t \\)  = Match a close parens\n\n\t /gi  = Get all matches, not the first.  Be case insensitive.\n\t */\n\tvar fixedCss = css.replace(/url\\s*\\(((?:[^)(]|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\)/gi, function(fullMatch, origUrl) {\n\t\t// strip quotes (if they exist)\n\t\tvar unquotedOrigUrl = origUrl\n\t\t\t.trim()\n\t\t\t.replace(/^"(.*)"$/, function(o, $1){ return $1; })\n\t\t\t.replace(/^\'(.*)\'$/, function(o, $1){ return $1; });\n\n\t\t// already a full url? no change\n\t\tif (/^(#|data:|http:\\/\\/|https:\\/\\/|file:\\/\\/\\/|\\s*$)/i.test(unquotedOrigUrl)) {\n\t\t  return fullMatch;\n\t\t}\n\n\t\t// convert the url to a full url\n\t\tvar newUrl;\n\n\t\tif (unquotedOrigUrl.indexOf("//") === 0) {\n\t\t  \t//TODO: should we add protocol?\n\t\t\tnewUrl = unquotedOrigUrl;\n\t\t} else if (unquotedOrigUrl.indexOf("/") === 0) {\n\t\t\t// path should be relative to the base url\n\t\t\tnewUrl = baseUrl + unquotedOrigUrl; // already starts with \'/\'\n\t\t} else {\n\t\t\t// path should be relative to current directory\n\t\t\tnewUrl = currentDir + unquotedOrigUrl.replace(/^\\.\\//, ""); // Strip leading \'./\'\n\t\t}\n\n\t\t// send back the fixed url(...)\n\t\treturn "url(" + JSON.stringify(newUrl) + ")";\n\t});\n\n\t// send back the fixed css\n\treturn fixedCss;\n};\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/urls.js?'
    )
  },

  './src/index.js': function(module, exports, __webpack_require__) {
    eval(
      '__webpack_require__(/*! ./style.css */ "./src/style.css")\n__webpack_require__(/*! ./moduleA.js */ "./src/moduleA.js")\nconst b = __webpack_require__(/*! ./moduleB.js */ "./src/moduleB.js")\nconsole.log(1)\nsetTimeout(() => {\n  console.log(\'new b is running\')\n  b()\n}, 1000)\n\n\n//# sourceURL=webpack:///./src/index.js?'
    )
  },
  './src/moduleA.js': function(module, exports) {
    eval(
      "var newDiv = document.createElement('div') \nvar newContent = document.createTextNode(\"Hi there! I'm module A!\")\nnewDiv.appendChild(newContent)\ndocument.body.appendChild(newDiv)\n\n//# sourceURL=webpack:///./src/moduleA.js?"
    )
  },

  './src/moduleB.js': function(module, exports) {
    eval(
      "module.exports = function() {\n  var newDiv = document.createElement('div')\n  var newContent = document.createTextNode(\"Hi there! I'm module B!\")\n  newDiv.appendChild(newContent)\n  document.body.appendChild(newDiv)\n}\n\n\n//# sourceURL=webpack:///./src/moduleB.js?"
    )
  },

  './src/style.css': function(module, exports, __webpack_require__) {
    // 这里可以看到 css-loader 对css文件出的处理
    // css的内容被保存到了  './node_modules/css-loader/dist/cjs.js!./src/style.css' 中
    // './node_modules/style-loader/lib/addStyles.js'对应的函数则是将css插入html的逻辑
    eval(
      '\nvar content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");\n\nif(typeof content === \'string\') content = [[module.i, content, \'\']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {"hmr":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/style.css?'
    )
  }
})

```
