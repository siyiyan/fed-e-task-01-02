####简答题

1、描述引用计数的工作原理，和优缺点？

>答： 
>   - 工作原理：
>       - 核心思想：设置引用数，判断当前引用数是否为0
>       - 引用计数器
>       - 引用关系改变时修改引用数字
>       - 引用数字为0 时立即回收
>   - 优点：
>       - 发现垃圾时立即回收
>       - 最大限度减少程序暂停，减少程序卡顿时间
>   - 缺点：
>       - 无法回收循环引用的对象
>       - 时间开销大，资源消耗大

2、描述标记整理算法的工作流程？
  
>答：
>   - 工作流程：
>       - 标记整理可以看做是标记清除的增强
>       - 标记阶段的操作和标记清除一致
>       - 清除阶段会先执行整理，移动对象位置

3、描述V8中新生代存储区垃圾回收的流程？
 
>答：
>   - 新生代对象回收实现:
>       - 回收过程采用复制算法+标记整理
>       - 新生代内存区分为二个大小空间
>       - 使用空间为From，空闲空间为To
>       - 活动对象存储于From空间
>       - 标记整理后将活动对象拷贝至To
>       - From与To交换空间完成释放
>   - 回收细节说明
>       - 拷贝过程中可能出现晋升
>       - 晋升就是将新生代对象移动至老生代
>       - 一轮GC还存活的新生代需要晋升
>       - To空间的使用率超过了25%

4、描述标记增量算法在何时使用，及工作原理？
 
>答：
>   - 增量标记算法：将一整段的垃圾回收操作，拆分成多个小步，组合完成整个垃圾回收操作。我们知道，当垃圾回收工作的时候，会阻塞JS程序执行，当我们需要优化垃圾回收的效率时，就可以使用增量标记算法。

>   - 优点：让垃圾回收与程序执行可以交替完成，让时间消耗更合理，达到效率优化的好处。

>   - 工作原理：
>       - JS 程序执行的过程中，会伴随着垃圾回收的工作
>       - 当垃圾回收工作时，需要遍历对象进行标记，此时不需要将所有对象进行标记，可以先将直接可达的对象进行标记，此时停下标记操作
>       - 然后让JS程序执行一会，之后，再让 GC 机制去做二步的标记操作，去标记那些间接可达的对象
>       - 重复以上两步，让程序执行和垃圾回收的标记操作交替执行，来达到优化效率和提升用户体验的目的
>       - 直到标记操作完成之后，最后执行垃圾回收
--------------------------

####代码题1
#####基于以下代码完成下面的四个练习

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
 
######练习1：使用函数组合fp.flowRight()重新实现下面这个函数

    let isLastInStock = function(cars){
        //获取最后一条数据
        let last_car = fp.last(cars)
        //获取最后一条数据的 in_stock 属性值
        return fp.prop('in_stock', last_car)
    }

>答：
    let f = fp.flowRight(fp.prop('in_stock'), fp.last)
    console.log(f(cars))
    //false

######练习2：使用fp.flowRight()、fp.prop()和fp.first()获取第一个car的name
 
>答：
    let f = fp.flowRight(fp.prop('name'), fp.first)
    console.log(f(cars))
    //Ferrari FF

######练习3：使用帮助函数_average重构averageDollarValue,使用函数组合的方式实现

    let _average = function(xs){
        return fp.reduce(fp.add, 0, xs) / xs.length
    }   //  <- 无需改动

    let averageDollarValue = function(cars){
        let dollar_value = fp.map(function(car){
            return car.dollar_value
        }, cars)

        return _average(dollar_value)
    }
 
>答：
    let averageDollarValue = fp.flowRight(_average, fp.map(fp.prop('dollar_value')))
    console.log(averageDollarValue(cars))
    //790700


######练习4：使用flowRight写一个sanitizeNames()函数，返回一个下划线连接的小写字符串，把数组中name转换为这种形式：例如：sanitizeNames(["Hello World"]) => ["hello_world"]

    let _underscore = fp.replace(/\W+/g, '_')   // 《-- 无需改动，并在 sanitizeNames中使用它

>答：
    let sanitizeNames = fp.flowRight(fp.map(fp.flowRight(_underscore, fp.toLower, fp.prop('name'))))
    console.log(sanitizeNames(cars))
    //[ 'ferrari_ff',
    // 'spyker_c12_zagato',
    // 'jaguar_xkr_s',
    // 'audi_r8',
    // 'aston_martin_one_77',
    // 'pagani_huayra' ]


####代码题2

#####基于下面提供的代码，完成后续的四个练习

    // support.js
    class Container {
        static of (value) {
            return new Container(value)
        }

        constructor (value) {
            this._value = value
        }

        map (fn) {
            return Container.of(fn(this._value))
        }
    }

    class Maybe{
        static of (value){
            return new Maybe(x)
        }

        isNothing () {
            return this._value === null || this._value === undefined
        }

        constructor (x) {
            this._value = x
        }

        map (fn) {
            return this.isNothing() ? this : Maybe.of(fn(this._value))
        }
    }

    module.exports = {
        Maybe,
        Container
    }

######练习1：使用fp.add(x,y)和fp.map(f,x)创建一个能让function里的值增加的函数exl

    const fp = require('lodash/fp')
    const {Maybe, Container} = require('./support')

    let maybe = Maybe.of([5, 6, 1])
    let exl = // ...你需要实现的位置
 
>答：
    let ex1 = maybe.map(x => fp.map(fp.add(1), x))
    console.log(ex1)
    //Maybe { _value: [ 6, 7, 2 ] }

######练习2：实现一个函数ex2，能够使用fp.first获得列表的第一个元素

    const fp = require('lodash/fp')
    const {Maybe, Container} = require('./support')

    let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
    let ex2 = // ...你需要实现的位置
 
>答：
    let ex2 = fn => xs.map(fn)._value;
    console.log(ex2(fp.first));
    //do

######练习3：实现一个函数ex3, 使用safeProp 和 fp.first找到user的名字的首字母

    const fp = require('lodash/fp')
    const {Maybe, Container} = require('./support')

    let safeProp = fp.curry(function (x, o){
        return Maybe.of(o[x])
    })
    let = user = {id: 2, name: "Albert"}
    let ex3 = // ...你需要实现的位置
 
>答：
    let ex3 = () => safeProp('name', user).map(fp.first)._value;
    console.log(ex3()); 
    // A

######练习4：使用Maybe重写ex4，不要有if语句

    const fp = require('lodash/fp')
    const {Maybe, Container} = require('./support')

    let ex4 = function (n){
        if (n) { return parseInt(n) }
    }
 
>答：
    let ex4 = n => Maybe.of(n).map(parseInt)._value;
    console.log(ex4('100')); 
    // 100