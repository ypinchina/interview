// 实现数组去重的几种方法
// 方法一 使用set对象
let arr = [1,2,2,1,4,2,5,5,6]
console.log([...new Set(arr)])
