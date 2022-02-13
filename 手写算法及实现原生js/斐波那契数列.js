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
// 509. 斐波那契数 https://leetcode-cn.com/problems/fibonacci-number/
// 斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：

// F(0) = 0，F(1) = 1
// F(n) = F(n - 1) + F(n - 2)，其中 n > 1
// 给定 n ，请计算 F(n) 。

 

// 示例 1：

// 输入：n = 2
// 输出：1
// 解释：F(2) = F(1) + F(0) = 1 + 0 = 1

/**
 * @param {number} n
 * @return {number}
 */
 var fib = function (n) {
  if (n === 0) {
      return 0
  } else if (n == 1 || n == 2) {
      return 1
  } else {
      // 设定 数字1 返回1 ，数字2也返回1，这里是模拟前两项
      let dp1 = 1
      let dp2 = 1
      for (let i = 2; i <= n; i++) {
          // 从2开始到第n项
          let temp = dp2
          dp2 = dp1
          dp1 = dp1 + temp
          // dp1是最新的一项
      }
      return dp2
  }
};
时间复杂度 O(n) 因为是for循环，空间复杂度O(1) ，常量级
