// 手写new实现
function Animal(type) {
  this.type = type
}
Animal.prototype.say = function() {
  console.log(`我是${this.type}动物`)
}
// var animal = new Animal('无脊椎爬行')
// animal.say()


var newAnimal = myNew(Animal, '哺乳')
function myNew() {
  let obj = {}
  // 字面量创建一个新的对象
  let Contructor = Array.prototype.shift.call(arguments)
  // 获取原型对象
  obj.__proto__ = Contructor.prototype
  // 将实例的原型对象绑定到 构造函数的原型上
  const result = Contructor.apply(obj, arguments)
  // 绑定this到实例对象上并执行构造函数
  return result instanceof Object ? result : obj
  // 保证返回值的是个对象
}

newAnimal.say()