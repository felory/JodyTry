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
===============================================================
===============================================================
===============================================================
# 三大属性监听数据变化 ref(与渲染无关，持久化存储), state（触发重新渲染的状态）, props 
(1)ref绑定到【DOM节点】，ref.current可以拿DOM元素对象。
让组件记住一些信息，但又不触发新的渲染！！！
单向数据流的脱围机制。
const r = useRef(123); //返回对象{current: 123};




///////需要直接访问或操作DOM节点（如聚焦输入框、测量元素尺寸），但操作本身不应触发重新渲染
 const inputRef = createRef();

 useEffect(() => {
    inputRef.current.focus(); // 组件挂载后聚焦
  }, []);

    return (<>
        <h6>Hello~ This is function comp.</h6> 
        <input type="text" ref={inputRef} onChange={() => {
            console.log("onInputChange=>:", inputRef.current?.value);
        }}/>
        </>
    )
ref绑定到【组件】，可以拿到组件实例。
const myToolRef = createrRef();
<MyTool ref={myToolRef}></MyTool> 需要MyTool是类组件，才能拿到实例。
如果 MyTool 是函数组件，需要用 React.forwardRef 包裹它

(2)state 组件内部的私有数据对象。state变化，react会自动重新渲染，而不用操作DOM==>自动响应。
//直接修好原数组，引用未变，不会重新渲染。
//​​每次更新对象时，都像对待冰雕——不能直接修改，只能复制后重塑

(3)props 是组件传参，是只读的！
<TodoList msg={msg}></TodoList>
export default function TodoList({ msg }) { }

================================================================ 
==================================================
# Hook: 以 use 开头的函数。//只能在组件或自定义 Hook 的最顶层调用
Hook 是特殊的函数，只在 React 渲染时有效。
const [val, setVal] = useState(initVal);
// 1.组件进行第一次渲染。 因为你将 initVal 作为 index 的初始值传递给 useState，它将返回 [0, setVal]。 React 记住initVal 是最新的 state 值。
// 2.调用 setVal(val + 1)。 val 是 0，所以它是 setIndex(1)。这告诉 React 现在记住 val 是 1 并触发下一次渲染。
// 3.组件进行第二次渲染。React 仍然看到 useState(0)，但是因为 React 记住 了你将 index 设置为了 1，它将返回 [1, setVal]。
====================== 
对 React 来说重要的是组件在 UI 树中的位置,而不是在 JSX 中的位置。
相同位置的相同组件会使得 state 被保留下来
{isFancy ? (
        <Counter isFancy={true} /> 
      ) : (
        <Counter isFancy={false} /> 
      )}
同一个位置，会保留原来的state
类似 <Counter isFancy={isFancy} /> 

====> 加上key(不是全局唯一，而是父组件内部的顺序)，即使在UI树的同一位置，也不是同一个组件，不会共享state。
<Counter key="k1" isFancy={isFancy} /> 

============= 
被移除的组件，如何保留state？
1.css hide(大量DOM会使得性能变差)。
2.状态提升到父组件。
3.保存到localStorage。
====================================================
====================================================
集中 事件处理程序 到reducer。“减少” 组件内的代码量。

将useState迁移到useReducer steps:
(1).将设置状态的逻辑 修改 成 dispatch 的一个 action对象； ==> 不直接setState而是发出一个action表明发生了什么：
////handleAddTask(text){
dispatch({    // ==> action对象
    type: 'added',
    id: nextId++,
    text: text,
  });}; 
handleEditTask(text); handleDeleteTask(text); 留下事件处理函数。
(2).编写 一个 reducer 函数； ////放状态逻辑，接受两个参数：当前状态state + action；返回下一个状态。
`
function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('未知 action: ' + action.type);
    }
  }
}
`

(3).在你的组件中 使用 reducer。
import { useReducer } from 'react';
////删除 const [tasks, setTasks] = useState(initialTasks);
const [tasks, dispatch] = useReducer(tasksReducerFn, initialTasks);
function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

==============
const [state,dispatch] = useReducer(reducerFn,initState);
useReducer的实质是：
function useReducer(reducerFn, initState){
  const [state, setState] = useState();

  function dispatch(action){
    const newState = reducerFn(state, action);
    setState(newState);
  }

  return [state, dispatch];
}
============================================================
========================================================
context使组件向其下方的整个树提供信息。
可以用它来传递整个子树需要的任何信息：当前的颜色主题、当前登录的用户、保存当前活动的路由。

1.新建一个aaa.context.js文件，导出全局context：
import { createContext } from 'react';
export const LevelContext = createContext(0);

2.在父组件中，把消费范围，包裹到context provider里：
`
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext value={level + 1}>  //////here
        {children}
      </LevelContext>
    </section>
  );
}
`

3.无论层级多深的任何子组件中，使用useContext hook来读取。
const level = useContext(LevelContext);

=======================================================

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



# react中有两种逻辑：1.渲染代码，纯粹的计算jsx（props+state） 2.事件处理程序(用户操作 + 引起副作用改变了程序状态) 
## 不由特定事件引起，而是由渲染本身引起的副作用（如建立服务器连接）。Effect通常在 提交结束后、页面更新后运行，此时正是react与外部系统同步的最佳时机。
Effect 只能做两件事：开始同步某些东西，然后停止同步它
### 走出react，连接外部系统（网络/第三方库）：
1.用浏览器API聚焦输入框。
2.在没有react情况下，实现视频播放器。
3.连接+监听远程服务器的消息。
========
1.使用ref来记住组件内的信息（如timeoutID， DOM元素），但是不触发新的渲染。////ref.current = ref.current + 1;
////react会自动更新DOM，但是有时需要操作DOM如：
聚焦节点（ 
const inputRef = useRef(null);
function handleClick() {
  inputRef.current.focus();
}
 <input ref={inputRef} />
    <button onClick={handleClick}>
）、
滚动到此节点，
以及测量它的尺寸和位置

2.使用Effect与外部系统同步，如
function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => { //isPlaying来自props
    if (isPlaying) {
      ref.current.play(); //不要试图在渲染期间对 DOM 节点进行操作，所以要放在useEffect钩子里。
    } else {
      ref.current.pause();
    }
  }, [isPlaying]);
  
  return <video ref={ref} src={src} loop playsInline />;

#### write an effect， 当组件渲染时，react会先更新页面，再运行useEffect里的代码。===》useEffect 会“延迟”一段代码的运行，直到渲染结果反映在页面上。

1.声明effect
import { useEffect } from 'react';
##### ///不要在effect中更新state，因为这会导致重新渲染，从而导致又再次触发effect，这样陷入死循环。==》Effect 应该用于将你的组件与一个 外部 的系统保持同步
2.指定effect依赖
 useEffect(() => {
    if (isPlaying) { // isPlaying 在此处使用……
      // ...
    } else {
      // ...
    }
  }, [isPlaying]);///==》传入依赖数组，只有当这些值发生变化时，才重新执行我这个effect，跳过不必要的重新运行effect。
==========
​（1）​依赖数组包含effect中用到的所有会变化的值​​（props、state等）。
  不用传递ref，因为ref 具有 稳定 的标识：React 确保你在 每轮渲染中调用同一个 useRef 时，总能获得相同的对象。但是如果是父组件传递来的ref则需要依赖。
  useState 返回的 set 函数 也具有稳定的标识。
  React 使用 Object.is 来比较依赖项的值。
（2）空数组[]表示effect只在组件挂载时运行一次。
（3）不传依赖数组，表示每次渲染后都运行。

3.必要时，添加清理
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => { /////返回一个cleanup函数，自行清理。在组件卸载（被移除）时最后一次调用。
      connection.disconnect();
    };
  }, []);



================================
================================
useMemo每次重新渲染时，缓存计算的结果。
const cachedValue = useMemo(calcFn, dependencies);


==============
# react1引入严格模式，在开发环境下，会故意让组件渲染2次，目的是为了帮助开发者发现潜在的副作用。
而生产环境会自动关闭，不会出现双重渲染。

# useCallback

