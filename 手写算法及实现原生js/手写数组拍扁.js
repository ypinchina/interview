let arr1 = [1,2,3,[4,5,6,[7,[72]]]]
function myFlat(arr) {
  const isFlat = arr.some(item => item instanceof Array)
  if (isFlat) {
    // 方法一 使用call
    // let brr = Array.prototype.concat.call([], ...arr)
    // 方法二 使用apply
    // let brr = Array.prototype.concat.apply([], arr)
    // 方法三 使用es6新增原生flat()
    let brr = arr.flat()
    return myFlat(brr)
  }
  return arr
}
console.log(myFlat(arr1))