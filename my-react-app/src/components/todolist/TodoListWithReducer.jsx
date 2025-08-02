import React from 'react';
import { useReducer, useState } from 'react';

export default function TodoListWithReducer() {

  // const [tasks, setTasks] = useState(initialTasks);
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks); //传入reducer函数+初始state；返回state+dispatch函数用来派发给reducer函数。

  function handleAddTask(text) {
    dispatch({
        type: 'added',
        id: tasks.length,
        text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

    /////可以移到一个新的reducer.js中
    ////1.reducer必须纯粹【即输入相同时，输出也是相同的】。在渲染时运行。不应该包含异步请求、定时器或者任何副作用（对组件外部有影响的操作）
    ////2.action描述单一的用户交互，即使会引发多个state变化。
  function tasksReducer(tasks, action) { //current tasks, action; return next state.
    switch (action.type) {
      case 'added':
        return [...tasks, { id: action.id, text: action.text, done: false }];
      case 'changed':
        return tasks.map(task =>
          task.id === action.task.id ? { ...task, done: action.task.done, text: action.task.text } : task
        );
      case 'deleted':
        return tasks.filter(task => task.id !== action.id);
      default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  )
}

 const initialTasks = [
    {id: 0, text: '参观卡夫卡博物馆', done: true},
    {id: 1, text: '看木偶戏', done: false},
    {id: 2, text: '打卡列侬墙', done: false}
    ];

function AddTask({ onAddTask }) {
    const [text, setText] = useState('');
    
    function handleSubmit(event) {
        event.preventDefault();
        if (text.trim() === '') return;
        onAddTask(text);
        setText('');
    }
    
    return (
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="添加新任务"
        />
        <button type="submit">添加</button>
        </form>
    );
}

function TaskList({ tasks, onChangeTask, onDeleteTask }) {
    const [editingIdValMap, setEditingIdValMap] = useState({});

    const toggleEditingTask = (task, startEditing) => {
        if (!startEditing) {
            onChangeTask({ ...task, text: editingIdValMap[task.id] });
        }

        setEditingIdValMap(() => ({
            ...editingIdValMap,
            [task.id]: startEditing ? task.text : null,
        }));
    }

    const onTempSaveEditingTask = (taskId,  value) => {
        setEditingIdValMap(() => ({
            ...editingIdValMap,
            [taskId]: value
        }));
    }


    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id} style={{ textAlign: 'left', marginLeft: '10px' }}>
                    <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => onChangeTask({ ...task, done: !task.done })}
                    />

                    <span style={{ marginLeft: '10px', marginRight: '10px' }}>
                        { editingIdValMap[task.id] == null ? task.text :
                        <input
                            type="text"
                            value={editingIdValMap[task.id]}
                            onChange={(e) => onTempSaveEditingTask(task.id, e.target.value )}
                            placeholder="编辑任务"
                            />
                        }
                        
                    </span>
                    <button onClick={() => {
                        toggleEditingTask(task, editingIdValMap[task.id]==null)
                    }}>{ editingIdValMap[task.id] == null ? 'edit' : 'save'}</button>

                    <button onClick={() => onDeleteTask(task.id)}>删除</button>
                </li>
            ))}
        </ul>
    );
}