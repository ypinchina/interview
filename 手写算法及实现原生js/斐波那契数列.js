// 所谓斐波那契数列 即第一项和第二项是1，后面的每一项都是前两项之和
// 1 1 2 3 5 8 13 21 34 ......

function fibonacci(n) {
  // n为第几项
  if (n === 1 || n === 2) {
    return 1
  } else if (n < 1) {
    return 'n需要为正自然数'
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2)
  }
  // 函数返回第n项的值
}
console.log(fibonacci(7))