import React, { useState, useRef } from 'react'
import './todolist.css'

export default function TodoList() {
  const newTaskTextRef = useRef('');

  const initState = {
    tasks: ['session1','session2'],
  }
  const [state, setState] = useState(initState);


  const onAddTask = () => {
    const txt = newTaskTextRef.current?.value;
    if (!txt) {
      alert('Please input task text');
      return;
    }
    //直接修好原数组，引用未变，不会重新渲染。
    //​​每次更新对象时，都像对待冰雕——不能直接修改，只能复制后重塑​
    const tasksCopy = state.tasks.concat();
    tasksCopy.unshift(txt); // add to the top
    newTaskTextRef.current.value = ''; // clear input box
    setState({ ...state, tasks: tasksCopy });
  }

  const onDeleteTask = (index) => {
    const tasksCopy = state.tasks;
    tasksCopy.splice(index, 1);
    setState({ ...state, tasks: tasksCopy });
  }
  
  const onMoveUp = (index) => {
    const tasks = state.tasks ?? [];
    if(index<=0||index>=tasks.length) {
      return;
    }
    const self = tasks.splice(index, 1)[0]; // remove
    tasks.splice(index-1, 0, self); // insert
    setState({ ...state, tasks: tasks });
  }

  const onMoveDown = (index)=>{
    const tasks = state.tasks ?? [];
    if(index<0||index>=tasks.length-1) {
      return;
    }
    const self = tasks.splice(index, 1)[0]; // remove
    tasks.splice(index+1, 0, self); // insert
    setState({ ...state, tasks: tasks });
  }

  return (<>
    <div className={'todo-list'}>
      <h6>TodoList</h6>

      <div className={'clear'}>
        <input type="text" ref={ newTaskTextRef } />
        <button className={'add-btn'} onClick={onAddTask}>add</button>
      </div>

      <ul>
        {state.tasks.map((t,index) => { 
          return <li key={index}>
            <span>{t}</span>
            <button className={'add-btn'} onClick={() => { onMoveUp(index) }}>up</button>
            <button className={'add-btn'} onClick={() => { onMoveDown(index) }}>down</button>
            <button className={'del-btn'} onClick={() => { onDeleteTask(index) }}>delete</button>
          </li>
        })}

        {
          !state.tasks?.length && <li className={'no-task'}><span>Empty</span></li>
        }
        </ul>

    </div>
    </> 
  )
}
