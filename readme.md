本项目主要存放实际的一些面试经历题目 某些会有相应的事后解答与自我总结  



// 全部背完即可解决面试八股文部分 手写实现和leetcode仍需努力

汇总面试的常见问题与解答   八八八八八八八八八八股文（卷上天了,人麻了）
1. vue2与vue3的区别 
    
答 1.实现双向数据绑定的方式不一样，vue2使用es5的Object.definePerporty，vue3使用es6的Proxy对象  
  2.vue3主要依赖composition API函数式编程的写法与vue2不一样。vue3的写法更方便后期代码的维护
  3.对Typescript的支持不一样，vue3是使用typescript写的，生态上更支持typescript
  4.生命周期的名称不一样
  5.vue3新增了一些新特性，如组件template标签内可以写多个根元素标签(fragment),teleport传送  

1. setTimeout底层代码实际执行了什么逻辑  
答：第二个参数的毫秒数过了之后，将第一个参数内的回调方法放到任务队列等待执行  

3. 写页面的时候，加入异步请求，放在哪一个生命周期里面  
答：created和mounted都可以放，created会稍微快一点，但是created可能会被打断，异步请求会重新多次渲染，可以会有闪烁的问题。如果要对真实DOM操作需要在mounted。  

4. url输入一个网址之后，发生了什么
答： 
  1、首先浏览器根据输入的网址进行解析并DNS寻址找到其IP地址
  2、然后跟服务器端三次握手建立连接
  3、服务器将浏览器请求的资源返回
  4、浏览器根据下载的.html文件构建DOM TREE
  5、浏览器根据下载的.css文件构建 CSS OM TREE 
  6、浏览器整合DOM TREE 与CSS OM TREE 构建render Tree,并渲染,直至渲染完成。
  解析 html 以构建 dom 树 -> 构建 render 树->布局 render 树(layout/ reflow 回流)->绘制 render树(repaint重绘)
  回流：根据生成的渲染树，进行回流，得到节点的几何信息（位置，大小）
  重绘：根据渲染树以及回流得到的几何信息，得到节点的绝对像素。

5. http状态码
答：
    1、 101 客户端需要继续发送剩余请求
    2、 200 成功
    3、 301 永久重定向转移，url转移到别的地址 302暂时重定向转移 304缓存，服务器已经执行了get请求，文件未发生变化
    4、 400客户端语法错误 401没有访问权限 403服务器理解请求，但拒绝该请求  404请求不到资源 405 请求方法有问题
    5、 500服务器端问题 503服务器维护或者超载

6. this的指向有几种
  答：
     1. 严格模式下 this的指向为undefined
     2. 非严格模式下全局作用域指向window
     3. 箭头函数的this与上级作用域this指向保持一致
     4. 构造函数内部的this，绑定指向new创建的实例
     5. 普通函数内部的this, 指向调用这个函数的对象
     6. setTimeout的回调函数如果不是箭头函数的写法，该回调函数this的指向为window
     7. bind,call,apply的this指向第一个参数，如果没有则指向window

7. 浏览器缓存运行机制(304过程)
   
    a. 浏览器请求资源时首先命中资源的Expires 和 Cache-Control，Expires 受限于本地时间，如果修改了本地时间，可能会造成缓存失效，可以通过Cache-control: max-age指定最大生命周期，状态仍然返回200，但不会请求数据，在浏览器中能明显看到from cache字样。

    b. 强缓存失效，进入协商缓存阶段，首先验证ETag ETag可以保证每一个资源是唯一的，资源变化都会导致ETag变化。服务器根据客户端上送的If-None-Match值来判断是否命中缓存。

    c. 协商缓存Last-Modify/If-Modify-Since阶段，客户端第一次请求资源时，服务服返回的header中会加上Last-Modify，Last-modify是一个时间标识该资源的最后修改时间。再次请求该资源时，request的请求头中会包含If-Modify-Since，该值为缓存之前返回的Last-Modify。服务器收到If-Modify-Since后，根据资源的最后修改时间判断是否命中缓存。


8.  强缓存与协商缓存的区别
  
    【强缓存】
    强缓存是利用 http 头中的 Expires 和 Cache-Control 两个字段来控制的。强缓存中，当请求再次发出时，浏览器会根据其中的 expires 和 cache-control 判断目标资源是否“命中”强缓存，若命中则直接从缓存中获取资源，不会再与服务端发生通信。
    expires 是一个时间戳，二次请求我们试图向服务器请求资源，浏览器就会先对比本地时间和 expires 的时间戳，如果本地时间小于 expires 设定的过期时间，那么就直接去缓存中取这个资源。
    它最大的问题在于对“本地时间”有很大的依赖。如果服务端和客户端的时间设置可能不同，或者我直接手动去把客户端的时间改掉，那么 expires 将无法达到我们的预期。所以我们有第二种方法Cache-Control。
    Cache-Control 是一个时间长度，我们通过 max-age 来控制资源的有效期，它意味着该资源在时间长度以内都是有效的，完美地规避了时间戳带来的潜在问题。它的优先级更高，当两者同时出现的时候我们以Cache-Control为准。

    【协商缓存】
    协商缓存依赖于服务端与浏览器之间的通信。协商缓存机制下，浏览器需要向服务器去询问缓存的相关信息，进而判断是重新发起请求、下载完整的响应，还是从本地获取缓存的资源。如果服务端提示缓存资源未改动（Not Modified），资源会被重定向到浏览器缓存，对应状态码是304。

    【启发式缓存】
    如果响应中未显示Expires，Cache-Control：max-age或Cache-Control：s-maxage，并且响应中不包含其他有关缓存的限制，缓存可以使用启发式方法计算新鲜度寿命。通常会根据响应头中的2个时间字段 Date 减去 Last-Modified 值的 10% 作为缓存时间。


1.  vue路由有几种模式，有什么区别

    hash模式：通过#号后面的内容的更改，触发hashchange事件，实现路由切换
    history模式：通过pushState和replaceState切换url，触发popstate事件，实现路由切换，需要后端配合


2.  js的数据类型

    js的数据类型包涵7种基本数据类型： null undefined Number string Symbol Boolean BigInt

    以及一种复杂数据类型： Object (Object下面有Function ,Array, Date, regxp)

    使用 typeof可以甄别出null以外的基本数据类型，typeof null 为Object类型（是个老版本遗留下来的bug）,
    typeof console.log == 'function' 亦可甄别函数

    甄别复杂数据类型的Array Function使用fun instanceof Function 为true来甄别

    [] == null = false 为 true  强制类型转换了
    在 JS 中，除了原始类型那么其他的都是对象类型了。对象类型和原始类型不同的是，原始类型存储的是值，对象类型存储的是地址（指针）。当你创建了一个对象类型的时候，计算机会在内存中帮我们开辟一个空间来存放值，但是我们需要找到这个空间，这个空间会拥有一个地址（指针）。
   typeof 对于对象来说，除了函数都会显示 object，所以说 typeof 并不能准确判断变量到底是什么类型

    typeof [] // 'object'
    typeof {} // 'object'
    typeof console.log // 'function'

3.  js的继承方式
    
    class继承
    首先先来讲下 class，其实在 JS 中并不存在类，class 只是语法糖，本质还是函数。
    class Person {}
    Person instanceof Function // true

    原型链继承,分为组合继承和寄生组合继承

    什么是原型链？什么是原型链继承

    
4.  Vue数据传递方式
    1.父组件给子组件传递数据，使用props在子组件接收
    2.子组件给父组件传递数据，使用this.$emit的方式
    3.兄弟组件之间使用中央集成总线的方式传递数据，
    4.在vue2.2版本之后，新增了provide和inject。用于父组件给子或子孙组件传递数据
    5.使用Vuex
    6.$children $parents

5.  let var const的区别
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

6.  请你说一下vue里面provide和inject两个配置项
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
    
    1. get是获取数据的，而post是提交数据的,只是它们的语义不同而已

    2. GET 用于获取信息，是无副作用的，是幂等的，且可被浏览器缓存， 而POST 用于修改服务器上的数据，有副作用，非幂等，不可被浏览器缓存。

    3. get使用url传参，post一般使用form表单传参，必要时post也可以使用url传参

    4. get提交的数据有长度限制，post请求没有内容长度限制，http协议本身没有限制url及正文长度，对url的限制一般是浏览器和服务器的原因

    5. post请求比get请求较为安全一些，get参数放在url中，但是http请求都是明文传输，post依旧可以被抓包。仅有用https安全一些，get请求会将url请求保存在浏览器历史记录里，这样就没post安全
    
    6. GET请求只能进行url编码，而POST支持多种编码方式

23. background-position: x y    0 0 代表左上角，5px -10px代表向右偏移5px,向上偏移10px
    
24. box-sizing的默认值： content-box(盒子的高度是独立的,就为height)， border-box(盒子的高度是要加入border宽度和padding的值，即盒子内容的高度 =  height - border-width * 2 - padding-top - padding-bottom)
    
25. 箭头函数和普通函数有何不同

    1.箭头函数只能写在匿名函数中，仅是函数表达式的情况。 普通函数则没这个限制，可以是函数声明也可以是函数表达式
    2.箭头函数不能用new来创建构造函数的实例，普通函数可以（因为箭头函数创建的时候程序不会为它创建construct方法，也就是没有构造能力，用完就丢掉了，不像普通函数重复利用，因此也不需要构造函数原型，也就是不会自动生成prototype属性）
    3.箭头函数的this与上级上下文作用域的this保持一致，普通函数中的this，指向调用这个函数的对象
    4.arguments的不同，箭头函数没有arguments对象
    5.箭头函数不能通过bind、call、apply来改变this的值，但依然可以调用这几个方法（只是this的值不受这几个方法控制）
    6.箭头函数没有super()和new.target的绑定。普通函数有
    7.综合箭头函数没有.protypeto 属性
    8.箭头函数不能当做Generator函数,不能使用yield关键字

26. http和https
    
    HTTP：是互联网上应用最为广泛的一种网络协议，是一个客户端和服务器端请求和应答的标准（TCP），用于从WWW服务器传输超文本到本地浏览器的传输协议，它可以使浏览器更加高效，使网络传输减少。

    　　HTTPS：是以安全为目标的HTTP通道，简单讲是HTTP的安全版，即HTTP下加入SSL层，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL。

    HTTP协议传输的数据都是未加密的，也就是明文的，因此使用HTTP协议传输隐私信息非常不安全，为了保证这些隐私数据能加密传输，于是网景公司设计了SSL（Secure Sockets Layer）协议用于对HTTP协议传输的数据进行加密，从而就诞生了HTTPS。简单来说，HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，要比http协议安全。

    　　HTTPS和HTTP的区别主要如下：

    　　1、https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。

    　　2、http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。

    　　3、http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。

    　　4、http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。

27. http 0.9 http1.0 1.1和2.0 3.0

    1.1是keep-alive长连接

    2.0 多路复用 header压缩 二进制传输

    3.0 使用QUIC协议传输

28. tcp和udp
    
    TCP是面向链接的，而UDP是面向无连接的。
    TCP仅支持单播传输，UDP 提供了单播，多播，广播的功能。
    TCP的三次握手保证了连接的可靠性; UDP是无连接的、不可靠的一种数据传输协议，首先不可靠性体现在无连接上，通信都不需要建立连接，对接收到的数据也不发送确认信号，发送端不知道数据是否会正确接收。
    UDP的头部开销比TCP的更小，数据传输速率更高，实时性更好。

29. 三次握手
    
      1. 第一次握手：建立连接时，客户端发送syn包（syn=j）到服务器，并进入SYN_SENT状态，等待服务器确认；SYN：同步序列编号（Synchronize Sequence Numbers）。

      2. 第二次握手：服务器收到syn包并确认客户的SYN（ack=j+1），同时也发送一个自己的SYN包（syn=k），即SYN+ACK包，此时服务器进入SYN_RECV状态；

      3. 第三次握手：客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK(ack=k+1），此包发送完毕，客户端和服务器进入ESTABLISHED（TCP连接成功）状态，完成三次握手。

30. 四次挥手

31. 父子组件之间的加载过程  
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

34. flex是什么？  
    flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性

    flex 1是什么含义？

    flex属性 是 flex-grow、flex-shrink、flex-basis三个属性的缩写。

    推荐使用此简写属性，而不是单独写这三个属性。

    

    flex-grow：定义项目的的放大比例；

            默认为0，即 即使存在剩余空间，也不会放大；
          所有项目的flex-grow为1：等分剩余空间（自动放大占位）；
            flex-grow为n的项目，占据的空间（放大的比例）是flex-grow为1的n倍。
            

    flex-shrink：定义项目的缩小比例；

            默认为1，即 如果空间不足，该项目将缩小；
            所有项目的flex-shrink为1：当空间不足时，缩小的比例相同；
            flex-shrink为0：空间不足时，该项目不会缩小；
            flex-shrink为n的项目，空间不足时缩小的比例是flex-shrink为1的n倍。
    

    flex-basis： 定义在分配多余空间之前，项目占据的主轴空间（main size），浏览器根据此属性计算主轴是否有多余空间，

            默认值为auto，即 项目原本大小；
            设置后项目将占据固定空间。

35. arguments
    在调用函数时，浏览器每次都会传递两个隐含的参数
    1.函数的上下文对象this
    2.封装实参的对象arguments
      - arguments是一个类数组对象。他可以通过索引来操作数据，也可以获取长度
      - 在调用函数时，我们所攒底的实参都会在arguments中保存
      - arguments.length可以用来获取实参的长度
      - 即使不定义形参，也可以通过arguments来使用实参，只不过比较麻烦
        arguments[0]表示第一个实参
        arguments[1]表示第二个实参。。。
      - arguments里面有一个属性叫做callee
        这个属性对应一个函数对象，就是当前调用的arguments所在对象

36.  什么是闭包
    
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

36. 垃圾回收机制
    
    栈内存的回收：
    栈内存调用栈上下文切换后就被回收，比较简单。
    堆内存的回收：
    V8的堆内存分为新生代内存和老生代内存，新生代内存是临时分配的内存，存在时间短，老生代内存存在时间长。
    新生代内存回收机制：

    新生代内存容量小，64位系统下仅有32M。新生代内存分为From、To两部分，进行垃圾回收时，先扫描From，将非存活对象回收，将存活对象顺序复制到To中，之后调换From/To，等待下一次回收

    老生代内存回收机制

    晋升：如果新生代的变量经过多次回收依然存在，那么就会被放入老生代内存中
    标记清除：老生代内存会先遍历所有对象并打上标记，然后对正在使用或被强引用的对象取消标记，回收被标记的对象
    整理内存碎片：把对象挪到内存的一端

37. 什么是event loop
    
    同步和异步任务分别进入不同的执行环境，同步的进入主线程，即主执行栈，异步的进入任务队列。主线程内的任务执行完毕为空，会去任务队列读取对应的任务，推入主线程执行。 上述过程的不断重复就是我们说的 Event Loop (事件循环)。
  
    所以 Event Loop 执行顺序如下所示：

    首先执行同步代码，这属于宏任务
    当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
    执行所有微任务
    当执行完所有微任务后，如有必要会渲染页面
    然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 setTimeout 中的回调函数
    微任务包括 process.nextTick ，promise ，MutationObserver。

    宏任务包括 script ， setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering。

    这里很多人会有个误区，认为微任务快于宏任务，其实是错误的。因为宏任务中包括了 script ，浏览器会先执行一个宏任务，接下来有异步代码的话才会先执行微任务。

38. call, apply, bind的作用和区别
    
    call与apply都属于Function.prototype的一个方法，所以每个function实例都有call、apply属性；

    作用
    call（）方法和apply（）方法的作用相同：改变this指向。

    区别
    他们的区别在于接收参数的方式不同：

    call（）：第一个参数是this值没有变化，变化的是其余参数都直接传递给函数。在使用call（）方法时，传递给函数的参数必须逐个列举出来。

    apply（）：传递给函数的是参数数组

    apply 转化的是内置的 call，并非 Function.prototype.call，apply 最后还是转化成 call 来执行的，call 要更快毫无疑问

    bind(), bind不会马上调用 可以存在返回的对象里，合适的时候在调用，call和apply都是马上调用，bind的参数列表和call一样，都是bind(this, a , b , c.....)

39. new()一个新对象，底层做了什么
    
   new一个函数，JS编译器会做的四件事情：
                                              
    1.创建一个新的空的对象
      var obj = {}
    2.将构造函数的作用域赋给新对象（因此this就指向了这个新对象）
      obj.__proto__ = OBJECT.prototype
    3.将this绑定到这个实例对象，并执行构造函数中的代码（为这个新对象添加属性）
      const r = OBJECT.apply(obj, arguments) 
    4.如果这个函数有返回值，则返回；否则，就会默认返回新对象 
      return r instanceof Object ? r : obj

40. 事件传播机制
    分三个阶段
    1. 捕获阶段，由window往里到事件注册对象处，遇到注册的捕获事件会触发
    2. 事件目标阶段， 传播到事件触发处时触发注册的事件
    3. 冒泡阶段， 从事件触发处往 window 传播，遇到注册的冒泡事件会触发
  一般事件的触发都是按照以上的顺序触发，但是有特例： 如同一个dom同时注册了捕获和冒泡，
  那这个dom的事件触发顺序将按照它注册的顺序执行。

  使用addEventListener来给dom注册绑定事件，dom.addEventListener('click', function() {}, false)
  第三个参数可以填写布尔值(可选)或对象（options， 可选），如果是布尔值，此参数代表useCapter  (意思是使用'俘虏，捕获')
  false是默认，为冒泡，true是捕获。如果第三个参数为对象，则对象内有三个属性，{
    capture: 布尔值（是否捕获）,
    once: 布尔值（事件是否只触发一次就移除）,默认为false
    passive:  ('消极的，被动的') 布尔值，设置为true时，表示 listener 永远不会调用 preventDefault() （阻止浏览器默认事件，比如点击a标签触发浏览器跳转）
  }
  
  事件代理：
  如果ul下面很多动态生成的li，此时比起把每一个li绑定一个点击事件更耗费内存和不能给动态生成li绑定事件这种做法，更好的是利用事件的冒泡 给父元素ul增加绑定事件获取e.target的子元素的内容更好，节省了内存，并且不需要给子元素注销绑定的事件
  

  41. 跨域：
    什么是跨域： 
    因为浏览器出于安全考虑，有同源策略。也就是说，如果协议、域名或者端口有一个不同就是跨域，Ajax 请求会失败。

    那么是出于什么安全考虑才会引入这种机制呢？ 其实主要是用来防止 CSRF 攻击的。简单点说，CSRF 攻击是利用用户的登录态发起恶意请求。

    也就是说，没有同源策略的情况下，A 网站可以被任意其他来源的 Ajax 访问到内容。如果你当前 A 网站还存在登录态，那么对方就可以通过 Ajax 获得你的任何信息。当然跨域并不能完全阻止 CSRF。


    跨域解决方案：
    1.很早以前 大学那会儿有了解过使用iframe方案来解决跨域

    2.jsonp解决跨域

      JSONP 的原理很简单，就是利用 "script" 标签没有跨域限制的漏洞。通过 "script" 标签指向一个需要访问的地址并提供一个回调函数来接收数据当需要通讯时。

    'script src="http://domain/api?param1=a&param2=b&callback=jsonp"  /script'
    script
        function jsonp(data) {
          console.log(data)
      }
    /script    
    JSONP 使用简单且兼容性不错，但是只限于 get 请求。

    3.cors 后端服务器放行解决跨域
      服务端设置 Access-Control-Allow-Origin 就可以开启 CORS。 
      该属性表示哪些域名可以访问资源，如果设置通配符（*）则表示所有网站都可以访问资源。
      以前自己用node后台写过一个博客管理系统的全栈项目里面使用ngixn在配置文件config里面修改过
    4.proxy代理
      vue.config.js里配置proxy代理，利用webpack-dev-server 起本地前端的服务，因此 proxyTable 实际上是将请求发给自己的服务器，再由服务器转发给后台服务器，做了一层代理。vue的proxyTable用的是http-proxy-middleware中间件, 因此不会出现跨域问题。
    5.window.postMessage的安全性

  42. 项目中遇到难解决的问题
    在杭州那个主要的项目中，需要实现文件分享，在上传组件中有个批量上传看到各个文件的上传进度条的功能。
    因为使用input type= file上传时可以直接拿到对于file对象，我就在每个file对象中加入progress属性值，
    然后上传期间xmlHttpRequest对象可以算出上传的百分比的值我就重新写到file对象的progress中，但是发现
    没有更新进度条，打印出来的值也是对的。然后用了很多方法比如加$set等。还是无济于事。 这个问题困扰了接近两周，去网上找了各种答案，期间去处理别的问题去了。后来换个很多种搜索博客问题的方式，才找到一篇博客，
    他也是有过类似的问题。原来 files 是 FileList 类型，file 是 File 类型。而普通的 obj 是 Object 类型。

    Vue 的数据更新利用的是 Object.defineProperty 的 getter setter 函数来实现的，而 Vue 默认没有对 File 对象设置 getter setter, 因此用 File 对象不会自动更新。

    解决办法，就是用普通对象保存 file 对象里需要的信息，然后用来构造视图数据。或者自己手动设置 File 对象的 setter，也可以自动更新
    
  43. 浏览器存储
    
    针对cookie、localStorage、sessionStorage,indexDB
    对于与服务端通信这方面： 
      只有cookie有对服务端的通信，每次都会携带在 header 中，对于请求性能影响，其他三者不会。导致使用cookies会占用一部分带宽
    对于存储量大小来说：
      cookie为4KB，  两个storage为5M, indexDB为无限
    对于数据生命周期：
      cookies一般由服务器生成，可以设置过期时间, localStorage和indexDB永久存在除非手动清除，sessionStorage是关闭页面就清除

    cookie, session, token

     cookie是一开始用于给浏览器和服务器通讯的，因为http是无状态的，需要知道哪些用户在登录，将用户名密码保存在浏览器，以便下次可以不输入直接登录，所以需要session保证cookie存储账号密码的安全。只需要cookie保存对应账号密码的sessionId即可，而
     session Id存储在服务器。但是久而久之服务器存储了太多太多的sessionId,如果服务器突然挂了，就出问题了，如果多个服务器的话又需要各个服务器都要存储所有的session,所以发展到现在是使用JWT(java web token)。 服务器用jwt签名生成的密文发给浏览器，浏览器用cookie或者storage的方式保存。有人会质疑存在用户的token的安全性，jwt是由三部分组成的，header,payload,signature。header部分会声明用什么算法加密，payload存储一些信息比如有效期，然后这两者经过base64编译，然后这两段base64经过header的签名算法得到signature，获得完整jwt

    Service Worker
      Service Worker 是运行在浏览器背后的独立线程，一般可以用来实现缓存功能。
      使用 Service Worker的话，传输协议必须为 HTTPS。因为 Service Worker 中涉及到请求拦截，所以必须使用 HTTPS 协议来保障安全。F12中Application中能看到Service Worker
  
  44. vue中的mixin和mixins有什么区别
    mixin 用于全局混入，会影响到每个组件实例，通常插件都是这样做初始化的。

    Vue.mixin({
        beforeCreate() {
            // ...逻辑
            // 这种方式会影响到每个组件的 beforeCreate 钩子函数
        }
    })
    虽然文档不建议我们在应用中直接使用 mixin，但是如果不滥用的话也是很有帮助的，比如可以全局混入封装好的 ajax 或者一些工具函数等等。

    import 待混入的对象 from ../待混入的对象.js
    mixins是选择性混入 在组件中写 mixins: [待混入的对象]

    1.组件的data，methods优先级高于mixins里面的data,methods
    2.生命周期函数先执行mixins里的再执行组件里的
    Mixins：则是在引入组件之后与组件中的对象和方法进行合并，相当于扩展了父组件的对象与方法，可以理解为形成了一个新的组件。
  
  45. vue3的一些笔记：
    
    setup()在vue实例完全初始化之前执行，取不到this实例

    1.ref和react方法 都能把非双向数据绑定的数据变双向数据绑定的数据，都是利用proxy对象转成双向数据绑定的对象proxy((key, value: ''))。两者区别是ref作用于基本数据类型，后者作用于复杂数据类型，比如object

    为了取响应式对象里的key-value 普通解构出来的属性是没有响应式的，即使用react对象包裹， 需要使用toRefs包裹才可以赋予解构的响应式。即在原来的proxy({name: 'Yip'})前 套上 toRefs({name: proxy({name: 'Yip})})

    2.toRefs 与 toRef的区别

    toRefs 用于将响应式对象转换为结果对象，其中结果对象的每个属性都是指向原始对象相应属性的ref。常用于es6的解构赋值操作，因为在对一个响应式对象直接解构时解构后的数据将不再有响应式，而使用toRefs可以方便解决这一问题。

    ·获取数据值的时候需要加.value
    ·toRefs后的ref数据不是原始数据的拷贝，而是引用，改变结果数据的值也会同时改变原始数据
    作用其实和 toRef 类似，只不过 toRef 是一个个手动赋值，而    ·toRefs 是自动赋值。

    3.watch和watchEffect的区别
    ·watch在生命周期开始第一次不执行（watch的惰性）；watch对象需要传待监听的对象的值；能获取新旧值
    ·watchEffect立即执行；传参只传入回调函数；不能获取到旧的值
  
  46. vue的生命周期
    进入beforeCreate 时，是获取不到 props 或者 data 中的数据的，因为这些数据的初始化都在 initState (源码)中。
    进入created 钩子，可以获取props和data里数据，组件还没被挂载，所以是看不到的
    进入beforeMount，开始构建Virtual DOM,
    进入mounted,将 Virtual DOM 渲染为真实 DOM 并且渲染数据

    beforeUpdate和updated()，是更新前和更新后的钩子

    还有两个特殊的生命周期钩子： activated和 deactivated   ，用 keep-alive标签 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 deactivated 钩子函数，命中缓存渲染后会执行 actived 钩子函数。

  47. keep-alive 组件有什么作用
    如果你需要在组件切换的时候，保存一些组件的状态防止多次渲染，就可以使用 keep-alive 组件包裹需要保存的组件。
    <keep-alive :include="whiteList" :exclude="blackList" :max="amount">
     <component :is="currentComponent"></component>
    </keep-alive>
    include定义缓存白名单，keep-alive会缓存命中的组件；exclude定义缓存黑名单，被命中的组件将不会被缓存；max定义缓存组件上限，超出上限使用LRU的策略置换缓存数据。

  48. callee和caller
       callee译名被呼叫者，caller译名呼叫者
      callee是arguments的属性，用于获取当前的方法，可以用于递归调用时方法名被修改的情况;也可以获取当前
      匿名方法
        function fibonacci (n) {
          if (n === 1 || n === 2) {
            return 1
          } else if (n < 1) {
            return '请传入非0自然数'
          } else {
            return arguments.callee(n - 1) + arguments.callee(n - 2)
          }
        }
        fibonacci(7)
        caller写在方法里，用于得到是谁在调用本方法,如果是全局调用此方法 'functionName'.caller返回null
        function b() {
          a()
          function a() {
            console.log(a.caller)
            // 亦可写作 console.log(arguments.callee.caller)
          }
        }
        b() // 输出function b() {}

  49.  0.1 + 0.2 = ? 结果如何，为什么，如何纠正?
    
      在两数相加时，会先转换成二进制，0.1 和 0.2 转换成二进制的时候尾数会发生无限循环，然后进行对阶运算，JS 引擎对二进制进行截断，所以造成精度丢失。

      javascript是使用 IEEE 754双精度的格式，双精度小数转二级制会丢失精度 计算完再转回十进制得到的结果
      和理论值不同所以会造成这个问题，只要是使用IEEE 754规范的语言都会有这个问题，比如python java go,

      0.1 = 0.10000000000000002
      0.2 = 0.20000000000000002
      0.1 + 0.2 = 0.30000000000000004 != 0.3
      parseFloat((0.1 + 0.2).toFixed(10)) === 0.3 // true

  50. webpack的loader是什么plugins是什么，两者有什么区别？  
    
    Loader 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果。

    因为 Webpack 只认识 JavaScript，所以 Loader 就成了翻译官，对其他类型的资源进行转译的预处理工作。

    Plugin 就是插件，基于事件流框架 Tapable，插件可以扩展 Webpack 的功能，在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

    Loader 在 module.rules 中配置，作为模块的解析规则，类型为数组。每一项都是一个 Object，内部包含了 test(类型文件)、loader、options (参数)等属性。
    
    Plugin 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。


  51. 优先级： v-once > v-for > v-if
    
  52. css 优先级是怎么计算的
    
    第一优先级：!important 会覆盖页面内任何位置的元素样式
    1.内联样式，如 style="color: green"，权值为 1000
    2.ID 选择器，如#app，权值为 0100
    3.类、伪类、属性选择器，如.foo, :first-child, div[class="foo"]，权值为 0010
    4.标签、伪元素选择器，如 div::first-line，权值为 0001
    5.通配符、子类选择器、兄弟选择器，如*, >, +，权值为 0000
    6.继承的样式没有权值

 ## 性能优化

  1.  什么是重绘和回流，阻止的方法有什么
    
    1. 解析HTML，生成DOM树，解析CSS，生成CSS OM（对象模型）树
    2. 将DOM树和CSSOM树结合，生成渲染树(Render Tree)
    3. Layout(回流):根据生成的渲染树，进行回流(Layout)，得到节点的几何信息（位置，大小）
    4. Painting(重绘):根据渲染树以及回流得到的几何信息，得到节点的绝对像素
    5. Display:将像素发送给GPU，展示在页面上。

    回流：
    触发条件：
    当我们对 DOM 结构的修改引发 DOM 几何尺寸变化的时候，会发生回流的过程。
    例如以下操作会触发回流：


    一个 DOM 元素的几何属性变化，常见的几何属性有width、height、padding、margin、left、top、border 等等, 这个很好理解。


    使 DOM 节点发生增减或者移动。


    读写 offset族、scroll族和client族属性的时候，浏览器为了获取这些值，需要进行回流操作。


    调用 window.getComputedStyle 方法。


    回流过程：由于DOM的结构发生了改变，所以需要从生成DOM这一步开始，重新经过样式计算、生成布局树、建立图层树、再到生成绘制列表以及之后的显示器显示这整一个渲染过程走一遍，开销是非常大的。
    重绘：
    触发条件：
    当 DOM 的修改导致了样式的变化，并且没有影响几何属性的时候，会导致重绘(repaint)。
    重绘过程：由于没有导致 DOM 几何属性的变化，因此元素的位置信息不需要更新，所以当发生重绘的时候，会跳过生存布局树和建立图层树的阶段，直接到生成绘制列表，然后继续进行分块、生成位图等后面一系列操作。
    如何避免触发回流和重绘：

    避免频繁使用 style，而是采用修改class的方式。
    将动画效果应用到position属性为absolute或fixed的元素上。
    也可以先为元素设置display: none，操作结束后再把它显示出来。因为在display属性为none的元素上进行的DOM操作不会引发回流和重绘
    使用createDocumentFragment进行批量的 DOM 操作。
    对于 resize、scroll 等进行防抖/节流处理。
    避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
    利用 CSS3 的transform、opacity、filter这些属性可以实现合成的效果，也就是GPU加速。

  长列表无限加载

    1.列表懒加载，每次下拉再加载剩余的列表。一开始是真实列表10条，需要知道firstIndex, 比如前十是0-9 ，下次下拉firstIndex
    为10，加载量可以用另外的参数。缺点：长时间加载列表还是会卡顿，还是会过多dom节点。
    
    2.react-virtualized 
    ![avatar](https://upload-images.jianshu.io/upload_images/20409039-c52edc50c6280b5b.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)
    
  1.  什么是进程，什么是线程
    进程是资源分配的最小单位，线程是CPU调度的最小单位

  2.  为什么直接对对象新增和删除属性vue会监听不到

  3.  加密算法有了解吗，说一下非对称加密和对称加密

    （1） 对称加密加密与解密使用的是同样的密钥，所以速度快，但由于需要将密钥在网络传输，所以安全性不高。
    （2） 非对称加密使用了一对密钥，公钥与私钥，所以安全性高，但加密与解密速度慢。
    （3） 解决的办法是将对称加密的密钥使用非对称加密的公钥进行加密，然后发送出去，接收方使用私钥进行解密得到对称加密的密钥，然后双方可以使用对称加密来进行沟通。

    对称加密：

    优点：算法简单，加密解密容易，效率高，执行快。

    缺点：相对来说不算特别安全，只有一把钥匙，密文如果被拦截，且密钥也被劫持，那么，信息很容易被破译。

    非对称加密：

    优点：安全，即使密文被拦截、公钥被获取，但是无法获取到私钥，也就无法破译密文。作为接收方，务必要保管好自己的密钥。

    缺点：加密算法及其复杂，安全性依赖算法与密钥，而且加密和解密效率很低。

  4.  for in 和for of的区别
    
      简单来说就是它们两者都可以用于遍历，不过for in遍历的是数组的索引（index），而for of遍历的是数组元素值（value）

      for of适用遍历数/数组对象/字符串/map/set等拥有迭代器对象（iterator）的集合，但是不能遍历对象，因为没有迭代器对象(遍历对象会报错)，但如果想遍历对象的属性，你可以用for in循环（这也是它的本职工作）或用内建的Object.keys()方法
      var myObject={
      　　a:1,
      　　b:2,
      　　c:3
      }
      for (var key of Object.keys(myObject)) {
        console.log(key + ": " + myObject[key]);
      }

    1.  内存泄漏的方式有哪些

        什么是内存泄漏：内存泄漏指由于疏忽或错误造成程序未能释放已经不再使用的内存。内存泄漏并非指内存在物理上的消失，而是应用程序分配某段内存后，由于设计错误，导致在释放该段内存之前就失去了对该段内存的控制，从而造成了内存的浪费。
        
        1.  闭包
        2.  全局变量
        3.  DOM操作
        4.  定时器
        5.  console.log打印


    2.  display none 和 visibility hidden有什么区别

        dispaly:none 设置该属性后，该元素下的元素都会隐藏，占据的空间消失。

        visibility:hidden 设置该元素后，元素虽然不可见了，但是依然占据空间的位置。

 

    display:none和visibility:hidden的区别？

        1. visibility具有继承性，其子元素也会继承此属性，若设置visibility:visible，则子元素会显示

        2. visibility不会影响计数器的计算，虽然隐藏掉了，但是计数器依然继续运行着。

        3. 在css3的transition中支持visibility属性，但是不支持display，因为transition可以延迟执行，
            因此配合visibility使用纯css实现hover延时显示效果可以提高用户体验

        4. display:none会引起回流(重排)和重绘 visibility:hidden会引起重绘
## vue核心

  59. vue2 双向绑定原理

  双向绑定是什么？

  首先明确一下双向绑定和响应式的概念，双向绑定是双向的，表示数据改变驱动视图改变，视图反过来也可以改变数据。响应式是单向的，只代表数据改变驱动视图改变，响应式的主要原理是数据劫持和观察者模式，是 Vue 最核心的模块。

  Vue 双向绑定和 React 单向绑定

  其中 Vue 和 React 的区别之一就是：Vue 是双向绑定；React 是单向绑定，因为 React 视图的改变需要手动执行 this.$setState() 来改变数据。
  1.6 Vue2 数据劫持的原理
  数据劫持核心是 defineReactive 函数，里面主要使用 Object.defineProperty 来对对象访问器 getter 和 setter 进行劫持。数据变更时 set 函数里面可以通知视图更新。
  在使用 Object.defineProperty 进行数据劫持的时候，对象和数组是分开处理的：对象是遍历对象属性之后进行递归劫持；数组是重写数组的原型方法比如 splice。这个我看了一些源码和资料。Object.defineProperty 本身是可以监控到数组下标的变化的，但尤大在 github issue 回复过从性能/体验的性价比考虑弃用了这种对数组的劫持方案。举例子就是对象属性通常比较少对每一个属性劫持不会消耗太多性能，但数组可能有成千上万个元素，如果每一个元素都劫持，无疑消耗过多性能。
  1.7 Vue2 数据劫持的缺陷
  第一个缺陷是由于 Vue2 数据劫持底层是用 ES5 的 Object.defineProperty 实现的，所以不兼容 IE8 以下。
  第二个缺陷是 Vue2 数据劫持无法检测数组和对象的变化，只会劫持一开始存在 data 选项里面的数据，这就是官网建议我们把可能要使用的数据一开始声明在 data 里面并提供初始值。对象新增属性可以通过 Vue.$set() 进行数据劫持，数组新增元素也可以通过 Vue.$set()，或者因为数组原型方法已经被重写了可以用 splice、push、unshift 等方法新增元素。
  1.8 Vue3 数据劫持的优势
  Vue3 数据劫持底层主要是使用 ES6 的 Proxy 实现。
  Proxy 的优势如下:

  Proxy 可以直接监听对象（const proxy = new Proxy(target, handler)）；defineProperty 需要遍历对象属性进行监听。
  Proxy 可以直接监听对象新增的属性；defineProperty 只能劫持一开始就存在的属性，新增属性需要手动 Observer。
  Proxy 可以直接监听数组的变化；defineProperty 无法监听数组的变化。
  Proxy 有多达 13 种拦截方法：不限于 get、set、has、deleteProperty、apply、ownKeys、construct 等等；除开 get 和 set 其他都是 defineProperty 不具备的。
  Proxy 返回的是一个新对象，我们可以只操作新的对象达到目的；defineProperty 只能遍历对象属性直接修改；

  Proxy 的劣势如下:

  ES6 的 Proxy 的存在浏览器兼容性问题。


  Proxy 和 Reflect 结合实现 Vue3 底层数据劫持原理。Reflect 设计的目的是为了优化 Object 的一些操作方法以及合理的返回 Object 操作返回的结果，对于一些命令式的 Object 行为，Reflect 对象可以将其变为函数式的行为。比如 （'name' in obj） = Reflect.has(obj, 'name')

  1.9 Vue3 有什么新特性
  Vue2.x 的组织代码形式，叫 Options API，而 Vue3 最大的特点是 Composition API 中文名是合成函数：以函数为载体，将业务相关的逻辑代码抽取到一起，整体打包对外提供相应能力。可以理解它是我们组织代码，解决逻辑复用的一种方案。
  其中 setup 是 Composition API 的入口函数，是在 beforeCreate 声明周期函数之前执行的。还提供了 ref 函数定义一个响应式的数据，reactive 函数定义多个数据的响应式等等。
  61. v-model原理
   
   v-model其实是个语法糖，它实际上是做了两步动作：
    1、绑定数据value
    2、触发输入事件input
    也就是说，v-model="username"等同于：
        
        input type="text" :value="username" @input="username=$event.target.value"

  62. diff算法
  63. nextTick原理
  64. template原理
  65. v指令
  66. vuex原理
## CSS
  68. href和src的区别
        href表示超文本引用，用在link和a等元素上，href是引用和页面关联，是在当前元素和引用资源之间建立联系，src表示引用资源，表示替换当前元素，用在img，script，iframe上，src是页面内容不可缺少的一部分。

      　　src是source的缩写，是指向外部资源的位置，指向的内部会迁入到文档中当前标签所在的位置；在请求src资源时会将其指向的资源下载并应用到当前文档中，例如js脚本，img图片和frame等元素。

      <script src="js.js"></script>当浏览器解析到这一句的时候会暂停其他资源的下载和处理，直至将该资源加载，编译，执行完毕，图片和框架等元素也是如此，类似于该元素所指向的资源嵌套如当前标签内，这也是为什么要把js饭再底部而不是头部。

      <link href="common.css" rel="stylesheet"/>当浏览器解析到这一句的时候会识别该文档为css文件，会下载并且不会停止对当前文档的处理，这也是为什么建议使用link方式来加载css而不是使用@import。


        补充：link和@import的区别

        两者都是外部引用CSS的方式，但是存在一定的区别：

        区别1：link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。

        区别2：link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。

        区别3：link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。

        区别4：link支持使用Javascript控制DOM去改变样式；而@import不支持。
        
  69. flex布局实现瀑布流
  70. 什么是盒模型

     CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：边距margin，边框border，填充padding，和实际内容content。盒模型允许我们在其它元素和周围元素边框之间的空间放置元素。

    box-sizing: content-box（W3C盒模型，又名标准盒模型）：元素的宽高大小表现为内容的大小。 box-sizing: border-box（IE盒模型，又名怪异盒模型）：元素的宽高表现为内容 + 内边距 + 边框的大小。背景会延伸到边框的外沿。


  71.  BFC是什么
     BFC是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

     如果想要避免外边距的重叠，可以将其放在不同的 BFC 容器中。

    BFC应用

    防止margin重叠
    清除内部浮动
    自适应两（多）栏布局
    防止字体环绕

    触发BFC条件

    根元素
    float的值不为none
    overflow的值不为visible
    display的值为inline-block、table-cell、table-caption
    position的值为absolute、fixed

    BFC的特性

    内部的Box会在垂直方向上一个接一个的放置。
    垂直方向上的距离由margin决定
    bfc的区域不会与float的元素区域重叠。
    计算bfc的高度时，浮动元素也参与计算
    bfc就是页面上的一个独立容器，容器里面的子元素不会影响外面元素。


  72.  如何实现精准计时
   requestAnimationFrame 自带函数节流功能，基本可以保证在 16.6 毫秒内只执行一次（不掉帧的情况下），并且该函数的延时效果是精确的，没有其他定时器时间不准的问题，当然你也可以通过该函数来实现 setTimeout。


   ## 前端安全

   DDOS攻击概念：

    利用木桶原理，寻找利用系统应用的瓶颈；阻塞和耗尽；当前问题：用户的带宽小于攻击的规模，噪声访问带宽成为木桶的短板。
    DDOS预防：用软硬件结合的方式来防御是最有效的
    
  ## nodejs中间件

    Express的中间件，用来实现各种功能，比如cookie解析、日志记录、文件压缩等。对于同一个网络请求，可能同时有多个匹配的中间件，一般顺序执行。而 next() 则是把执行控制权，从上一个中间件，转移到下一个中间件的函数。


   