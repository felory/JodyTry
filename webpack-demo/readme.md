1. webpack(bundle) vs vite(bundleless)
2. 模块化的过程
3. 构建过程
4. 编译时
5. 优化输出
   
- 架构层
    - 生命周期钩子函数hooks，执行时机（执行时函数预埋好）Tapable
    - 执行的全流程


### 初始化 npm init -y
- webpacl-cli, vue-cli, create-react-app => 脚手架的开发流程？架构设计VIP?
  
webpack可以通过1.cli 2.node API来使用。

"devDependencies": {
    "webpack": "5.98.2",
    "webpack-cli": "6.0.1"
}

"type": "module" //指定模块规范，使用esm规范。

"scripts": {
    "dev": "webpack serve --mode development",
    "build" :"webpack --mode production"
},
