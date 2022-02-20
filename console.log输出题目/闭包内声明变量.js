(function () {
  var a = b = 100
})()

console.log(typeof a)
console.log(typeof b)


// 本体考察两个知识点 1、访问匿名函数内部声明变量 2. var声明变量

// 函数作用域是es6出现块级作用域之前 唯一的封闭的作用域， 因此外部无法访问到在函数内部声明的变量 所以第一行输出 undefined
// var a = b = 100  等价于  var a = 100 , b = 100, 函数内部没有声明 直接赋值的话 在非严格模式会把b挂载到window对象
// 所以第二行输出number