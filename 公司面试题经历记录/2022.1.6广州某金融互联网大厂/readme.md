只写有疑问的问题
1. web worker你知道吗
2. websocket用过吗
3. vue 动态路由怎么理解
4. react组件间是怎么传递参数的
5. 递归和迭代的区别
6. 说一下三次握手和四次挥手
7. 垂直水平居中的方案有哪些
8. CSS3怎么写一个动画
9. translate属性介绍一下
10. transform 里面除了你说的translate还有什么属性


笔试题
var name = "Windows"
var object = {
  name: "Mac",
  getNameFunc: function() {
    return function () {
      return this.name
    }
  }
}
console.log(object.getNameFunc()())
// 问输出什么


// 我写的Windows 实际答案是undefined

// 已获得offer