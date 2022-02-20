const arr = new Array(5).fill('0')
arr[9] = 1
console.log(arr.length)

// 直接超越数组边际赋值是可行的， js是弱类型语言 。 中间没赋值的是默认undefined