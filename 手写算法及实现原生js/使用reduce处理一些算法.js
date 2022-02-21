// 累乘
let arr = [1,2,5,10]
const sum = arr.reduce((pre, cur) => pre * cur)
console.log(sum)


// 统计数组元素出现的次数

let arr1 = ['name','age','long','short','long','name','name']

const obj = arr1.reduce((pre, cur) => {
  if (cur in pre) {
    pre[cur]++
  } else {
    pre[cur] = 1
  }
  return pre
}, {})
console.log(obj)
// 去除数组中重复的元素

let arr2 = [1,32,3,2,2,1,5]
const arr2Result = arr2.reduce((pre, cur) => {
  if (!pre.includes(cur)) {
    pre.push(cur)
  }
  return pre
}, [])
console.log(arr2Result)

// 对对象的属性求和


let person = [
  {
      name: 'xiaoming',
      age: 18
  },{
      name: 'xiaohong',
      age: 17
  },{
      name: 'xiaogang',
      age: 19
  }
]



const sumObjAge = person.reduce((pre, cur) => {
  return pre += cur.age
}, 0)
console.log(sumObjAge)