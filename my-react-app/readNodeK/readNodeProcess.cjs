// 它会启动一个长时间运行的子线程（模拟工作线程）
const { Worker } = require('worker_threads');

// 设置进程标题（仅限Linux/macOS）
process.title = 'my-node-worker';

// 启动子线程
const worker = new Worker(`
  const { parentPort, workerData } = require('worker_threads');
  parentPort.postMessage('子线程运行中');
  setInterval(() => {}, 1000);
`, { eval: true });


/*
1.执行：node readNodeProcess.js

2.在bash中查看线程：
查看所有线程：ps aux | grep node
查看by线程名字: ps aux | grep my-node-worker
或者windows: tasklist | findstr node

3.查看线程详细信息：
ps -T -p <主进程PID>

4.kill <主进程PID>
*/

/**
 * 
 */
const { spawn, exec} = require('child_process');

// 启动一个子进程（例如启动一个js脚本）
const child = spawn('node', ['readNode.js']);

// 监听子进程的输出
child.stdout.on('data', (data) => {
  console.log(`子进程输出: ${data}`);
});

// 监听错误
child.stderr.on('data', (data) => {
  console.error(`子进程错误: ${data}`);
});

// 监听子进程退出
child.on('close', (code) => {
  console.log(`子进程退出，代码: ${code}`);
});


// 执行系统命令（如 `ps aux` 查看所有进程）
exec('ps aux', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行错误: ${error}`);
    return;
  }
  console.log(`所有进程信息:\n${stdout}`);
});