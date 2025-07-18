# React分为网页开发（readct-dom）app开发（react-native）
<head>
  <meta charset="UTF-8" />
  <title>React</title>
  <!--1.核心包，不提供DOM操作的功能-->
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <!--2.支持操作DOM-->
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>

# JSX 类似模板语言，在JS中写html代码。===》简化了createElement语法。
JSX本质是React.createElement(compoenent, props, children)函数的语法糖，使用Babel编译后，JSX会变成虚拟DOM。

//jsx的html里写js必须用 大括号。
// 所以注释用 {/*comment*/}

==========================================
一直把code写在一个文件里，每次都要引入react, react-dom, babel 很影响效率，==》工程化开发：基于构建工具来搭建项目。
1. 包管理器yarn/npm，对项目进行构建管理。
yarn create create-react-app xx1
npm init react-react-app xx2
2. 脚手架create-react-app（官方）/vite（尤雨溪）。
yarn create vite yy1
npm init vite yy2

目录结构不同，create-react-app默认入口是public/index.html + main.js。
使用vite搭建的默认入口是index.html + main.jsx(导入了react-dom ==> ReactDOM.createRoot())

在文首加上`import React from 'react';`是为了在所有的jsx组件，都会被babel转码成React.createElement()
==========================================




# 6大特点： 
## 声明式 编码风格
声明式，描述结果。
命令式，没有封装的大量判断逻辑，更有侵入性。
## 虚拟DOM => 高效
拷贝假的DOM树（js对象），由diff算法比较两个虚拟DOM树的差异，然后pach算法进把差异应用到真正的DOM.==>减少了dom操作。
## 灵活：结合其他库/框架
## JSX: js扩展，描述UI及交互
## 组件 
## 单向响应数据流 



### 有无状态组件，指的是组件内能否定义state（定义了私有数据）
react17之前，类组件是有状态的，函数式组件没状态。
react17之后，函数式组件可以通过Hooks来定义state。


### 事件机制，并不把事件绑定到具体DOM上，而是由事件代理（事件委托），将所有事件绑定到react注册的根结点（react17之前是document），然后由统一的事件监听器去dispatchEvent。
==》统一在根结点监听，减少了注册事件数量，减少事件处理、回收的内存开销。【合成事件,react维护了一个映射表（listenerBank）来记录事件与组件的对应关系。】
<button onClick={() => setCount((count) => count + 1)}>
=>打印出来的是SyntheticBaseEvent. 而不是MouserEvent.


# 3大属性
## Ref => 获取组件实例，或DOM元素
ref.current
## state => 组件内部的私有属性。是个对象。（state改变，react会自动渲染页面，而不需要操作dom）=>自动响应。

## prop ==> 接受外部组件的参数，是只读的。


## global context 
生产者消费者，发布订阅，非父子组件间传递数据。


## 插槽，复用但避免不必要的通信。

