# [Travis CI](https://travis-ci.com)

## CI - 持续集成(continuous integration)

是指在软件的整个开发周期中，实践小规模的高频的合并代码更改，而不是在开发周期的结尾进行大规模的合并代码更改，目标是在较小的增量情况下，通过开发和测试建立更健康的软件

而 Travis CI 就是一个持续集成的平台，它通过自动化部署和测试来支持开发，并在成功修改后提供及时的反馈

<!--
## Builds，Jobs，Stages and Phases

Travis CI 中的一些名词

### Phase

工作中连续的步骤
举例说明：install phase 早于 script phase 早于 deloy phase

### Job

一个自动化的进程，它将克隆你的代码到一个虚拟环境中，然后运行一系列的 phase,诸如编译你的代码，运行测试等等，如果 script phase 返回值是非零，job 会失败

### Build

一个 job 的组合
举例说明：一个 build 可能拥有两个 job，每一个 job 都可以在不同版本不同的编程语言下测试一个项目。
当 build 中的 job 完成时，build 也就完成了

### Stage

一个 job 的组合，并行运行在按顺序 build 过程中（由多个 stage 组成）的一部分，
-->

## [开始配置 travis ci](https://travis-ci.com/getting_started)

> 1、首先注册账号，https://travis-ci.com/

> 2、激活 github 代码仓库 （activate your github repository）

> 3、在项目根目录增加 .travis.yml 文件，做好配置

> 4、将本地更改退到 github 中即可触发 ci

[最简单的 demo](https://github.com/ZhaoKai-Kaiser/exercise2)
