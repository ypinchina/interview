// 实现手写promise
class MyPromise {
  static PENDDING = '等待中'
  static FULFILLED = '已完成'
  static REJECT = '已拒绝'
  constructor(func) {
    this.status = this.PENDDING
    this.result = null
    console.log(this)
    func(this.resolve, this.reject)
  }
  resolve(result) {
    console.log(this)
    if (this.status === this.PENDDING) {
      this.status = this.FULFILLED
      this.result = result
    }
  }
  reject(result) {
    if (this.status === this.PENDDING) {
      this.status = this.REJECT
      this.result = result
    }
  }
}

new MyPromise((resolve, reject) => {
  console.log(this)
  resolve('你好吗')
})