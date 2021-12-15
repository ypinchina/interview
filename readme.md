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
    4、  400客户端语法错误 403服务器理解请求，但拒绝该请求  404请求不到资源
    5、 500服务器端问题 503服务器维护或者超载

1. this的指向有几种
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
    函数嵌套函数，内部的函数就是闭包(函数A嵌套函数B，B函数能访问函数A，则函数B则被称为闭包)。
    在 JS 中，闭包存在的意义就是让我们可以间接访问函数内部的变量。
    三、闭包作用
    作用1：隐藏变量，避免全局污染

    作用2：可以读取函数内部的变量

    同时闭包使用不当，优点就变成了缺点：

    缺点1：导致变量不会被垃圾回收机制回收，造成内存消耗

    缺点2：不恰当的使用闭包可能会造成内存泄漏的问题

    这里简单说一下，为什么使用闭包时变量不会被垃圾回收机制收销毁呢，这里需要了解一下JS垃圾回收机制；

    JS规定在一个函数作用域内，程序执行完以后变量就会被销毁，这样可节省内存；

    使用闭包时，按照作用域链的特点，闭包（函数）外面的变量不会被销毁，因为函数会一直被调用，所以一直存在，如果闭包使用过多会造成内存销毁。
12. 什么是event loop
  
    所以 Event Loop 执行顺序如下所示：

    首先执行同步代码，这属于宏任务
    当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
    执行所有微任务
    当执行完所有微任务后，如有必要会渲染页面
    然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 setTimeout 中的回调函数
    微任务包括 process.nextTick ，promise ，MutationObserver。

    宏任务包括 script ， setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering。

    这里很多人会有个误区，认为微任务快于宏任务，其实是错误的。因为宏任务中包括了 script ，浏览器会先执行一个宏任务，接下来有异步代码的话才会先执行微任务。

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
    
    class继承
    首先先来讲下 class，其实在 JS 中并不存在类，class 只是语法糖，本质还是函数。
    class Person {}
    Person instanceof Function // true

    原型链继承

    
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
              var 在全局作用域下声明变量会导致变量挂载在 window 上，其他两者不会
17. 请你说一下vue里面provide和inject两个配置项
vue提供了provide和inject帮助我们解决多层次嵌套嵌套通信问题。
在provide中指定要传递给子孙组件的数据，子孙组件通过inject注入祖父组件传递过来的数据。
provide 和 inject 主要为高阶插件/组件库提供用例,并不推荐直接用于应用程序代码中(官方文档原话)。

主要用法 在父组件中 声明provide配置，return该组件vue的实例
如在elementui中的父组件el-Menu
provide() {
  return {
    'elMenu': this
  }
}
子孙组件el-menu-item接受
inject: ['elMenu']或者 inject: {
  key: {
    from: 'elMenu',
    default: {}
  }
}
key是子孙组件处用的绰号

vue是单项数据流。 如果provide传子孙组件的是基本数据类型属性，则修改父组件的provide里的数据，子孙inject接收不会改变。
如果是一个对象或者实例才行。

明显的缺点
provide/inject 的缺点还是非常明显的：

当多个后代组件同时依赖同一个父组件提供数据时，只要任一组件对数据进行了修改，所有依赖的组件都会受到影响，实际上是增加了耦合度。
任意层级访问使数据追踪变的比较困难，你并不能准确的定位到是哪一个层级对数据进行了改变，当数据出现问题时，尤其是多人协作时，可能会大大增加问题定位的损耗。

18. 什么是并发，什么是并行
  并发是宏观概念，我分别有任务 A 和任务 B，在一段时间内通过任务间的切换完成了这两个任务，这种情况就可以称之为并发。

  并行是微观概念，假设 CPU 中存在两个核心，那么我就可以同时完成任务 A、B。同时完成多个任务的情况就可以称之为并行。

19. Generator 
    Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。
    Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

  执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

  形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。

  总结一下，调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。

ES6 没有规定，function关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。

function * foo(x, y) { ··· }
function *foo(x, y) { ··· }
function* foo(x, y) { ··· }
function*foo(x, y) { ··· }
由于 Generator 函数仍然是普通函数，所以一般的写法是上面的第三种，即星号紧跟在function关键字后面。本书也采用这种写法。

20. Promise 是异步编程的一种解决方案 

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

Promise对象有以下两个特点。

（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。


21. async 函数是什么？一句话，它就是 Generator 函数的语法糖。
    
    一个函数如果加上 async ，那么该函数就会返回一个 Promise

    async function test() {
      return "1"
    }
    console.log(test()) // -> Promise {<resolved>: "1"}
    async 就是将函数返回值使用 Promise.resolve() 包裹了下，和 then 中处理返回值一样，并且 await 只能配套 async 使用

    async function test() {
      let value = await sleep()
    }
    async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已
22. post和get的区别
    
    1.get是获取数据的，而post是提交数据的,只是它们的语义不同而已

    2.GET 用于获取信息，是无副作用的，是幂等的，且可被浏览器缓存， 而POST 用于修改服务器上的数据，有副作用，非幂等，不可被浏览器缓存。

    3.get使用url传参，post一般使用form表单传参，必要时post也可以使用url传参

    4.get提交的数据有长度限制，post请求没有内容长度限制，http协议本身没有限制url及正文长度，对url的限制一般是浏览器和服务器的原因

    5.post请求比get请求较为安全一些，get参数放在url中，但是http请求都是明文传输，post依旧可以被抓包。仅有用https安全一些，
    get请求会将url请求保存在浏览器历史记录里，这样就没post安全
23. background-position: x y    0 0 代表左上角，5px -10px代表向右偏移5px,向上偏移10px
    
24. box-sizing的默认值： content-box(盒子的高度是独立的,就为height)， border-box(盒子的高度是要加入border宽度和padding的值，即盒子内容的高度 =  height - border-width * 2 - padding-top - padding-bottom)
    
25. 箭头函数和普通函数有何不同

    1.箭头函数只能写在匿名函数中，仅是函数表达式的情况。 普通函数则没这个限制，可以是函数声明也可以是函数表达式
    2.箭头函数不能用new来创建构造函数的实例，普通函数可以（因为箭头函数创建的时候程序不会为它创建construct方法，也就是没有构造能力，用完就丢掉了，不像普通函数重复利用，因此也不需要构造函数原型，也就是不会自动生成prototype属性）
    3.箭头函数的this与上级上下文作用域的this保持一致，普通函数中的this，指向调用这个函数的对象
    4.arguments的不同，箭头函数没有arguments对象
    5.箭头函数不能通过bind、call、apply来改变this的值，但依然可以调用这几个方法（只是this的值不受这几个方法控制）
    6.箭头函数没有super()和new.target的绑定。普通函数有
26. http和https
27. http1.0 1.1和2.0
28. tcp和udp
29. 三次握手
30. 四次挥手
31. BFC是什么
32. 父子组件之间的加载过程  
答： 先进入父组件的beforeCreated;  
    然后进入父组件的created;  
    然后进入父组件的beforeMounted;
    然后进入子组件的beforeCreated;
    接着进入子组件的created;  
    然后进入子组件的beforeMounted;  
    然后进入子组件的mounted;  
    最后进入父组件的mounted;
33. vue里面的data为什么返回的是个方法
    vue组件需要高度复用,data是一个函数时，每个组件实例都有自己的作用域，每个实例相互独立，不会相互影响。这都是因为js本身的特性带来的，跟vue本身设计无关。
    
    2.vue组件中的data数据都应该是相互隔离，互不影响的，组件每复用一次，data数据就应该被复制一次，之后，当某一处复用的地方组件内data数据被改变时，其他复用地方组件的data数据不受影响，就需要通过data函数返回一个对象作为组件的状态。

    3.当我们将组件中的data写成一个函数，数据以函数返回值形式定义，这样每复用一次组件，就会返回一份新的data，拥有自己的作用域，类似于给每个组件实例创建一个私有的数据空间，让各个组件实例维护各自的数据。
