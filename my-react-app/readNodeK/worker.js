process.on('message', (message) => {
    console.log(`received from parent: ${message}`);
    process.send(`Hello from worker`);
});

//向父发送初始消息
process.send('Worker started, first hello~');