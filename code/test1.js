const fp = require('lodash/fp')

//数据
//horsepower 马力， dollar_value 价格， in_stock 库存
const cars = [
    {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
    {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
    {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
    {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
    {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
    {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false},
]



//练习1：使用函数组合fp.flowRight()重新实现下面这个函数
// let isLastInStock = function(cars){
//     //获取最后一条数据
//     let last_car = fp.last(cars)
//     //获取最后一条数据的 in_stock 属性值
//     return fp.prop('in_stock', last_car)
// }
// let f = fp.flowRight(fp.prop('in_stock'), fp.last)
// console.log(f(cars))
// //false


//练习2:使用fp.flowRight()、fp.prop()和fp.first()获取第一个car的name
// let f = fp.flowRight(fp.prop('name'), fp.first)
// console.log(f(cars))
// //Ferrari FF




//练习3：使用帮助函数_average重构averageDollarValue,使用函数组合的方式实现
// let _average = function(xs){
//     return fp.reduce(fp.add, 0, xs) / xs.length
// }   //  <- 无需改动

// let averageDollarValue = function(cars){
//     let dollar_value = fp.map(function(car){
//         return car.dollar_value
//     }, cars)

//     return _average(dollar_value)
// }

// let averageDollarValue = fp.flowRight(_average, fp.map(fp.prop('dollar_value')))
// console.log(averageDollarValue(cars))
// //790700




//练习4：使用flowRight写一个sanitizeNames()函数，返回一个下划线连接的小写字符串，把数组中name转换为这种形式：例如：sanitizeNames(["Hello World"]) => ["hello_world"]
// let _underscore = fp.replace(/\W+/g, '_')   // 《-- 无需改动，并在 sanitizeNames中使用它
// let sanitizeNames = fp.flowRight(fp.map(fp.flowRight(_underscore, fp.toLower, fp.prop('name'))))
// console.log(sanitizeNames(cars))
//[ 'ferrari_ff',
// 'spyker_c12_zagato',
// 'jaguar_xkr_s',
// 'audi_r8',
// 'aston_martin_one_77',
// 'pagani_huayra' ]
