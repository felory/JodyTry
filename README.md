# JodyTry

# Node
## nodejs
v8引擎：可调API(file, network req, os info)，将js解释->机器码。
异步操作（由event loop实现）
事件驱动：注册事件+监听，根据事件状态来处理。
####

模块：
核心模块：path, os, fs, events, 
第三方模块：npm包
自定义模块

**解析路径，模块加载：
1.是否有缓存。  let fs=require("fs")
2.是否是核心模块。 let demo=require("./demo")
3.检查扩展名。
4.by扩展名，解析执行

### 应用场景：后台服务，脚本处理。
koa: 洋葱模型的开发模式
express: 以路由为核心的nodejs框架

本地服务: webpack的本地服务插件，都是基于nodejs的http模块实现的。
webpack将ts编译打包成js,和nodejs的fs模块息息相关。




