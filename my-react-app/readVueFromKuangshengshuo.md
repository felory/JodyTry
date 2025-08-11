### css是标记语言，不是编程语言。所以不具备任何语法支持。（自定义变量，引用）

### 如何自己实现一个new操作符？
function myNew(constructor, ...args){
    //1.创建新对象，继承构造函数的原型
    const obj = Object.create(constructor.proptotype);
    //2.运行构造函数，绑定this到新对象
    const result = constructor.apply(obj, args);
    //若2.返回对象，则使用该对象；否则2.返回的是常量，返回新对象
    return result instanceof Object ? result : obj;
}
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const p1 = new Person('张三', 20);
const p2 = myNew(Person, '李四', 25);


// var 的问题
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i)); // 输出3个3
}

// let 的解决方案
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j)); // 输出0,1,2
}