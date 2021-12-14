先笔试后面试
 笔试题节选：
 1. background-position 5px -10px代表什么
     background-position: x y    0 0 代表左上角，5px -10px代表向右偏移5px,向上偏移10px
 2. for(var i = 0; i < 4; i++) {
   setTimeout(function() {
     console.log(i)
   }, 1000)
 }
 求输出的值
 3. 如何用css画出半圆环；如何画出三角形
 4. var obj1 = { val: 10 }
 function changeObj (obj) {
   obj.val =  20
   obj = {
     val: 30
   }
   return obj
 }
 var obj2 = changeObj(obj1)
 console.log(obj1)
 console.log(obj2)
 打印什么？
 我写的答案是20 30居然是对了~~

 5. 一共有25匹马，总共有5条赛道，每次每条赛道只能同时赛一匹马，
 问最少几次可以赛出最快的三匹马？（本题我真没思路，白卷）

 面试环节

 问笔试上面第二题。为啥是我选的这个答案。如何该代码使得可以正常输出1,2,3 ;我回答var 改let,面试官问为什么。
 然后我答以为let不会变量提升；他问还有其他方式吗，比如闭包，要我改一下代码写出来，闭包我没复习，所以GG；
 问我第4题为啥是这个思路；
 我尝试着说了一下，
 然后他问 如果
 var obj1 = 10
 function changeObj (obj) {
   obj = 20
   return obj
 }
 let obj2 = changeObj(obj1)
 console.log(obj2)
 console.log(obj1)

我答20，我信誓旦旦的说，obj = 20改变了外面obj1的值 结果错了。。。
呜呜 应该是10，看来我这块知识不行

解答：
function test(person) {
  person.age = 26
  person = {
    name: 'yyy',
    age: 30
  }

  return person
}
const p1 = {
  name: 'yck',
  age: 25
}
const p2 = test(p1)
console.log(p1) // -> {name: 'yck', age: 26}
console.log(p2) // -> {name: 'yyy', age: 30}
对于以上代码，你是否能正确的写出结果呢？接下来让我为你解析一番：

首先，函数传参是传递对象指针的副本
到函数内部修改参数的属性这步，我相信大家都知道，当前 p1 的值也被修改了
但是当我们重新为 person 分配了一个对象时就出现了分歧，请看下图

所以最后 person 拥有了一个新的地址（指针），也就和 p1 没有任何关系了，导致了最终两个变量的值是不相同的。


 问第3题是怎么画出三角形的，圆环如何用一个div画出来；
 问第5题的思路；
 问vue的生命周期，接着问created和mounted有啥区别，我说mounted是在dom渲染时，如果在created时要获取dom节点进行操作是获取不到的；
 他又问如果偏要呢，我说那就$nextTick回调中处理，他说除了这种方式还有别的吗，我说不知道。
 问如何去重数组；
 问如何得出数组最大值, 我说revese方法，他问Math.max方法可以吗？；这里我回答非常有问题，忘记排序了
 问左右两栏布局，比如左定宽，右不定的布局要怎么实现，我说了flex，他还说需要我继续说有其他的方式吗？
 问es6.es7新特性，我说有个includes方法，他问是怎么用的，我说是对数组用；
 问性能优化有多少种；
 问有部署项目的经历吗；
 问上家公司规模，以及问上家公司开发人员项目组成配比；
