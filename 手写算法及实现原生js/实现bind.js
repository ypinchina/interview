var name = "Windows"
var object = {
  name: "Mac",
  getNameFunc: function() {
    return function () {
      return this.name
    }
  }
}
let a = object.getNameFunc()()