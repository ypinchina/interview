function myInstanceof(A, B) {
  let p1 = A
  while (p1) {
    if (p1.__proto__ === B.prototype) {
      return true
    }
    p1 = p1.__proto__
  }
  return false
}

let arr = []
console.log(myInstanceof(myInstanceof, Array))