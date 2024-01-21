本项目主要存放实际的一些面试经历题目 某些会有相应的事后解答与自我总结

// 全部背完即可解决面试八股文部分 手写实现和 leetcode 仍需努力

汇总面试的常见问题与解答 八八八八八八八八八八股文（卷上天了,人麻了）

1. vue2 与 vue3 的区别

* 实现双向数据绑定的方式不一样，vue2 使用 es5 的 Object.definePerporty，vue3 使用 es6 的 Proxy 对象  
* vue3 主要依赖 composition API 函数式编程的写法与 vue2 不一样。vue3 的写法更方便后期代码的维护
* 对 Typescript 的支持不一样，vue3 是使用 typescript 写的，生态上更支持 typescript
* 生命周期的名称不一样
* vue3 新增了一些新特性，如组件 template 标签内可以写多个根元素标签(fragment),teleport 传送

1.  setTimeout 底层代码实际执行了什么逻辑  
    答：第二个参数的毫秒数过了之后，将第一个参数内的回调方法放到任务队列等待执行

2.  写页面的时候，加入异步请求，放在哪一个生命周期里面  
    答：created 和 mounted 都可以放，created 会稍微快一点，但是 created 可能会被打断，异步请求会重新多次渲染，可以会有闪烁的问题。如果要对真实 DOM 操作需要在 mounted。

3.  url 输入一个网址之后，发生了什么
    答：
    ① DNS 解析：当用户输入一个网址并按下回车键的时候，浏览器获得一个域名，而在实际通信过程中，
    我们需要的是一个 IP 地址，因此我们需要先把域名转换成相应 IP 地址。

        (从URI中提取出协议名和域名，我们会先查询浏览器缓存，系统缓存，host文件，然后查询系统定义的dns服务器，
        查询根dns服务器，顶级dns服务器，权威dns服务器。其中会有缓存代理，负载均衡的查询。返回ip地址。)

        ② TCP 连接：浏览器通过 DNS 获取到 Web 服务器真正的 IP 地址后，便向 Web 服务器发起 TCP 连接请求
        ，通过 TCP 三次握手建立好连接后，浏览器便可以将 HTTP 请求数据发送给服务器了。

        ④ 处理请求并返回：服务器获取到客户端的 HTTP 请求后，会根据 HTTP 请求中的内容来决定如何获取相应的文件，
        并将文件发送给浏览器。

        ⑤ 浏览器渲染：浏览器根据响应开始显示页面，首先解析 HTML 文件构建 DOM 树，
        然后解析 CSS 文件构建渲染树，等到渲染树构建完成后，浏览器开始布局渲染树(render Tree)并将其绘制到屏幕上,期间发生回流和重绘。

        ⑥ 断开连接：客户端和服务器通过四次挥手终止 TCP 连接。

解析 html 以构建 dom 树 -> 构建 render 树->布局 render 树(layout/ reflow 回流)->绘制 render 树(repaint 重绘)

    回流：根据生成的渲染树，进行回流，得到节点的几何信息（位置，大小）

    重绘：根据渲染树以及回流得到的几何信息，得到节点的绝对像素。

1. http 状态码
   答：
   1、 101 客户端需要继续发送剩余请求
   2、 200 成功
   3、 301 永久重定向转移，url 转移到别的地址 302 暂时重定向转移 304 缓存，服务器已经执行了 get 请求，文件未发生变化
   4、 400 客户端语法错误 401 没有访问权限 403 服务器理解请求，但拒绝该请求 404 请求不到资源 405 请求方法有问题
   5、 500 服务器端问题 503 服务器维护或者超载

2. this 的指向有几种
   答：

   1. 严格模式下 this 的指向为 undefined
   2. 非严格模式下全局作用域指向 window
   3. 箭头函数的 this 与上级作用域 this 指向保持一致
   4. 构造函数内部的 this，绑定指向 new 创建的实例
   5. 普通函数内部的 this, 指向调用这个函数的对象

3. 浏览器缓存运行机制(304 过程)

   a. 浏览器请求资源时首先命中资源的 Expires 和 Cache-Control，Expires 受限于本地时间，如果修改了本地时间，可能会造成缓存失效，可以通过 Cache-control: max-age 指定最大生命周期，状态仍然返回 200，但不会请求数据，在浏览器中能明显看到 from cache 字样。

   b. 强缓存失效，进入协商缓存阶段，首先验证 ETag。 **ETag**可以保证每一个资源是唯一的，资源变化都会导致 ETag 变化。服务器根据客户端上发送的 If-None-Match 值来判断是否命中缓存。

   c. 协商缓存 Last-Modify/If-Modify-Since 阶段，客户端第一次请求资源时，服务器返回的 header 中会加上 Last-Modify，Last-modify 是一个时间标识该资源的最后修改时间。再次请求该资源时，request 的请求头中会包含 If-Modify-Since，该值为缓存之前返回的 Last-Modify。服务器收到 If-Modify-Since 后，根据资源的最后修改时间判断是否命中缓存。

catch-control 是 http 通用首部字段的控制缓存行为字段，可分为缓存请求指令和缓存响应指令

缓存指令：

1. no-cache

客户端请求数据时强制向源服务器发送验证缓存是否过期，返回给客户端的必须是未过期的数据

2. no-store

缓存不能在本地存储请求的任何数据

3. max-age

如果缓存的时间没有超过 max-age 设置的时间，则返回缓存的数据，否则从源服务器请求数据，http1.0 在设置了 expires 字段后会忽略掉此字段，http1.1 相反

4. 强缓存与协商缓存的区别

在 http 中可以通过控制响应头来控制浏览器缓存。分为强缓存和协商缓存，强缓存通过 expires(http1.0) 和
Cache-Control(http1.1 优先级更高)中的 max-age 指令来控制。max-age 设置缓存周期，如果在该周期内，会直接从客户端缓存获取数据，不会请求服务器；  
协商缓存通过响应头中的 last-modified 和 etag 进行缓存控制，每次发送请求时，会进行缓存新鲜度校验，如果资源过旧将从响应中获取，否则从客户端缓存中获取。新鲜度校验，是通过请求头中的 if-no-match 与相应头中的 etag 对比，或者
是将请求头中的 if-modified-since 和响应头中的 last-modified 进行对比

1. Last-Modified / If-Modified-Since

Last-Modified：服务器响应请求时，告诉浏览器资源最后的修改时间。

If-Modified-Since：浏览器再次请求资源时，浏览器通知服务器，上次请求时，返回的资源最后修改时间。

若最后修改时间小于等于 If-Modified-Since，则 response header 返回 304，告知浏览器继续使用所保存的 cache。若大于 If-Modified-Since，则说明资源被改动过，返回状态码 200；

2. If-none-match / Etag  

Etag：服务器响应请求时，告诉浏览器当前资源在浏览器的唯一标识（生成规则由服务器确定）

If-None-Match：再次请求服务器时，通过此字段通知服务器客户端缓存数据的唯一标识。服务器收到请求后发现有 If-None-Match 则与被请求资源的唯一标识进行比对，不同，说明资源又被改动过，则响应整片资源内容，返回状态码 200；相同，说明资源无新修改，则响应 HTTP 304，告知浏览器继续使用所保存的 cache。

![E-Tag](https://img-blog.csdnimg.cn/f873084dca134226b009ba30eb9a1f80.png)

Etag 与 Last-Modified 对比：

- 在精确度上，Etag 优于 Last-Modified。Last-Modified 精确到 s，如果 1s 内，资源多次改变，Etag 是可以判断出来并返回最新的资源。
- 在性能上，Last-Modified 优于 Etag，因为 Last-Modified 只需要记录时间，而 Etag 需要服务器重新生成 hash 值，所以性能上略差。
- 在优先级上，Etag 优于 Last-Modified，Etag 和 Last-Modified 可同时存在。本地缓存时间到期后，浏览器向服务端发送请求报文，其中 Request Header 中包含 If-none-match 和 Last-Modified-Since（与服务端 Etag 和 Last-Modified 对比，Etag 优先级高），用以验证本地缓存数据验证是否与服务端保持一致。在服务器端会优先判断 Etag。如果相同，返回 304；如果不同，就继续比较 Last-Modified，然后决定是否返回新的资源。若服务端验证本地缓存与服务端一致，返回 304，浏览器加载本地缓存；否则，服务器返回请求的资源，同时给出新的 Etag 以及 Last-Modified 时间。

1.  vue 路由有几种模式，有什么区别

    hash 模式：通过#号后面的内容的更改，触发 hashchange 事件，实现路由切换
    history 模式：通过 pushState 和 replaceState 切换 url，触发 popstate 事件，实现路由切换，需要后端配合

2.  js 的数据类型

    js 的数据类型包涵 7 种基本数据类型： null undefined Number string Symbol Boolean BigInt

    以及一种复杂数据类型： Object (Object 下面有 Function ,Array, Date, regxp)

    使用 typeof 可以甄别出 null 以外的基本数据类型，typeof null 为 Object 类型（是个老版本遗留下来的 bug）,
    typeof console.log == 'function' 亦可甄别函数

    甄别复杂数据类型的 Array Function 使用 fun instanceof Function 为 true 来甄别

    [] == null = false 为 true 强制类型转换了
    在 JS 中，除了原始类型那么其他的都是对象类型了。对象类型和原始类型不同的是，原始类型存储的是值，对象类型存储的是地址（指针）。当你创建了一个对象类型的时候，计算机会在内存中帮我们开辟一个空间来存放值，但是我们需要找到这个空间，这个空间会拥有一个地址（指针）。
    typeof 对于对象来说，除了函数都会显示 object，所以说 typeof 并不能准确判断变量到底是什么类型

    typeof [] // 'object'
    typeof {} // 'object'
    typeof console.log // 'function'

3.  js 的继承方式

    class 继承
    首先先来讲下 class，其实在 JS 中并不存在类，class 只是语法糖，本质还是函数。
    class Person {}
    Person instanceof Function // true

    原型链继承,分为组合继承和寄生组合继承

    什么是原型链？什么是原型链继承

4.  Vue 数据传递方式

    1. 父组件给子组件传递数据，使用 props 在子组件接收
    2. 子组件给父组件传递数据，使用 this.$emit的方式
		1. 通过event bus实现
		具体实现:创建一个空的vue并暴露出去，这个作为公共的bus,即当作两个组件的桥梁，
    在两个兄弟组件中分别引入刚才创建的bus，在组件A中通过bus.$emit（’自定义事件名’，
       要发送的值）发送数据，在组件 B 中通过 bus.$on（‘自定义事件名‘,function(v) { //v 即为要接收的值 }）接收数据
    3. 通过 vuex 实现
       具体实现：vuex 是一个状态管理工具，主要解决大中型复杂项目的数据共享问题，
       主要包括 state,actions,mutations,getters 和 modules 5 个要素，主要流程：
       组件通过 dispatch 到 actions，actions 是异步操作，再 actions 中通过 commit 到 mutations，
       mutations 再通过逻辑操作改变 state，从而同步到组件，更新其数据状态
    4. 在 vue2.2 版本之后，新增了 provide 和 inject。用于父组件给子或子孙组件传递数据
    5. $children $parents
    6. 作用域插槽 slot,父组件获取子组件用插槽传递来的数据

5.  let var const 的区别

    - 从变量声明提升这块： var 允许变量提升，（使用 var 声明的变量会被提升到作用域的顶部），后两者在变量声明之前使用的话，
      首先报错的原因是因为存在暂时性死区，我们不能在声明前就使用变量，这也是 let 和 const 优于 var 的一点。然后这里你认为的提升和 var 的提升是有区别的，虽然变量在编译的环节中被告知在这块作用域中可以访问，但是访问是受限制的。

    - 从变量块级作用域这方面： var 声明的变量没有块级作用域的概念，后两者有
      从重复声明变量这块: var 可以重复声明同名变量，后两者禁止

    - 从是否可以重新给变量赋值：const 不允许，另外两者可以

    - 首先在全局作用域下使用 let 和 const 声明变量，变量并不会被挂载到 window 上，这一点就和 var 声明有了区别。

    let b = 1
    const c = 1
    console.log(window.b) // undefined
    console.log(window. c) // undefined

    额外总结：函数提升优先于变量提升，函数提升会把整个函数挪到作用域顶部，变量提升只会把声明挪到作用域顶部
    var 存在提升，我们能在声明之前使用。let、const 因为暂时性死区的原因，不能在声明前使用
    var 在全局作用域下声明变量会导致变量挂载在 window 上，其他两者不会

6.  请你说一下 vue 里面 provide 和 inject 两个配置项
    vue 提供了 provide 和 inject 帮助我们解决多层次嵌套嵌套通信问题。
    在 provide 中指定要传递给子孙组件的数据，子孙组件通过 inject 注入祖父组件传递过来的数据。
    provide 和 inject 主要为高阶插件/组件库提供用例,并不推荐直接用于应用程序代码中(官方文档原话)。

主要用法 在父组件中 声明 provide 配置，return 该组件 vue 的实例
如在 elementui 中的父组件 el-Menu
provide() {
return {
'elMenu': this
}
}
子孙组件 el-menu-item 接受
inject: ['elMenu']或者 inject: {
key: {
from: 'elMenu',
default: {}
}
}
key 是子孙组件处用的绰号

vue 是单项数据流。 如果 provide 传子孙组件的是基本数据类型属性，则修改父组件的 provide 里的数据，子孙 inject 接收不会改变。
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

形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function 关键字与函数名之间有一个星号；二是，函数体内部使用 yield 表达式，定义不同的内部状态（yield 在英语里的意思就是“产出”）。

总结一下，调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。以后，每次调用遍历器对象的 next 方法，就会返回一个有着 value 和 done 两个属性的对象。value 属性表示当前的内部状态的值，是 yield 表达式后面那个表达式的值；done 属性是一个布尔值，表示是否遍历结束。

ES6 没有规定，function 关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。

function * foo(x, y) { ··· }
function *foo(x, y) { ··· }
function* foo(x, y) { ··· }
function*foo(x, y) { ··· }
由于 Generator 函数仍然是普通函数，所以一般的写法是上面的第三种，即星号紧跟在 function 关键字后面。本书也采用这种写法。

20. Promise 是异步编程的一种解决方案

所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

Promise 对象有以下两个特点。

（1）对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

Promise 也有一些缺点。首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。第三，当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

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
    async 函数就是将 Generator 函数的星号（\*）替换成 async，将 yield 替换成 await，仅此而已

22. post 和 get 的区别

    1. get 是获取数据的，而 post 是提交数据的,只是它们的语义不同而已

    2. GET 用于获取信息，是无副作用的，是幂等的，且可被浏览器缓存， 而 POST 用于修改服务器上的数据，有副作用，非幂等，不可被浏览器缓存。

    3. get 使用 url 传参，post 一般使用 form 表单传参，必要时 post 也可以使用 url 传参

    4. get 提交的数据有长度限制，post 请求没有内容长度限制，http 协议本身没有限制 url 及正文长度，对 url 的限制一般是浏览器和服务器的原因

    5. post 请求比 get 请求较为安全一些，get 参数放在 url 中，但是 http 请求都是明文传输，post 依旧可以被抓包。仅有用 https 安全一些，get 请求会将 url 请求保存在浏览器历史记录里，这样就没 post 安全

    6. GET 请求只能进行 url 编码，而 POST 支持多种编码方式

    7. get 请求产生一个 TCP 数据包，post 会产生两个 tcp 数据包（火狐浏览器只产生一个）

    8. get 会被浏览器缓存下来，post 不会，除非手动设置

23. background-position: x y 0 0 代表左上角，5px -10px 代表向右偏移 5px,向上偏移 10px
24. box-sizing 的默认值： content-box(盒子的高度是独立的,就为 height)， border-box(盒子的高度是要加入 border 宽度和 padding 的值，即盒子内容的高度 = height - border-width \* 2 - padding-top - padding-bottom)
25. 箭头函数和普通函数有何不同

    1. 箭头函数只能写在匿名函数中，仅是函数表达式的情况。 普通函数则没这个限制，可以是函数声明也可以是函数表达式
    2. 箭头函数不能用 new 来创建构造函数的实例，普通函数可以（因为箭头函数创建的时候程序不会为它创建 construct 方法，也就是没有构造能力，用完就丢掉了，不像普通函数重复利用，因此也不需要构造函数原型，也就是不会自动生成 prototype 属性）
    3. 箭头函数的 this 与上级上下文作用域的 this 保持一致，普通函数中的 this，指向调用这个函数的对象
    4. arguments 的不同，箭头函数没有 arguments 对象
    5. 箭头函数不能通过 bind、call、apply 来改变 this 的值，但依然可以调用这几个方法（只是 this 的值不受这几个方法控制）
    6. 箭头函数没有 super()和 new.target 的绑定。普通函数有
    7. 综合箭头函数没有.prototype 属性
    8. 箭头函数不能当做 Generator 函数,不能使用 yield 关键字

26. http 和 https

    HTTP：是互联网上应用最为广泛的一种网络协议，是一个客户端和服务器端请求和应答的标准（TCP），用于从 WWW 服务器传输超文本到本地浏览器的传输协议，它可以使浏览器更加高效，使网络传输减少。

    HTTPS：是以安全为目标的 HTTP 通道，简单讲是 HTTP 的安全版，即 HTTP 下加入 SSL 层，HTTPS 的安全基础是 SSL，因此加密的详细内容就需要 SSL。

    HTTP 协议传输的数据都是未加密的，也就是明文的，因此使用 HTTP 协议传输隐私信息非常不安全，为了保证这些隐私数据能加密传输，于是网景公司设计了 SSL（Secure Sockets Layer）协议用于对 HTTP 协议传输的数据进行加密，从而就诞生了 HTTPS。简单来说，HTTPS 协议是由 SSL+HTTP 协议构建的可进行加密传输、身份认证的网络协议，要比 http 协议安全。

    HTTPS 和 HTTP 的区别主要如下：

    1、**https 协议需要到 ca 申请证书**，一般免费证书较少，因而需要一定费用。

    2、http 信息是**明文传输**，https 则是具有安全性的 ssl **加密**传输。

    3、http 和 https 使用的是完全不同的连接方式，用的端口也不一样，前者是 80，后者是 443。

    无状态协议，是指协议对于交互性场景没有记忆能力。HTTP 、HTTPS 都是无状态协议。上面的无状态是指的，无登录状态，即服务器不知道某个用户是否已登录过了。
    让服务器有记忆能力之 Cookie、Session

27. http 0.9 http1.0 1.1 和 2.0 3.0

    1.1 是 keep-alive 长连接

    2.0 多路复用;header 压缩;二进制传输

    3.0: 实现了 QUIC 协议 (Quick UDP Internet Connections 快速 UDP 互联网连接协议)

28. tcp 和 udp

    TCP 是面向链接的，而 UDP 是面向无连接的。
    TCP 仅支持单播传输，UDP 提供了单播，多播，广播的功能。
    TCP 的三次握手保证了连接的可靠性; UDP 是无连接的、不可靠的一种数据传输协议，
    首先不可靠性体现在无连接上，通信都不需要建立连接，对接收到的数据也不发送确认信号，
    发送端不知道数据是否会正确接收。UDP 的头部开销比 TCP 的更小，数据传输速率更高，实时性更好。

    - 内容拓展 单播、多播、广播  
      单播： 一个客户端 IP 地址传到一个服务器地址
      多播： 亦称 组播， 一个 IP 地址发送到一组 IP 地址；为了解决单播效率太低的问题
      广播： 发送给**所有**能接收的地址，无论对方是否需要

29. HTTPS 建立的整个过程：

TCP 三次握手 -> client hello -> server hello -> 校验数字证书 -> 客户端回应 -> 服务器回应 ->  
四次挥手

30. 三次握手

- 第一次：建立连接时，客户端发送 SYN 包(syn=j)到服务器，并进入 SYN_SEND 状态，等待服务器确认；

- 第二次：服务器收到 SYN 包，向客户端返回 ACK（ack=j+1），同时自己也发送一个 SYN 包（syn=k），即 SYN+ACK 包，此时服务器进入 SYN_RCVD 状态；

- 第三次：客户端收到服务器的 SYN ＋ ACK 包，向服务器发送确认包 ACK(ack=k+1)，此包发送完毕，客户端和服务器进入 ESTABLISHED 状态，完成三次握手。

- 完成三次握手，客户端与服务器开始传送数据，也就是 ESTABLISHED 状态。

三次握手保证了不会建立无效的连接，从而浪费资源。
![三次握手过程](https://img-blog.csdnimg.cn/3209d990706e4e98bbac81ba6ff6e142.png)

- client hello

由客户端向服务器发起建立 TLS 请求，请求的内容包括以下等信息：

- 客户端支持的 SSL/TLS 协议版本。
- 客户端生产的随机数（Client Random），后面用于生成会话秘钥的条件之一。
- 客户端支持的加密套件列表，如 RSA 等加密算法。

* Server Hello  
  服务器收到客户端的建立请求后，向客户端发出响应，回应的内容包括以下等信息：

- 确认 SSL/ TLS 协议版本（如果浏览器不支持，则关闭加密通信）。
- 服务器生产的随机数（Server Random），也是后面用于生产会话秘钥的条件之一。
- 确认的加密套件。
- 服务器的数字证书。

* 校验数字证书  
  客户端需要验证证书链，一直验证到根证书，根证书默认在浏览器或者操作系统环境里。

* 客户端回应  
  基于前面提到的两个随机数（client random+server random），再生成第 3 个随机数 pre-master，然后通过 CA 证书中的公钥，对 pre-master 加密，得到 pre-master key，发送给服务器。

- 会话密钥是用双方协商的加密算法和三个随机数：client random、server random、
  pre-master key 生成的。

* 服务端回应  
  服务器使用自己的 CA 证书私钥对 pre-master key 解密得到 pre-master，再计算出会话密钥，随后向客户端发送以下信息：

- 加密通信算法改变通知，表示服务端随后的信息都将用会话秘钥加密通信。
- 这一步对应的是 Server 的 Finish 消息，服务端会将握手过程消息生成摘要，然后再用会话密钥加密，这是服务器发出的第一条加密消息，客户端接收后会用会话密钥解密，能解出来就说明协商成功。

31. 四次挥手(断开连接)

    - 第一次： TCP 客户端发送一个 FIN，用来关闭客户到服务器的数据传送。

    - 第二次：服务器收到这个 FIN，它发回一个 ACK，确认序号为收到的序号加 1。和 SYN 一样，一个 FIN 将占用一个序号。

    - 第三次：服务器关闭客户端的连接，发送一个 FIN 给客户端。

    - 第四次：客户端发回 ACK 报文确认，并将确认序号设置为收到序号加 1。

![四次挥手](https://img-blog.csdnimg.cn/c59442d3e122477398b4bc296348079a.png)

32. 父子组件之间的加载过程  
    答： 先进入父组件的 beforeCreated;  
     然后进入父组件的 created;  
     然后进入父组件的 beforeMounted;
    然后进入子组件的 beforeCreated;
    接着进入子组件的 created;  
     然后进入子组件的 beforeMounted;  
     然后进入子组件的 mounted;  
     最后进入父组件的 mounted;

33. vue 里面的 data 为什么返回的是个方法
    vue 组件需要高度复用,data 是一个函数时，每个组件实例都有自己的作用域，每个实例相互独立，
    不会相互影响。这都是因为 js 本身的特性带来的，跟 vue 本身设计无关。

    2.vue 组件中的 data 数据都应该是相互隔离，互不影响的，组件每复用一次，data 数据就应该被复制一次，之后，
    当某一处复用的地方组件内 data 数据被改变时，其他复用地方组件的 data 数据不受影响，
    就需要通过 data 函数返回一个对象作为组件的状态。

    3.当我们将组件中的 data 写成一个函数，数据以函数返回值形式定义，这样每复用一次组件，
    就会返回一份新的 data，拥有自己的作用域，类似于给每个组件实例创建一个私有的数据空间，
    让各个组件实例维护各自的数据。

34. flex 是什么？  
    flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性
	
    flex 1 是什么含义？（flex默认值： 0 1 auto）

    flex: 1; === flex: 1 1 auto;

    flex 属性 是 flex-grow、flex-shrink、flex-basis 三个属性的缩写。

    推荐使用此简写属性，而不是单独写这三个属性。

    flex-grow：定义项目的的放大比例；默认为 0，即如果存在剩余空间，也不放大。

    flex-shrink：定义项目的缩小比例；默认为 1，即如果空间不足，该项目将缩小。

    flex-basis： 定义在分配多余空间之前，项目占据的主轴空间（main size），浏览器根据此属性计算主轴是否有多余空间，

            默认值为auto，即 项目原本大小；
            设置后项目将占据固定空间。

35. arguments  

    - arguments 是一个类数组对象。代表传给一个function的参数列表。他可以通过索引来操作数据，也可以获取长度
    - 在调用函数时，实参都会在 arguments 中保存
    - arguments.length 可以用来获取实参的长度
    - 即使不定义形参，也可以通过 arguments 来使用实参，只不过比较麻烦
      arguments[0]表示第一个实参
      arguments[1]表示第二个实参。。。
    - arguments 里面有一个属性叫做 callee
      这个属性对应一个函数对象，就是当前调用的 arguments 所在对象

37. 什么是闭包

    函数嵌套函数，内部的函数就是闭包(函数 A 嵌套函数 B，B 函数能访问函数 A，则函数 B 则被称为闭包)。
    在 JS 中，闭包存在的意义就是让我们可以间接访问函数内部的变量。
    三、闭包作用
    作用 1：隐藏变量，避免全局污染

    作用 2：可以读取函数内部的变量

    同时闭包使用不当，优点就变成了缺点：

    缺点 1：导致变量不会被垃圾回收机制回收，造成内存消耗

    缺点 2：不恰当的使用闭包可能会造成内存泄漏的问题

    这里简单说一下，为什么使用闭包时变量不会被垃圾回收机制收销毁呢，这里需要了解一下 JS 垃圾回收机制；

    JS 规定在一个函数作用域内，程序执行完以后变量就会被销毁，这样可节省内存；

    使用闭包时，按照作用域链的特点，闭包（函数）外面的变量不会被销毁，因为变量一直被闭包内部所引用，
    所以一直存在，如果闭包使用过多会造成内存泄露。
    闭包使用场景：   1. 防抖和节流
    2. 延长某些变量的生命周期  

39. 垃圾回收机制

    栈内存的回收：
    栈内存调用栈上下文切换后就被回收，比较简单。
    堆内存的回收：
    V8 的堆内存分为新生代内存和老生代内存，新生代内存是临时分配的内存，存在时间短，老生代内存存在时间长。
    新生代内存回收机制：

    新生代内存容量小，64 位系统下仅有 32M。新生代内存分为 From、To 两部分，进行垃圾回收时，
    先扫描 From，将非存活对象回收，将存活对象顺序复制到 To 中，之后调换 From/To，等待下一次回收

    老生代内存回收机制

    晋升：如果新生代的变量经过多次回收依然存在，那么就会被放入老生代内存中
    标记清除：老生代内存会先遍历所有对象并打上标记，然后对正在使用或被强引用的对象取消标记，回收被标记的对象
    整理内存碎片：把对象挪到内存的一端

40. 什么是 event loop

    同步和异步任务分别进入不同的执行环境，同步的进入主线程，即主执行栈，异步的进入任务队列。
    主线程内的任务执行完毕为空，会去任务队列读取对应的任务，推入主线程执行。
    上述过程的不断重复就是我们说的 Event Loop (事件循环)。

    所以 Event Loop 执行顺序如下所示：

    1. 宏任务队列出队一个宏任务执行
    2. 执行过程遇到微任务，将微任务放入微任务队列
    3. 执行完一个宏任务后，清空执行完微任务队列的任务
    4. 渲染GUI(graphical user interface) 然后返回过程1

    微任务包括 process.nextTick, Promise, Object.observe, MutationObserver。

    宏任务包括 script（同步代码段） ， setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering。

    这里很多人会有个误区，认为微任务快于宏任务，其实是错误的。因为宏任务中包括了 script ，
    浏览器会先执行一个宏任务，接下来有异步代码的话才会先执行微任务。

41. call, apply, bind 的作用和区别

    call 与 apply 都属于 Function.prototype 的一个方法，所以每个 function 实例都有 call、apply 属性；

    作用
    call（）方法和 apply（）方法的作用相同：改变 this 指向。

    区别
    他们的区别在于接收参数的方式不同：

    call（）：第一个参数是 this 值没有变化，变化的是其余参数都直接传递给函数。在使用 call（）方法时，传递给函数的参数必须逐个列举出来。

    apply（）：传递给函数的是参数数组

    apply 转化的是内置的 call，并非 Function.prototype.call，apply 最后还是转化成 call 来执行的，call 要更快毫无疑问

    bind(), bind 不会马上调用 可以存在返回的对象里，合适的时候在调用，call 和 apply 都是马上调用，bind 的参数列表和 call 一样，都是 bind(this, a , b , c.....)

42. new()一个新对象，底层做了什么

new 一个函数，JS 编译器会做的四件事情：

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
    1. 捕获阶段，由 window 往里到事件注册对象处，遇到注册的捕获事件会触发
    2. 事件目标阶段， 传播到事件触发处时触发注册的事件
    3. 冒泡阶段， 从事件触发处往 window 传播，遇到注册的冒泡事件会触发
       一般事件的触发都是按照以上的顺序触发，但是有特例： 如同一个 dom 同时注册了捕获和冒泡，
       那这个 dom 的事件触发顺序将按照它注册的顺序执行。

使用 addEventListener 来给 dom 注册绑定事件，dom.addEventListener('click', function() {}, false)
第三个参数可以填写布尔值(可选)或对象（options， 可选），如果是布尔值，此参数代表 useCapter (意思是使用'俘虏，捕获')
false 是默认，为冒泡，true 是捕获。如果第三个参数为对象，则对象内有三个属性，{
capture: 布尔值（是否捕获）,
once: 布尔值（事件是否只触发一次就移除）,默认为 false
passive: ('消极的，被动的') 布尔值，设置为 true 时，表示 listener 永远不会调用 preventDefault() （阻止浏览器默认事件，比如点击 a 标签触发浏览器跳转）
}

事件代理：
如果 ul 下面很多动态生成的 li，此时比起把每一个 li 绑定一个点击事件更耗费内存和不能给动态生成 li 绑定事件这种做法，更好的是利用事件的冒泡 给父元素 ul 增加绑定事件获取 e.target 的子元素的内容更好，节省了内存，并且不需要给子元素注销绑定的事件

41. 跨域：
    什么是跨域：
    因为浏览器出于安全考虑，有同源策略。也就是说，如果协议、域名或者端口有一个不同就是跨域，Ajax 请求会失败。

    那么是出于什么安全考虑才会引入这种机制呢？ 其实主要是用来防止 CSRF 攻击的。简单点说，CSRF 攻击是利用用户的登录态发起恶意请求。

    也就是说，没有同源策略的情况下，A 网站可以被任意其他来源的 Ajax 访问到内容。如果你当前 A 网站还存在登录态，那么对方就可以通过 Ajax 获得你的任何信息。当然跨域并不能完全阻止 CSRF。

    跨域解决方案： 1.很早以前 大学那会儿有了解过使用 iframe 方案来解决跨域

    2.jsonp 解决跨域

    JSONP 的原理很简单，就是利用 "script" 标签没有跨域限制的漏洞。通过 "script" 标签指向一个需要访问的地址并提供一个回调函数来接收数据当需要通讯时。

    'script src="http://domain/api?param1=a&param2=b&callback=jsonp" /script'
    script
    function jsonp(data) {
    console.log(data)
    }
    /script
    JSONP 使用简单且兼容性不错，但是只限于 get 请求。

    3.cors 后端服务器放行解决跨域
    服务端设置 Access-Control-Allow-Origin 就可以开启 CORS。
    该属性表示哪些域名可以访问资源，如果设置通配符（\*）则表示所有网站都可以访问资源。
    以前自己用 node 后台写过一个博客管理系统的全栈项目里面使用 ngixn 在配置文件 config 里面修改过
    4.proxy 代理
    vue.config.js 里配置 proxy 代理，利用 webpack-dev-server 起本地前端的服务，因此 proxyTable 实际上是将请求发给自己的服务器，再由服务器转发给后台服务器，做了一层代理。vue 的 proxyTable 用的是 http-proxy-middleware 中间件, 因此不会出现跨域问题。
    5.window.postMessage 的安全性

42. 项目中遇到难解决的问题
    在杭州那个主要的项目中，需要实现文件分享，在上传组件中有个批量上传看到各个文件的上传进度条的功能。
    因为使用 input type= file 上传时可以直接拿到对于 file 对象，我就在每个 file 对象中加入 progress 属性值，
    然后上传期间 xmlHttpRequest 对象可以算出上传的百分比的值我就重新写到 file 对象的 progress 中，但是发现
    没有更新进度条，打印出来的值也是对的。然后用了很多方法比如加$set 等。还是无济于事。 这个问题困扰了接近两周，去网上找了各种答案，期间去处理别的问题去了。后来换个很多种搜索博客问题的方式，才找到一篇博客，
    他也是有过类似的问题。原来 files 是 FileList 类型，file 是 File 类型。而普通的 obj 是 Object 类型。

    Vue 的数据更新利用的是 Object.defineProperty 的 getter setter 函数来实现的，而 Vue 默认没有对 File 对象设置 getter setter, 因此用 File 对象不会自动更新。

    解决办法，就是用普通对象保存 file 对象里需要的信息，然后用来构造视图数据。或者自己手动设置 File 对象的 setter，也可以自动更新

43. 浏览器存储

    针对 cookie、localStorage、sessionStorage,indexDB
    对于与服务端通信这方面：
    只有 cookie 有对服务端的通信，每次都会携带在 header 中，对于请求性能影响，其他三者不会。导致使用 cookies 会占用一部分带宽
    对于存储量大小来说：
    cookie 为 4KB， 两个 storage 为 5M, indexDB 为无限
    对于数据生命周期：
    cookies 一般由服务器生成，可以设置过期时间, localStorage 和 indexDB 永久存在除非手动清除，sessionStorage 是关闭页面就清除

    cookie, session, token

    cookie 是一开始用于给浏览器和服务器通讯的，因为 http 是无状态的，需要知道哪些用户在登录，将用户名密码保存在浏览器，以便下次可以不输入直接登录，所以需要 session 保证 cookie 存储账号密码的安全。只需要 cookie 保存对应账号密码的 sessionId 即可，而
    session Id 存储在服务器。但是久而久之服务器存储了太多太多的 sessionId,如果服务器突然挂了，就出问题了，如果多个服务器的话又需要各个服务器都要存储所有的 session,所以发展到现在是使用 JWT(java web token)。 服务器用 jwt 签名生成的密文发给浏览器，浏览器用 cookie 或者 storage 的方式保存。JWT 相比与传统的 Session 会话机制，具备无状态性（无需服务器端存储会话信息）, JWT 本质是将秘钥存放在服务器端，并通过某种加密手段进行加密和验证的机制。加密签名=某加密算法(header+payload+服务器端私钥)，因为服务端私钥别人不能获取，所以 JWT 能保证自身其安全性。jwt 是由三部分组成的，头部（Header）、载荷（Payload）和签名（Signature）。header 部分会声明用什么算法加密，payload 存储一些信息比如有效期，然后这两者经过 base64 编译，然后这两段 base64 经过 header 的签名算法得到 signature，获得完整 jwt

    Service Worker

    Service Worker 是运行在浏览器背后的独立线程，一般可以用来实现缓存功能。
    使用 Service Worker 的话，传输协议必须为 HTTPS。因为 Service Worker 中涉及到请求拦截，
    所以必须使用 HTTPS 协议来保障安全。F12 中 Application 中能看到 Service Worker

44. vue 中的 mixin 和 mixins 有什么区别
    mixin 用于全局混入，会影响到每个组件实例，通常插件都是这样做初始化的。

    Vue.mixin({
    beforeCreate() {
    // ...逻辑
    // 这种方式会影响到每个组件的 beforeCreate 钩子函数
    }
    })
    虽然文档不建议我们在应用中直接使用 mixin，但是如果不滥用的话也是很有帮助的，
    比如可以全局混入封装好的 ajax 或者一些工具函数等等。

    import 待混入的对象 from ../待混入的对象.js
    mixins 是选择性混入 在组件中写 mixins: [待混入的对象]

    1.组件的 data，methods 优先级高于 mixins 里面的 data,methods 2.生命周期函数先执行 mixins 里的再执行组件里的
    Mixins：则是在引入组件之后与组件中的对象和方法进行合并，相当于扩展了
    父组件的对象与方法，可以理解为形成了一个新的组件。

45. vue3 的一些笔记：

    setup()在 vue 实例完全初始化之前执行，取不到 this 实例

    1.ref 和 react 方法 都能把非双向数据绑定的数据变双向数据绑定的数据，
    都是利用 proxy 对象转成双向数据绑定的对象 proxy((key, value: ''))。两者区别是 ref 作用于
    基本数据类型，后者作用于复杂数据类型，比如 object

    为了取响应式对象里的 key-value 普通解构出来的属性是没有响应式的，即使用 react 对象包裹，
    需要使用 toRefs 包裹才可以赋予解构的响应式。
    即在原来的 proxy({name: 'Yip'})前 套上 toRefs({name: proxy({name: 'Yip})})

    2.toRefs 与 toRef 的区别

    toRefs 用于将响应式对象转换为结果对象，其中结果对象的每个属性都是指向原始对象相应属性的 ref。
    常用于 es6 的解构赋值操作，因为在对一个响应式对象直接解构时解构后的数据将不再有响应式，
    而使用 toRefs 可以方便解决这一问题。

    总结： ref、toRef、toRefs 都可以将某个对象中的属性变成响应式数据  
    * ref的本质是拷贝，修改响应式数据，不会影响到原始数据，视图会更新
    * toRef、toRefs的本质是引用，修改响应式数据，会影响到原始数据，视图不会更新
    * toRef 一次仅能设置一个数据，接收两个参数，第一个参数是哪个对象，第二个参数是对象的哪个属性
    * toRefs接收一个对象作为参数，它会遍历对象身上的所有属性，然后挨个调用toRef执行

    3.watch 和 watchEffect 的区别
    ·watch 在生命周期开始第一次不执行（watch 的惰性）；watch 对象需要传待监听的对象的值；能获取新旧值
    ·watchEffect 立即执行；传参只传入回调函数；不能获取到旧的值

46. vue 的生命周期

    - beforeCreate Function 在实例初始化之后，数据观测 (data observer)
      和 event/watcher 事件配置之前被调用。(取不到 props 和 data 里的数据)
    - created Function 在实例创建完成后被立即调用。在这一步，实例已完成以下的
      配置：数据观测 (data observer)， 属性和方法的运算，watch/event 事件回调。然而，
      挂载阶段还没开始，$el 属性目前不可见。(可以取到 props 和 data 里的数据)
    - beforeMount Function 在挂载开始之前被调用：相关的 render 函数首次被调用。（开始构建虚拟 dom）
    - mounted Function el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。 (虚拟变真实dom挂载)
        如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
    - beforeUpdate Function 数据更新时调用，发生在虚拟 DOM 打补丁之前。
      这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。该钩子在
      服务器端渲染期间不被调用，因为只有初次渲染会在服务端进行。
    - updated Function 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
    - activated Function keep-alive 组件激活时调用。该钩子在服务器端渲染期间不被调用。
    - deactivated Function keep-alive 组件停用时调用。该钩子在服务器端渲染期间不被调用。
    - beforeDestroy Function 实例销毁之前调用。在这一步，实例仍然完全可用。该钩子在服务器端渲染期间不被调用。
    - destroyed Function Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
    所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务器端渲染期间不被调用。

    还有两个特殊的生命周期钩子： activated 和 deactivated ，用 keep-alive 标签 包裹的组件在切换时
    不会进行销毁，而是缓存到内存中并执行 deactivated 钩子函数，命中缓存渲染后会执行 actived 钩子函数。

47. keep-alive 组件有什么作用
    如果你需要在组件切换的时候，主要用于保留组件状态或避免重新渲染
    与<transition>都是抽象组件
    <keep-alive :include="whiteList" :exclude="blackList" :max="amount">
    <component :is="currentComponent"></component>
    </keep-alive>
    include 定义缓存白名单，keep-alive 会缓存命中的组件；exclude 定义缓存黑名单，
    被命中的组件将不会被缓存；max 定义缓存组件上限，超出上限使用 LRU 的策略置换缓存数据。

48. callee 和 caller
    callee 译名被呼叫者，caller 译名呼叫者
    callee 是 arguments 的属性，用于获取当前的方法，可以用于递归调用时方法名被修改的情况;也可以获取当前
    匿名方法
    function fibonacci (n) {
    if (n === 1 || n === 2) {
    return 1
    } else if (n < 1) {
    return '请传入非 0 自然数'
    } else {
    return arguments.callee(n - 1) + arguments.callee(n - 2)
    }
    }
    fibonacci(7)
    caller 写在方法里，用于得到是谁在调用本方法,如果是全局调用此方法 'functionName'.caller 返回 null
    function b() {
    a()
    function a() {
    console.log(a.caller)
    // 亦可写作 console.log(arguments.callee.caller)
    }
    }
    b() // 输出 function b() {}

49. 0.1 + 0.2 = ? 结果如何，为什么，如何纠正?

    在两数相加时，会先转换成二进制，0.1 和 0.2 转换成二进制的时候尾数会发生无限循环，然后进行对阶运算，
    JS 引擎对二进制进行截断，所以造成精度丢失。

    javascript 是使用 IEEE 754 双精度的格式，双精度小数转二级制会丢失精度 计算完再转回十进制得到的结果
    和理论值不同所以会造成这个问题，只要是使用 IEEE 754 规范的语言都会有这个问题，比如 python java go,

    0.1 = 0.10000000000000002
    0.2 = 0.20000000000000002
    0.1 + 0.2 = 0.30000000000000004 != 0.3
    parseFloat((0.1 + 0.2).toFixed(10)) === 0.3 // true

50. webpack 的 loader 是什么 plugins 是什么，两者有什么区别？

    Loader 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果。
    因为 Webpack 只认识 JavaScript，所以 Loader 就成了翻译官，对其他类型的资源进行转译的预处理工作。

    Plugin 就是插件，插件可以扩展 Webpack 的功能，
    在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，
    在合适的时机通过 Webpack 提供的 API 改变输出结果。

    Loader 在 module.rules 中配置，作为模块的解析规则，类型为数组，每一项都是一个 Object（由对象组成的数组），
    内部包含了 test(类型文件)、loader、options (参数)等属性。

    Plugin 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。

51. 优先级： v-once > v-for > v-if

52. css 优先级是怎么计算的

    第一优先级：!important 会覆盖页面内任何位置的元素样式 
    1. 内联样式，如 style="color: green"，权值为 1000
    2. ID 选择器，如#app，权值为 0100 
    3. 类、伪类、属性选择器，如.foo, :first-child, div[class="foo"]，权值为 0010 
    4. 标签、伪元素选择器，如 div::first-line，权值为 0001 
    5. 通配符、子类选择器、兄弟选择器，如\*, >, +，权值为 0000 
    6. 继承的样式没有权值

## 性能优化

* 什么是重绘和回流，阻止的方法有什么

1.  解析 HTML，生成 DOM 树，解析 CSS，生成 CSS OM（对象模型）树
2.  将 DOM 树和 CSSOM 树结合，生成渲染树(Render Tree)
3.  Layout(回流):根据生成的渲染树，进行回流(Layout)，得到节点的几何信息（位置，大小）
4.  Painting(重绘):根据渲染树以及回流得到的几何信息，得到节点的绝对像素
5.  Display:将像素发送给 GPU，展示在页面上。

    回流：
    触发条件：
    当我们对 DOM 结构的修改引发 DOM 几何尺寸变化的时候，会发生回流的过程。
    例如以下操作会触发回流：

    一个 DOM 元素的几何属性变化，常见的几何属性有 width、height、padding、margin、left、
    top、border 等等, 这个很好理解。

    使 DOM 节点发生增减或者移动。

    读写 offset 族、scroll 族和 client 族属性的时候，浏览器为了获取这些值，需要进行回流操作。

    调用 window.getComputedStyle 方法。

    回流过程：由于 DOM 的结构发生了改变，所以需要从生成 DOM 这一步开始，重新经过样式计算、生成布局树、
    建立图层树、 再到生成绘制列表以及之后的显示器显示这整一个渲染过程走一遍，开销是非常大的。

    重绘：
    触发条件：
    当 DOM 的修改导致了样式的变化，并且没有影响几何属性的时候，会导致重绘(repaint)。
    重绘过程：由于没有导致 DOM 几何属性的变化，因此元素的位置信息不需要更新，所以当发生重绘的时候，
    会跳过生存布局树和建立图层树的阶段，直接到生成绘制列表，然后继续进行分块、生成位图等后面一系列操作。

    如何避免触发回流和重绘：

    - 避免频繁使用 style，而是采用修改 class 的方式。
    - 将动画效果应用到 position 属性为 absolute 或 fixed 的元素上。
    - 也可以先为元素设置 display: none，操作结束后再把它显示出来。因为在 display 属性为 none 的元素
      上进行的 DOM 操作不会引发回流和重绘
    - 使用 createDocumentFragment 进行批量的 DOM 操作。
    - 对于 resize、scroll 等进行防抖/节流处理。
    - 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
    - 利用 CSS3 的 transform、opacity、filter 这些属性可以实现合成的效果，也就是 GPU 加速。

长列表无限加载

    1. 列表懒加载，每次下拉再加载剩余的列表。一开始是真实列表10条，需要知道firstIndex, 比如前十是0-9 ，
    下次下拉firstIndex为10，加载量可以用另外的参数。缺点：长时间加载列表还是会卡顿，还是会过多dom节点。

    2. react-virtualized(虚拟列表，虚拟滚动，只展示可视区域的数据)：
    原理就是模拟滚动，动态更新当前的列表，列表永远只有这10条和20条

![alt 属性文本](https://upload-images.jianshu.io/upload_images/20409039-c52edc50c6280b5b.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

- CDN

  CDN 的全称是 Content Delivery Network，即内容分发网络。
  其目的是通过在现有的 Internet 中增加一层新的网络架构，将网站的内容发布到最接近用户的网络“边缘”，
  使用户可以就近取得所需的内容，提高用户访问网站的响应速度。

  CDN 网络是在用户和服务器之间增加 Cache 层，主要是通过接管 DNS 实现，
  将用户的请求引导到 Cache 上获得源服务器的数据，从而降低网络的访问的速度。

  1.  什么是进程，什么是线程

  进程是资源分配的最小单位，线程是 CPU 调度的最小单位。浏览器是多进程和多线程的，
  一个浏览器进程里有 GUI 渲染线程，js 执行线程，定时器线程，异步请求线程，触发事件线程

  2.  为什么直接对对象新增和删除属性 vue 会监听不到

  3.  加密算法有了解吗，说一下非对称加密和对称加密

  （1） 对称加密加密与解密使用的是同样的密钥，所以速度快，但由于需要将密钥在网络传输，所以安全性不高。
  （2） 非对称加密使用了一对密钥，公钥与私钥，所以安全性高，但加密与解密速度慢。
  （3） 解决的办法是将对称加密的密钥使用非对称加密的公钥进行加密，然后发送出去，接收方使用私钥进行解密得
  到对称加密的密钥，然后双方可以使用对称加密来进行沟通。

  对称加密：

  优点：算法简单，加密解密容易，效率高，执行快。

  缺点：相对来说不算特别安全，只有一把钥匙，密文如果被拦截，且密钥也被劫持，那么，信息很容易被破译。

  非对称加密：

  优点：安全，即使密文被拦截、公钥被获取，但是无法获取到私钥，也就无法破译密文。作为接收方，务必要保管好自己的密钥。

  缺点：加密算法及其复杂，安全性依赖算法与密钥，而且加密和解密效率很低。

  4.  for in 和 for of 的区别

      简单来说就是它们两者都可以用于遍历，不过 for in 遍历的是数组的索引（index），而 for of 遍历的是数组元素值（value）

      for of 适用遍历数组/数组对象/字符串/map/set 等拥有迭代器对象（iterator）的集合，但是不能遍历对象，
      因为没有迭代器对象(遍历对象会报错)，但如果想遍历对象的属性，
      你可以用 for in 循环（这也是它的本职工作）或用内建的 Object.keys()方法

      var myObject={
      　　 a:1,
      　　 b:2,
      　　 c:3
      }
      for (var key of Object.keys(myObject)) {
      console.log(key + ": " + myObject[key]);
      }

  1.  内存泄漏的方式有哪些

            什么是内存泄漏：内存泄漏指由于疏忽或错误造成程序未能释放已经不再使用的内存。内存泄漏并非指内存在物理上的消失，
            而是应用程序分配某段内存后，由于设计错误，导致在释放该段内存之前就失去了对该段内存的控制，
            从而造成了内存的浪费。

            1.  闭包
            2.  意外的全局变量
            3. DOM 引用

      ![alt 属性文本](https://img2018.cnblogs.com/blog/1632708/201905/1632708-20190510165200005-1791562750.png)

  1.  遗忘的定时器和回调函数

  1.  display none 和 visibility hidden 有什么区别

      dispaly:none 设置该属性后，该元素下的元素都会隐藏，占据的空间消失。

      visibility:hidden 设置该元素后，元素虽然不可见了，但是依然占据空间的位置。

      1. visibility 具有继承性，其子元素也会继承此属性，若设置 visibility:visible，则子元素会显示

      2. display:none 会引起回流(重排)和重绘 visibility:hidden 会引起重绘

## vue 核心

59. vue2 双向绑定原理

双向绑定是什么？

首先明确一下双向绑定和响应式的概念，双向绑定是双向的，表示数据改变驱动视图改变，视图反过来也可以改变数据。响应式是单向的，只代表数据改变驱动视图改变，响应式的主要原理是数据劫持和观察者模式，是 Vue 最核心的模块。

Vue 双向绑定和 React 单向绑定

其中 Vue 和 React 的区别之一就是：Vue 是双向绑定；React 是单向绑定，因为 React 视图的改变需要手动执行  this.$setState() 来改变数据。
1.6 Vue2 数据劫持的原理
数据劫持核心是  defineReactive  函数，里面主要使用  Object.defineProperty  来对对象访问器  getter  和  setter  进行劫持。数据变更时  set  函数里面可以通知视图更新。
在使用 Object.defineProperty 进行数据劫持的时候，对象和数组是分开处理的：对象是遍历对象属性之后进行递归劫持；
数组是重写数组的原型方法比如 splice。这个我看了一些源码和资料。Object.defineProperty
本身是可以监控到数组下标的变化的，但尤大在 github issue 回复过从性能/体验的性价比考虑弃用了这种对数组的劫持方案。
举例子就是对象属性通常比较少对每一个属性劫持不会消耗太多性能，但数组可能有成千上万个元素，
如果每一个元素都劫持，无疑消耗过多性能。

1.7 Vue2 数据劫持的缺陷
第一个缺陷是由于 Vue2 数据劫持底层是用 ES5 的 Object.defineProperty 实现的，所以不兼容 IE8 以下。
第二个缺陷是 Vue2 数据劫持无法检测数组和对象的变化，只会劫持一开始存在 data 选项里面的数据，
这就是官网建议我们把可能要使用的数据一开始声明在 data 里面并提供初始值。
对象新增属性可以通过 Vue.$set() 进行数据劫持，数组新增元素也可以通过 Vue.$set()，
或者因为数组原型方法已经被重写了可以用 splice、push、unshift 等方法新增元素。

1.8 Vue3 数据劫持的优势
Vue3 数据劫持底层主要是使用 ES6 的 Proxy 实现。
Proxy 的优势如下:

Proxy 可以直接监听对象（const proxy = new Proxy(target, handler)）；defineProperty 需要遍历对象属性进行监听。
Proxy 可以直接监听对象新增的属性；defineProperty 只能劫持一开始就存在的属性，新增属性需要手动 Observer。
Proxy 可以直接监听数组的变化；defineProperty 无法监听数组的变化。
Proxy 有多达 13 种拦截方法：不限于 get、set、has、deleteProperty、apply、ownKeys、construct 等等；
除开 get 和 set 其他都是 defineProperty 不具备的。
Proxy 返回的是一个新对象，我们可以只操作新的对象达到目的；defineProperty 只能遍历对象属性直接修改；

Proxy 的劣势如下:

ES6 的 Proxy 的存在浏览器兼容性问题。

Proxy 和 Reflect 结合实现 Vue3 底层数据劫持原理。
Reflect 设计的目的是为了优化 Object 的一些操作方法以及合理的返回 Object 操作返回的结果，
对于一些命令式的 Object 行为，Reflect 对象可以将其变为函数式的行为。
比如 （'name' in obj） = Reflect.has(obj, 'name')

1.9 Vue3 有什么新特性
Vue2.x 的组织代码形式，叫 Options API，而 Vue3 最大的特点是 Composition API 中文名是合成函数：
以函数为载体，将业务相关的逻辑代码抽取到一起，整体打包对外提供相应能力。
可以理解它是我们组织代码，解决逻辑复用的一种方案。
其中 setup 是 Composition API 的入口函数，是在 beforeCreate 声明周期函数之前执行的。
还提供了 ref 函数定义一个响应式的数据，reactive 函数定义多个数据的响应式等等。 

61. v-model 原理

v-model 本质上是一颗语法糖，可以用 v-model 指令在表单 <input>、<textarea> 及 <select>元素上创建双向数据绑定。
- v-model只能应用在表单类元素（输入类元素）上。它实际上是做了两步动作：
* v-bind：绑定响应式数据
* 触发oninput 事件并传递数据
- v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：
* text 和 textarea 元素使用 value 属性和 input 事件；
* checkbox 和 radio 使用 checked 属性和 change 事件；
* select 字段将 value 作为 prop 并将 change 作为事件。

62. nextTick 原理
    Vue 是异步更新队列，$nextTick 是用来知道什么时候 DOM 更新完成的

    Vue 在观察到数据变化时并不是直接更新 DOM，而是开启一个队列，并缓冲在同一个事件
    循环中发生的所以数据改变。在缓冲时会去除重复数据，从而避免不必要的计算和 DOM 操作。然后，
    在下一个事件循环 tick 中，Vue 刷新队列并执行实际（已去重的）工作。所以如果你用一个 for 循环来动态改变数据 100 次，
    其实它只会应用最后一次改变，如果没有这种机制，DOM 就要重绘 100 次，这固然是一个很大的开销。

64. v 指令
    v-for , v-if, v-else, v-show, v-on, v-bind

    v-pre：跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

    v-once：只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

## CSS

68. href 和 src 的区别
    href 表示超文本引用，用在 link 和 a 等元素上，href 是引用和页面关联，是在当前元素和引用资源之间建立联系，
    src 表示引用资源，表示替换当前元素，用在 img，script，iframe 上，src 是页面内容不可缺少的一部分。

    src 是 source 的缩写，是指向外部资源的位置，指向的内部会迁入到文档中当前标签所在的位置；
    在请求 src 资源时会将其指向的资源下载并应用到当前文档中，例如 js 脚本，img 图片和 frame 等元素。

    <script src="js.js"></script>当浏览器解析到这一句的时候会暂停其他资源的下载和处理，直至将该资源加载，

    编译，执行完毕，图片和框架等元素也是如此，类似于该元素所指向的资源嵌套如当前标签内，
    这也是为什么要把 js 饭再底部而不是头部。

    <link href="common.css" rel="stylesheet"/>当浏览器解析到这一句的时候会识别该文档为css文件，
    会下载并且不会停止对当前文档的处理，这也是为什么建议使用link方式来加载css而不是使用@import。

    补充：link 和@import 的区别

    两者都是外部引用 CSS 的方式，但是存在一定的区别：

    区别 1：link 是 XHTML 标签，除了加载 CSS 外，还可以定义 RSS 等其他事务；@import 属于 CSS 范畴，只能加载 CSS。

    区别 2：link 引用 CSS 时，在页面载入时同时加载；@import 需要页面网页完全载入以后加载。

    区别 3：link 是 XHTML 标签，无兼容问题；@import 是在 CSS2.1 提出的，低版本的浏览器不支持。

    区别 4：link 支持使用 Javascript 控制 DOM 去改变样式；而@import 不支持。

70. 什么是盒模型

    CSS 盒模型本质上是一个盒子，封装周围的 HTML 元素，它包括：边距 margin，边框 border，填充 padding，
    和实际内容 content。盒模型允许我们在其它元素和周围元素边框之间的空间放置元素。

    box-sizing: content-box（W3C 盒模型，又名标准盒模型）：元素的宽高大小表现为内容的大小。
    box-sizing: border-box（IE 盒模型，又名怪异盒模型）：元素的宽高表现为内容 + 内边距padding + 边框的大小 border,
    背景会延伸到边框的外沿。

71. BFC 是什么  
    BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，  
    只有 Block-level box 参与，它规定了内部的 Block-level Box 如何布局，并且与这个  
    区 域外部毫不相干  
    布局规则  
    1、内部的 Box 会在垂直方向，一个接一个地放置  
    2、Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin  
    会发生重叠  
    5、BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反  
    之也如此  
    6、计算 BFC 的高度时，浮动元素也参与计算  
    哪些元素会生成 BFC：  
    1、根元素  
    2、float 属性不为 none  
    3、position 为 absolute 或 fixed  
    4、display 为 inline-block， table-cell， table-caption， flex， inline-flex  
    5、overflow 不为 visible  
72. 如何实现精准计时  

requestAnimationFrame 自带函数节流功能，基本可以保证在 16.6 毫秒内只执行一次（不掉帧的情况下），
并且该函数的延时效果是精确的，没有其他定时器时间不准的问题，当然你也可以通过该函数来实现 setTimeout。

## nodejs 中间件

    Express的中间件，用来实现各种功能，比如cookie解析、日志记录、文件压缩等。对于同一个网络请求，
    可能同时有多个匹配的中间件，一般顺序执行。而 next() 则是把执行控制权，
    从上一个中间件，转移到下一个中间件的函数。

1.  递归和迭代的区别

    递归（recursion）：递归常被用来描述以自相似方法重复事物的过程，在数学和计算机科学中，
    指的是在函数定义中使用函数自身的方法。（A 调用 A）

    迭代（iteration）：重复反馈过程的活动，每一次迭代的结果会作为下一次迭代的初始值。（A 重复调用 B）

2.  web worker 是什么
3.  grid 布局你知道吗
4.  vue 动态路由你知道吗
    vue 项目实现动态路由的方式大体可分为两种: 1.前端这边把路由写好，登录的时候根据用户的角色权限来动态展示路由，(前端控制路由)

    2.后台传来当前用户对应权限的路由表，前端通过调接口拿到后处理(后端处理路由)
    后端路由更安全一些

    动态路由设置一般有两种：

    (1)、简单的角色路由设置：比如只涉及到管理员和普通用户的权限。通常直接在前端进行简单的角色权限设置

    (2)、复杂的路由权限设置：比如 OA 系统、多种角色的权限配置。通常需要后端返回路由列表，前端渲染使用

5.  react 组件间传递数据的方式

6.  scoped 的作用是什么，原理是怎么实现的

    scoped 的实现原理：vue 通过 postcss 给每个 dom 元素添加一个以 data-开头的随机自定义属性实现的

7.  webpack 多页面是怎么实现

    - 在 src 下新建多个 js 文件和 html 模板：

    - 在 entry 里配置多个入口文件

      entry: {
      index: './src/index.js',
      list: './src/list.js',
      },

    - HtmlWebpackPlugin 里配置不同的 html 页面引用不同的 js 文件

8.  如何减少 webpack 打包的大小

9.  白屏时间， 首屏时间如何计算

    白屏时间，即输入网址回车后到页面开始渲染第一个元素的时间
    首屏时间，即输入网址回车后到页面开始渲染完成第一个屏幕元素的时间
    window.performance.timing 下的属性
    // .navigationStart 准备加载页面的起始时间
    // .domLoading ‘current document readiness’ 设置为 loading 的时间 (这个时候还木有开始解析文档)
    // .fetchStart 开始检查缓存或开始获取资源的时间

    白屏时间 = domloadng - fetchStart
    console.log('首屏图片加载完成 : ',window.lastImgLoadTime - window.performance.timing.navigationStart);
    //在最后一张图出来的时候打时间点

10. dom diff 算法 核心特点

1.同级对比 2. 根据索引对比 3.深度优先遍历

11. vue 的渲染优先级，会先判断是否有 el: "#app"的元素，有则渲染 id 为 app 的元素，
    然后选择是否有 template 的选项，有则渲染，template 选项的字符串，最后寻找是否有 render 函数，
    会渲染 render 函数返回的字符串。优先级 render > template > el

12. 浅拷贝 与 深拷贝

    浅拷贝与深拷贝是指 只针对**数组和对象**这种存放在堆内存里的复杂数据类型的复制，

    - 浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。
    - 但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。

拓展运算符和解构赋值都是浅拷贝， Object.assign()只深拷贝第一层，更深层都是浅拷贝。 JSON.stringify 是深拷贝，
但是无法处理函数，日期对象 ,null，正则对象

最好是使用 lodash 内的多边界处理的深拷贝

14. tree-shaking 中文意思为摇树，webpack5 production 生产环境会默认开始，用于优化包的体积，将无用的代码不加进最后的包中，
    一些没有使用到的方法和属性声明，以及一些不会进入的 if 语句不会打包进去

# v-on 指令常用修饰符：

.stop - 调用 event.stopPropagation()，禁止事件冒泡。
.prevent - 调用 event.preventDefault()，阻止事件默认行为。
.capture - 添加事件侦听器时使用 capture 模式。
.self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
.{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
.native - 监听组件根元素的原生事件。
.once - 只触发一次回调。
.left - (2.2.0) 只当点击鼠标左键时触发。
.right - (2.2.0) 只当点击鼠标右键时触发。
.middle - (2.2.0) 只当点击鼠标中键时触发。
.passive - (2.3.0) 以 { passive: true } 模式添加侦听器

# v-model 指令常用修饰符：

.lazy - 取代 input 监听 change 事件
.number - 输入字符串转为数字
.trim - 输入首尾空格过滤

注意：  如果是在自己封装的组件或者是使用一些第三方的 UI 库时，会发现并不起效果，这时就需要用`·.native 修饰符了

1. html 更新了，客户端如何知道需要替换缓存
   meta 标签 cahe-control=no-cache
2. etag 和 last-modified 优先级哪个更高
   优先级：Cache-Control>Expires>Etag>Last-modify

   Cache-Control 单位是秒数

3. 如何保证你前端项目的稳定性

4. 你如何部署一个前端项目

5. vue 循环中 key 的作用

6. css-loader 与 style-loader 的区别
   前者让 webpack 识别 css 文件转化为模块，后者将 css 插入到 style 标签中使用
7. url-loader 有什么作用
   设置图片转 base64 及转化的临界点
8. SSR 的底层原理

   服务端渲染就是在浏览器请求页面 URL 的时候，服务端将我们需要的 HTML 文本组装好，并返回给浏览器，
   这个 HTML 文本被浏览器解析之后，不需要经过 JavaScript 脚本的执行，
   即可直接构建出希望的 DOM 树并展示到页面中。这个服务端组装 HTML 的过程，叫做服务端渲染。

   好处

   1. 为了 seo
      低级爬虫：只请求 URL，URL 返回的 HTML 是什么内容就爬什么内容。
      高级爬虫：请求 URL，加载并执行 JavaScript 脚本渲染页面，爬 JavaScript 渲染后的内容。
      也就是说，低级爬虫对客户端渲染的页面来说，简直无能为力，因为返回的 HTML 是一个空壳，
      它需要执行 JavaScript 脚本之后才会渲染真正的页面。而目前像百度、谷歌、微软等公司，
      有一部分年代老旧的爬虫还属于低级爬虫，使用服务端渲染，对这些低级爬虫更加友好一些。
   2. 缩减白屏时间

9. defer async 有什么作用

   一般情况下，浏览器在加载 html 过程中遇到<script>标签时，会停下来先执行 script 标签内的代码。

   defer（推迟），和 async（同步）都是只针对<script>标签 src 外部引入脚本的情况，否则建议放 body 标签底部

   defer 是异步下载，即不会停止解析 html 文档，但是推迟执行，在 DOM 解析完成前执行

   async 是异步下载，但是下载完就会执行，也不会停止解析 html 文档。async 适合不会对 DOM 修改的第三方脚本，
   比如 google 的 analytics

   defer 适合与 DOM 有关联的脚本

10. 如何在未升级 http 协议的情况下打通 http 协议通道限制
    在 http1 下，同一个域名下浏览器给 TCP 打开的通道是 6 个，可以使用**多域名部署**的方式解决这个问题
    http2 有了多路复用之后，tcp 可以发送多个 http 请求解决了这个问题

11. 如何判断一个值是数组

    1. [] instanceof Array
    2. [].constructor === Array
    3. Array.isArray([])
    4. Object.prototype.toString.call(要判断的对象) === 'array'
       最安全是后两个，不会被修改结果

12. # 防抖(debounce)

    触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间

    # 节流(throttle)

    高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率

- 数字证书 就是互联网通讯中标志通讯各方身份信息的一串数字，提供了一种在互联网上验证通信实体身份的方式。

数字证书不是数字身份证，而是身份认证机构盖在数字身份证上的一个章或印（或者说加在数字身份证上的一个签名）。
其作用类似于现实生活中司机的驾驶执照或日常生活中的身份证。

CA 是什么？

上面提到的数字证书就是 CA 发行的。CA 是 Certificate Authority 的缩写，也叫“证书授权中心”。
它是负责管理和签发证书的第三方机构，作用是检查证书持有者身份的合法性，并签发证书，以防证书被伪造或篡改。

所以，CA 实际上是一个机构，负责“证件”印制核发。就像负责颁发身份证的公安局、负责发放行驶证、驾驶证的车管所。

CA 证书是什么？

顾名思义，CA 证书就是 CA 颁发的证书。 CA 证书也就我们常说的数字证书，包含证书拥有者的身份信息，
CA 机构的签名，公钥和私钥。身份信息用于证明证书持有者的身份；
CA 签名用于保证身份的真实性；公钥和私钥用于通信过程中加解密，从而保证通讯信息的安全性。

以上看完了还是很晕咋办？没关系，只要记得以下两点就可以了：CA 是权威可信的第三方机构，
是“发证机关”。CA 证书是 CA 发的“证件”，用于证明自身身份，就像身份证和驾驶证。

webpack 常用配置

mode：两种 mode 模式可供选择，一种是开发环境，命令为 webpack --mode = development，
打包出来的文件未经过压缩；一种是生产环境，命令是 webpack --mode = production ，打包出来的文件是经过压缩的。

entry：资源入口文件，所有的资源最后会打包成一个 JS 文件。

output：打包之后存放的文件路径。path 为相对路径，filename 为打包后的文件名。

module：rules 配置编译规则，test 正则匹配，exclude 排除特定条件，use-loader，
test 匹配到的解析器模块，use-options，与 use-loader 配合使用。

plugins：插件。plugins 与 loader 的区别在于，loader 只是一个解析模块，
比如将 ES5 解析成 ES6，LESS 文件解析成 CSS 文件，为了兼容浏览器。
而 plugins 是将 loader 之后的文件进行优化分类、压缩、提供公共代码等。

- cli ----- command line interface 命令行界面

Vue Cli 是一个基于 vue.js 进行快速开发的完整系统。使用 Vue 脚手架
之后我们开发的页面将实现城一个完整系统

Webpack 的运行流程是一个串行的过程,从启动到结束会依次执行以下流程 :

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数,得出最终的参数。
2. 开始编译：用上一步得到的参数初始化 Compiler 对象,加载所有配置的插件,执行对象的 run 方法开始执行编译。
3. 确定入口：根据配置中的 entry 找出所有的入口文件。
4. 编译模块：从入口文件出发,调用所有配置的 Loader 对模块进行翻译,再找出该模块依赖的模块,再递归本
   步骤直到所有入口依赖的文件都经过了本步骤的处理。
5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后,得到了每个模块被翻译后的最终内容以
   及它们之间的依赖关系。
6. 输出资源：根据入口和模块之间的依赖关系,组装成一个个包含多个模块的 Chunk,再把每个 Chunk 转换
   成一个单独的文件加入到输出列表,这步是可以修改输出内容的最后机会。
7. 输出完成：在确定好输出内容后,根据配置确定输出的路径和文件名,把文件内容写入到文件系统。

在以上过程中,Webpack 会在特定的时间点广播出特定的事件,插件在监听到感兴趣的事件
后会执行特定的逻辑,并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

- 高阶函数 map filter reduce

reduce 参数，第一个：一个回调方法，第二个： 前面回调函数返回值的初始值

回调函数的参数，

1. prev：上次调用函数的返回值
2. 当前项
3. index 值
4. 当前被遍历的数组

reduce 累乘
arr.reduce((pre, cur) => pre \* cur)

in 操作符用来判断某个属性属于某个对象，可以是对象的直接属性，也可以是通过 prototype 继承的属性。
in 右边可以是对象和数组，数组则是询问左边索引是否在数组存在

- 模块化
  nodejs 环境使用 commonJS 规范： 引入使用 require(), 导出模块使用 module.exports = {}

  import '' from './' 属于 esModule 规范 是 es6 的内容 项目中经过 babel 转换成 es5 所以可直接使用

70. tcp 长连接和 http 长连接区别: HTTP header(Connection: keep-alive), 指的是一个连接会保持一段时间, 而不是传输完数据就直接断开. TCP 长连接指的是 TCP 保活计时器, HTTP 的长连接本质上是 TCP 的长连接, TCP 的长连接通过心跳包建立.

71. UDP 如何实现可靠传输: QUIC: 基于 UDP,减少了握手时间/避免队头阻塞的多路复用
