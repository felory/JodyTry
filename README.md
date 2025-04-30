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




不需要服务器？
支持客户端渲染（CSR）、单页应用（SPA）和静态站点生成（SSG）。这些应用可以部署到 CDN 或静态托管服务（无需服务器）。


1.//支持全栈react：可以 将 Next.js 应用部署 到任何支持 Node.js 或 Docker 容器
npx create-next-app@latest


2.//全栈：路由库+vite
强调标准的 Web API 并提供了多个 可部署的模板 适用于各种 JavaScript 运行时和平台。
npx create-react-router@latest

3.//使用Expo库，支持真正原生 UI 的通用 Android、iOS 和 Web 应用
npx create-expo-app@latest



vite:
有丰富的插件生态系统，能够支持快速热更新、JSX、Babel/SWC 等常见功能


======
npm create vite@latest my-react-app -- --template react