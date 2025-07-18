# React分为网页开发（react-dom）app开发（react-native）
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
============  
(1)目录结构不同，create-react-app默认入口是public/index.html + main.js。
(2)使用vite搭建的默认入口是index.html + main.jsx(导入了react-dom ==> ReactDOM.createRoot())
(3)根组件App.jsx使用React-Router来分发路由。

在文首加上`import React from 'react';`是为了在所有的jsx组件，都会被babel转码成React.createElement()。


=============
函数组件、类组件的主要区别在于：
定义方式（函数/类）、状态管理（Hooks/this.state）、生命周期（useEffect/生命周期方法）、性能优化（React.memo/shouldComponentUpdate）

(1)函数组件：（自16.8引入hooks后，新功能围绕函数式组件设计，如并发设计，suspend。代码量减少30%避免了this指向，生命周期冗余逻辑。使用useMemo+useCallBack性能优化更灵活。生态兼容更好，主流库都已经拥抱hooks）
    function A(){ return <p>hello</p>; }
    export default A;
(2)类组件：(面向对象的风格)（
    无法直接使用 useDeferredValue、useTransition等并发特性。
    生命周期方法与并发渲染的调度机制存在冲突（如 componentWillUpdate可能被中断）。）
    class B extends React.Component { 
        render(){return (<p></p>);}
    };
    export default B;
=============
插件快捷键rfc快速填充函数式组件。
rsc快速生成工具函数代码。
==========================================
react18 ​函数式组件新特性：​并发渲染​​：通过 useTransition标记低优先级更新，避免界面卡顿
const [isPending, startTransition] = useTransition();
startTransition(() => { setFilter(input); }); // 延迟更新搜索过滤
================================
事件并没绑定到实际的dom上，而是通过【事件代理】把all event绑定到root根节点上(react17前是document)，由【统一的事件监听器】（dispatchEvent）监听事件触发。
===》这样可以减少event注册数量，减少event处理、回收带来的内存开销，达到性能优化的目的。

【合成事件】SyntheticEvent是原生事件的【跨浏览器包装器】，兼容所有浏览器。包括封装了 事件注册、存储、合成、执行。
【映射表listenerBank】组件ID + 事件类型。
===》
div冒泡到root，发送到合成事件层（实例化成统一的react event），从映射表里找到事件处理函数，分派给它。
当一个组件挂载/卸载，相应的事件处理函数会在映射表中 添加/删除。
================================
# 三大属性监听数据变化 ref, state, props 
(1)ref绑定到【DOM节点】，ref.current可以拿DOM元素对象。
 const inputTxt = createRef();

    return (<>
        <h6>Hello~ This is function comp.</h6> 
        <input type="text" ref={inputTxt} onChange={() => {
            console.log("onInputChange=>:", inputTxt.current?.value);
        }}/>
        </>
    )
ref绑定到【组件】，可以拿到组件实例。

(2)state 组件内部的私有数据对象。state变化，react会自动重新渲染，而不用操作DOM==>自动响应。





============


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

