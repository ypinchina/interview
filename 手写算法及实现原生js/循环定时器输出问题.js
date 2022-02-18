for (var i = 0; i < 4; i++) {
  setTimeout(function () {
    console.log(i);
  }, 300);
}

请问打印结果是？

4个4

如何修改才能正确顺序输出？说出可以解决的方法


三个方法

1.  var 改成let
for (let i = 0; i < 4; i++) {
  setTimeout(function () {
    console.log(i);
  }, 300);
}

2. setTimeout第三个参数
for (var i = 0; i < 4; i++) {
  setTimeout(function (i) {
    console.log(i);
  }, 300, i);
}

3. 闭包
for (var i = 0; i < 4; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, 300)
  })(i)
}