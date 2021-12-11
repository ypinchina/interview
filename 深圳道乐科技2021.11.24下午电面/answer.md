// 7.请你说一下vue里面provide和inject两个配置项
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