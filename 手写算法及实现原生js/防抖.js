// 原理 使用setTimeout
function debounce(fn, delay) {
  var timer
  timer = setTimeout(() => {
    clearTimeout(timer)
    fn()
  }, delay);
}