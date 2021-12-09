本项目主要存放实际的一些面试经历题目 某些会有相应的事后解答与自我总结
// 

汇总面试的常见问题与解答   八八八八八八八八八八股文（卷上天了,人麻了）
1.vue2与vue3的区别  
答 1.实现双向数据绑定的方式不一样，vue2使用es5的Object.definePerporty，vue3使用es6的Proxy对象  
  2.vue3主要依赖composition API函数式编程的写法与vue2不一样。vue3的写法更方便后期代码的维护
  3.对Typescript的支持不一样，vue3是使用typescript写的，生态上更支持typescript
  4.生命周期的名称不一样
  5.vue3新增了一些新特性，如组件template标签内可以写多个根元素标签(fragment),teleport传送  

2.setTimeout底层代码实际执行了什么逻辑  
答：第二个参数的毫秒数过了之后，将第一个参数内的回调方法放到任务队列等待执行  

3.写页面的时候，加入异步请求，放在哪一个生命周期里面  
答：created和mounted都可以放，created会稍微快一点，但是created可能会被打断，异步请求会重新多次渲染，可以会有闪烁的问题。如果要对真实DOM操作需要在mounted。  

1. url输入一个网址之后，发生了什么
答： 
  1、首先浏览器根据输入的网址进行解析并DNS寻址找到其IP地址
  2、然后跟服务器端三次握手建立连接
  3、服务器将浏览器请求的资源返回
  4、浏览器根据下载的.html文件构建DOM TREE
  5、浏览器根据下载的.css文件构建 CSS DOM TREE 
  6、浏览器整合DOM TREE 与CSS DOM TREE 构建render Tree,并渲染,直至渲染完成。

2. http状态码
答：
1、 101 客户端需要继续发送剩余请求
2、 200 成功
3、 301 永久重定向转移，url转移到别的地址 302暂时重定向转移 304缓存，服务器已经执行了get请求，文件未发生变化
4.  400客户端语法错误 403服务器理解请求，但拒绝该请求  404请求不到资源
5、 500服务器端问题 503服务器维护或者超载

6. 箭头函数有什么好处与不同
答： 
1、书写简洁
2、不会改变this的指向

7. this的指向有几种
  答：
  1. 严格模式下 this的指向为undefined
  2. 非严格模式下全局作用域指向window
  3. 箭头函数的this与上级作用域this指向保持一致
  4. 构造函数内部的this，绑定指向new创建的实例
  5. 普通函数内部的this, 指向调用这个函数的对象
  6. setTimeout的回调函数如果不是箭头函数的写法，该回调函数this的指向为window
  7. bind,call,apply的this指向第一个参数，如果没有则指向window

8. 浏览器缓存运行机制
9.  强缓存与协商缓存的区别
10. vue路由有几种模式，有什么区别
    有两种模式，一种是hash模式，一种是history模式
11. 什么是闭包
    函数嵌套函数，内部的函数就是闭包。
12. 什么是event loop

13. js的数据类型

    js的数据类型包涵7种基本数据类型： null undefined Number string Symbol Boolean BigInt

    以及一种复杂数据类型： Object (Object下面有Function ,Array, Date, regxp)

    使用 typeof可以甄别出null意外的基本数据类型，typeof null 为Object类型

    甄别复杂数据类型的Array Function使用fun instanceof Function 为true来甄别

    [] == null = false 为 true  强制类型转换了
    在 JS 中，除了原始类型那么其他的都是对象类型了。对象类型和原始类型不同的是，原始类型存储的是值，对象类型存储的是地址（指针）。当你创建了一个对象类型的时候，计算机会在内存中帮我们开辟一个空间来存放值，但是我们需要找到这个空间，这个空间会拥有一个地址（指针）。
   typeof 对于对象来说，除了函数都会显示 object，所以说 typeof 并不能准确判断变量到底是什么类型

    typeof [] // 'object'
    typeof {} // 'object'
    typeof console.log // 'function'

14. js的继承方式
15. Vue数据传递方式
16. let var const的区别
    从变量声明提升这块： var允许变量提升，（使用 var 声明的变量会被提升到作用域的顶部），后两者在变量声明之前使用的话，
    首先报错的原因是因为存在暂时性死区，我们不能在声明前就使用变量，这也是 let 和 const 优于 var 的一点。然后这里你认为的提升和 var 的提升是有区别的，虽然变量在编译的环节中被告知在这块作用域中可以访问，但是访问是受限制的。
    从变量块级作用域这方面： var声明的变量没有块级作用域的概念，后两者有
    从重复声明变量这块: var可以重复声明同名变量，后两者禁止
    从是否可以重新给变量赋值：const不允许，另外两者可以
    首先在全局作用域下使用 let 和 const 声明变量，变量并不会被挂载到 window 上，这一点就和 var 声明有了区别。
    let b = 1
    const c = 1
    console.log(window.b) // undefined
    console.log(window. c) // undefined

    额外总结：函数提升优先于变量提升，函数提升会把整个函数挪到作用域顶部，变量提升只会把声明挪到作用域顶部
              var 存在提升，我们能在声明之前使用。let、const 因为暂时性死区的原因，不能在声明前使用