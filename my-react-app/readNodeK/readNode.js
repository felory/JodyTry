const name = "Jody";
const age = 28;
console.log(`Hello, ${name}`);
// let db;
// let findMe = db.collection('user').find({ name });
// if (findMe) {
//     db.collection('user').updateOne({ name }, { $set: { age } });
// }else{
//     db.collection('user').insertOne({ name, age });
// }

// db.collection('user').deleteOne({ name });

// 以上代码是伪代码，实际操作需要连接到MongoDB数据库并执行相应的操作。

const currentWorkingDirectory = process.cwd();//执行进程时所在的目录
console.log("currentWorkingDirectory is : ",currentWorkingDirectory)

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log("__dirname is :", __dirname); //js文件所在目录

console.log("env is :", process.env.NODE_ENV);

/**事件循环
 * 1.同步代码
 * 2.微任务插队（nextTick() 优先于 Promise)
 * 3.基于libuv的6阶段事件循环：
 *      （1）定时器setTimeout
 *      （2）Pending (OS级别的回调，如TCP错误)
 *      （3）prepare（nodejs内部准备阶段）
 *      （4）Poll 轮询 等待I/O、网络完成：文件、http 、db...
 *      （5）check检查阶段(setImmediate)
 *      （6）close关闭回调  //socket.close
 */

/**进程协作
 * 1.spwan创建子进程，用OS提供的方式操作它。
 * 2.fork创建一个worker工作进程，可以用OS操作，可以分配CPU资源，还具有nodejs内置的消息机制。=>worker拥有完整的进程集群进行更复杂的进程协作。
 * 3.cluster创建子进程，worker进程和主进程共享同一份代码，可以在进程间共享一些资源（网络端口号）。
 * if(cluster.isMaster) {
 *      // 主进程逻辑
 *      cluster.fork();//启动一个子进程
 *      cluster.on('exit', (worker, code, signal) => {
 *          console.log(`worker ${worker.process.pid} died`);
 *       });
 * } else {
 *      // 工作进程逻辑
 * }
 */
const { spawn, fork } = await import("child_process");
//任意创建子进程，//执行readNodeProcess.cjs
const child = spawn("node", ["readNodeProcess.cjs"]);

// 监听子进程的标准输出//'data'是事件名，子进程输出新数据时，'data'、'error'、'close'，'end'//流数据传输完成（但流未必关闭）
child.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

// 监听子进程的标准错误输出;
child.stderr.on("data", (data) => {
  //参数 data是 ​​Buffer 或 String 类型​​
  console.error(`stderr: ${data}`);
});

// 监听子进程的退出事件
child.on('exit', (code) => {
    console.log(`子进程退出，退出码：${code}`);
});


//启动子进程
const worker = fork('./worker.js');
// 向子进程发送消息
worker.send('Hello from parent');
// 监听子进程发送的消息
worker.on('message', (message) => {
    console.log(`received from worker: ${message}`);
});
//监听子进程退出
worker.on('exit', (code) => {
    console.log(`worker exited with code: ${code}`);
});
/** worker.js里
 * process.on('message', (message)=>{});//监听父进程的消息。
 * process.send(message);//向父亲发送消息
 */
