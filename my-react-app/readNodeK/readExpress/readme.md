#### express快速上手

# npm init -y
创建package.json
# npm i express

# node作为服务器，通过接口向外提供数据
# 新建一个 index.js
1.引入express,监听一个port
2.设置接口
app.get('/datas', (请求对象req, 响应对象res) => {
    //getde 查询参数 req.query
    //post的请求体 req.body =》由于请求体（可能包含文件、图片）很大的数据，所以nodejs不会一次性读取所有的请求数据，而是通过事件一边接收一边处理。==》使用express中间件 简化这个步骤。

    res.send();//响应
});

3.

# 每次修改代码后在终端跑 node index.js 或者使用nodemon自动重启服务器。

# postman => apifox

## express中间件，本质是一个函数，提前对req、res进行处理。便于后续处理。
使用app.use进行设置:
1.请求处理中间件：把body都被处理成js对象：app.use(express.json())=> 那么所有的请求都会经过这个中间件。
2.跨域处理中间件：npm i cors 单独安装这个中间件; app.use(cors());

# node作为服务器，进行静态资源托管
1.在根目录下创建public文件夹；在内部创建index.html
2.希望访问服务器路径，展示这个html页面。
app.use(express.static(绝对路径path.join(__dirname, 'public')))

