// 求一个字符串中出现最多次数的字符，并返回他的次数
function getMaxChar(str) {
  const map = new Map()
  for (let i = 0; i < str.length; i++) {
    let iChar = str[i]
    if (!map.has(iChar)) {
      map.set(iChar, 1)
    } else {
      let count = map.get(iChar)
      map.set(iChar, count + 1)
    }
  }
  // let max = ['init', 0]
  // for (let value of map) {
  //   if (value[1] > max[1]) max = value
  // }
  // return max
  // let arr = [...map].sort((a, b) => b[1] - a[1])
  //  return arr[0]
  // 以上是正确答案 以下是我当时写的答案

  return map
  // 此时得到一个存储了各个字符出现次数的字典
}

const myStr = 'sdadaqrqgzvzxqweqedas'

console.log(getMaxChar(myStr))