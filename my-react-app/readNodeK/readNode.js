const name = "Jody";
const age = 28;
console.log(`Hello, ${name}`);

let db;
let findMe = db.collection('user').find({ name });
if (findMe) {
    db.collection('user').updateOne({ name }, { $set: { age } });
}else{
    db.collection('user').insertOne({ name, age });
}

db.collection('user').deleteOne({ name });

// 以上代码是伪代码，实际操作需要连接到MongoDB数据库并执行相应的操作。

