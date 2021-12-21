// 手写实现call方法
Function.prototype.myCall = function(context) {
  context = context || globalThis
  const arr = [...arguments].splice(1)
  context.fn = this
  const result = context.fn(...arr)
  delete context.fn
  return result
}

function add (a = 0, b = 0) {
  console.log(this)
  return a + b + this.c
}
global.c = 10
const objectTest = {
  c: 20
}

const myresult = add.myCall()


Function.prototype.myApply = function(context) {
  context = context || globalThis
  context.fn = this
  const result = arguments[1] ? context.fn(...arguments[1]) :  context.fn()
  delete context.fn
  return result
}

add.myApply(objectTest, [10, 20])