const express = require('express');
const app = express(); //instance 
const PORT = 3000;

//default port
const cors = require('cors');
const path = require('path');
const fs = require('fs');

///3.1使用express中间件，把所有请求参数请求体，转化成js对象
app.use(express.json());
///3.2使用跨域中间件
app.use(cors());

//4.1 静态资源托管
app.use(express.static(path.join(__dirname, 'public')));   

//
let todos = [
    { id: 1, title: 'todo1', done: true},
    { id: 2, title: 'todo2', done: true},
    { id: 3, title: 'todo3', done: false},
    { id: 4, title: 'todo4', done: true},
];

let nextId = 5;//新数据的id
function loadTodos() {
    if (fs.existsSync(DB_FILE)) {
        try{
            const raw = fs.readFileSync(DB_FILE, 'utf-8');
            todos = JSON.parse(raw);
            nextId = todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
        }catch(err){
            console.error('read data.json failed', err);
            todos = [];
            nextId = 1;
        }
    }
}
loadTodos();

function saveTodos() {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(todos, null, 2), 'utf-8');
    } catch (err) {
        console.error('write data.json failed', err);
    }
}

//5.设置路由
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Invalid todo title, title should be string and nonemty' });
    }
    const newTodo = { id: nextId++, title, done: false };
    todos.push(newTodo);
    saveTodos();
    res.status(201).json(newTodo);
});

app.patch('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    const { title, done } = req.body;
    if (typeof title !== 'string') {
        todo.title = title;
    }
    if (typeof done === 'boolean') {
        todo.done = done;
    }
    saveTodos();
    res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
        res.status(404).json({ error: 'Todo not found' });
    }
    todo.splice(index, 1);
    saveTodos();
    res.tataus(204).end();
});


//2.设置接口，给外界传递数据
app.get('/datas', (req, res) => {
    console.log('请求的参数是', req.query);

    res.send('Hello World!');
});

app.get('/api/search', (req, res) => {
    const query = req.query.q; //获取查询参数
    if (!query || query.trim() === '') {
        return res.status(400).json({ error: 'Please enter a search term' });
    }
  
    //模拟异步操作
    setTimeout(() => {
        res.json({ results: `Results for "${query}"` });
    }, 1000);
    
});

//1.监听port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});