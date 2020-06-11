

//练习1：使用fp.add(x,y)和fp.map(f,x)创建一个能让function里的值增加的函数exl
// const fp = require('lodash/fp')
// const {Maybe, Container} = require('./support')
            

// let maybe = Maybe.of([5, 6, 1])  
//let exl = // ...你需要实现的位置

// let ex1 = n => maybe.map(arr => fp.map(v => fp.add(v, n), arr));
// console.log(ex1(1)); // 数组每一项加1
//Maybe { _value: [ 6, 7, 2 ] }

// let ex1 = maybe.map(x => fp.map(fp.add(1), x))
// console.log(ex1)
//Maybe { _value: [ 6, 7, 2 ] }




//练习2：实现一个函数ex2，能够使用fp.first获得列表的第一个元素
// const fp = require('lodash/fp')
// const {Maybe, Container} = require('./support')

// let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
// //let ex2 = // ...你需要实现的位置
// let ex2 = fn => xs.map(fn)._value;
// console.log(ex2(fp.first));
// //do





//练习3：实现一个函数ex3, 使用safeProp 和 fp.first找到user的名字的首字母
// const fp = require('lodash/fp')
// const {Maybe, Container} = require('./support')

// let safeProp = fp.curry(function (x, o){
//     return Maybe.of(o[x])
// })
// let = user = {id: 2, name: "Albert"}
//let ex3 = // ...你需要实现的位置

//第一种写法
// let ex3 = fp.flowRight(fp.map(fp.first), safeProp('name'))
// console.log(ex3(user))
//[ 'A' ]

// let ex3 = () => safeProp('name', user).map(fp.first)._value;
// console.log(ex3()); 
// A






//练习4：使用Maybe重写ex4，不要有if语句
// const fp = require('lodash/fp')
// const {Maybe, Container} = require('./support')

// let ex4 = function (n){
//     if (n) { return parseInt(n) }
// }

// let ex4 = n => Maybe.of(n).map(parseInt)._value;
// console.log(ex4('100')); 
// // 100

// let ex4 = fp.flowRight(fp.map(parseInt), Maybe.of)
// console.log(ex4('100')); 
// //[ 100 ]
