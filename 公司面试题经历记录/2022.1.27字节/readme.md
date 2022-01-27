## vue3比vue2性能更优是在哪
1. const a = '火山'
   var b = 123
   if (window.a) {
     b = 't'
     var c = 'tab'
   }
console.log(a)
console.log(b)
console.log(c)

2. promise
new Promise((resovle, reject) => {
     reject('错误')
}).then(() => {
 console.log(1)
}, err => {
  console.log(2)
}).then(() => {
  console.log(3)
},err => {
  console.log(4)
})

试着输出promise里面的值




2. Array.__proto__ 等于什么

## 算法题

function getArray() {
 // 完善这里的代码

 }

getArray(null, 1) = [null]

getArray(null, 2) = [null, null]

getArray('o', 2, 2) = [
  ['o', 'o'], ['o', 'o'],
  ['o', 'o'], ['o', 'o']
]

getArray('o', 3, 3, 2) = [
  ['o', 'o'], ['o', 'o'], [ 'o', 'o'],
  ['o', 'o'], ['o', 'o'], [ 'o', 'o'],
  ['o', 'o'], ['o', 'o'], [ 'o', 'o']
]

## https的握手过程


## 对称加密和非对称加密

## 数字证书是什么

## ca如何保证安全

