只写有疑问的问题
1. web worker你知道吗
2. websocket用过吗
3. vue 动态路由怎么理解
4. react组件间是怎么传递参数的
5. 递归和迭代的区别
6. 如何提升动画的效率，减少动画卡顿
7. 无限列表如何优化
   
递归（recursion）：递归常被用来描述以自相似方法重复事物的过程，在数学和计算机科学中，指的是在函数定义中使用函数自身的方法。（A调用A）

迭代（iteration）：重复反馈过程的活动，每一次迭代的结果会作为下一次迭代的初始值。（A重复调用B）

1. 说一下三次握手和四次挥手
2. 垂直水平居中的方案有哪些
3. CSS3怎么写一个动画
4.  translate属性介绍一下
    动画名 时间 动画的表现形式
5.  transform 里面除了你说的translate还有什么属性
    rotato  scale


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