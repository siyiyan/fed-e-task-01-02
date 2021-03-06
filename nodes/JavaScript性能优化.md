<!-- TOC -->

- [内容概要](#内容概要)
    - [内存管理](#内存管理)
    - [垃圾回收与常见GC算法](#垃圾回收与常见gc算法)
    - [V8引擎的垃圾回收](#v8引擎的垃圾回收)
    - [Performance工具](#performance工具)
    - [代码优化实例](#代码优化实例)

<!-- /TOC -->
###内容概要

####内存管理
>介绍 
>  - 内存:由可读写单元组成，表示一片可操作空间
>  - 管理：人为的去操作一片空间的申请、使用和释放
>  - 内存管理：开发者主动申请空间、使用空间、释放空间
>  - 管理流程：申请-使用-释放

>javascript中的内存管理
>  - 申请内存空间
>  - 使用内存空间
>  - 释放内存空间

>javascript中的垃圾
>  - javascript中内存管理是自动的
>  - 对象不再被引用时是垃圾
>  - 对象不能从根上访问到时是垃圾

>javascript中的可达对象
>  - 可以访问到的对象就是可达对象（引用、作用域链）
>  - 可达的标准就是从根出发是否能够被找到
>  - javascript中的根就可以理解为是全局变量对象

####垃圾回收与常见GC算法

>GC定义与作用
>  - GC就是垃圾回收机制的简写
>  - GC可以找到内存中垃圾、并释放和回收空间

>GC里的垃圾是什么
>  - 程序中不再需要使用的对象
>  - 程序中不能再访问到的对象

>GC算法是什么
>  - GC是一种机制，垃圾回收器完成具体的工作
>  - 工作的内容就是查找垃圾释放空间、回收空间
>  - 算法就是工作时查找和回收所遵循的规则

>常见GC算法
>  - 引用计数
>  - 标记清除
>  - 标记整理
>  - 分代回收

>引用计数算法
>  - 核心思想：设置引用数，判断当前引用数是否为0
>  - 引用计数器
>  - 引用关系改变时修改引用数字
>  - 引用数字为0 时立即回收

>引用计算算法的优点
>  - 发现垃圾时立即回收
>  - 最大限度减少程序暂停，减少程序卡顿时间
 
>引用计算算法缺点
>  - 无法回收循环引用的对象
>  - 时间开销大，资源消耗大

>标记清除算法
>  - 核心思想：分标记和清除二个阶段完成
>  - 遍历所有对象找标记活动对象
>  - 遍历所有对象清除没有标记对象
>  - 回收相应的控件

>标记清除算法优点
>  - 可以回收循环引用的对象：相对于引用技术而言，我们可以解决循环引用不能回收的问题

>标记清除算法优点
>  - 容易产生碎片化空间，浪费空间：相对于垃圾回收，会产生一个空间碎片化的问题，不能让空间得到最大化的使用
>  - 不会立即回收垃圾对象

>标记整理算法原理
>  - 标记整理可以看做是标记清除的增强
>  - 标记阶段的操作和标记清除一致
>  - 清除阶段会先执行整理，移动对象位置

>标记整理优点
>  - 减少碎片化空间 

>标记整理缺点
>  - 不会立即回收垃圾对象

>常见GC算法
>  - 引用计数
>  - 标记清除
>  - 标记整理

####V8引擎的垃圾回收

>认识V8
>  - V8是一款主流的JavaScript执行引擎
>  - V8采用即时编译
>  - V8内存设置上限
>    - 64位不超过1.5G,32位不超过800M

>V8垃圾回收策略
>  - 采用分代回收的思想
>  - 内存分为新生代、老生代
>  - 针对不同对象采用不同算法

>V8中常用的GC算法
>  - 分代回收
>  - 空间复制
>  - 标记清除
>  - 标记整理
>  - 标记增量

>V8内存分配
>  - V8内存空间一分为二
>  - 小空间用于存储新生代对象（32M | 16M）
>  - 新生代指的是存活时间较短的对象

>新生代对象回收实现
>  - 回收过程采用复制算法+标记整理
>  - 新生代内存区分为二个大小空间
>  - 使用空间为From，空闲空间为To
>  - 活动对象存储于From空间
>  - 标记整理后将活动对象拷贝至To
>  - From与To交换空间完成释放

>回收细节说明
>  - 拷贝过程中可能出现晋升
>  - 晋升就是将新生代对象移动至老生代
>  - 一轮GC还存活的新生代需要晋升
>  - To空间的使用率超过了25%

>老生代对象说明
>  - 老生代对象存放在右侧老生代区域
>  - 64位操作系统1.4G,32操作系统700M
>  - 老生代对象就是指存活时间较长的对象

>老年代对象回收实现
>  - 主要采用标记清除、标记整理、增量标记算法
>  - 首先使用标记清除完成垃圾空间的回收
>  - 采用标记整理进行空间优化
>  - 采用增量标记进行效率提升

>细节对比
>  - 新生代区域垃圾回收使用空间换时间
>  - 老生代区域垃圾回收不适合复制算法

>V8总结
>  - V8是一款主流的JavaScript执行引擎
>  - V8内存设置上限
>  - V8采用基于分代回收思想实现垃圾回收
>  - V8内存分为新生代和老生代
>  - V8垃圾回收常见的GC算法

####Performance工具

>为什么使用Performance
>  - GC的目的是为了实现内存空间的良性循环
>  - 良性循环的基石是合理使用
>  - 时刻关注才能确定是否合理
>  - Performance提供多种监控方式

>Performance使用步骤
>  - 打开浏览器输入目标网址
>  - 进入开发人员工具面板，选择性能
>  - 开启录制功能，访问具体界面
>  - 执行用户行为，一段时间后停止录制
>  - 分析界面中记录的内存信息

>内存问题的外在表现
>  - 页面出现延迟加载或经常性暂停
>  - 页面持续性出现糟糕的性能
>  - 页面的性能随时间延长越来越差

>界定内存问题的标准
>  - 内存泄露：内存使用持续升高
>  - 内存膨胀：在多数设备上都存在性能问题
>  - 频繁垃圾回收：通过内存变化图进行分析

>监控内存的几种方式
>  - 浏览器任务管理器
>  - Timeline时序图记录
>  - 堆快照查找分离DOM
>  - 判断是否存在频繁的垃圾回收

>任务管理器监控内存
>  - Shift + Esc （JavaScript内存小括号内的数值是否一直上升）

>Timeline记录内存
>  - Performance的JS堆-蓝色线条

>什么是分离DOM
>  - 界面元素存活在DOM树上
>  - 垃圾对象时的DOM节点（脱离并不再引用）
>  - 分离状态的DOM节点（脱离有引用）

>堆快照查找分离DOM
>  - 浏览器开发工具-内存-获取快照-在class filter中输入deta

>为什么确定频繁垃圾回收
>  - GC工作时应用程序是停止的
>  - 频繁且过长的GC会导致应用假死
>  - 用户使用中感知应用卡顿

>确定频繁的垃圾回收
>  - Timeline中频繁的上升下降
>  - 任务管理器中数据频繁的增加减小

>Performance使用
>  - Performance使用流程
>  - 内存问题的相关分析
>  - Performance时序图监控内存变化
>  - 任务管理器监控内存变化
>  - 堆快照查找分离DOM

####代码优化实例

>如何精准测试JavaScript性能
>  - 本质上就是采集大量的执行样本进行数学统计和分析
>  - 使用基于 Benchmark.js 的 （https://jsperf.com/） 完成

>Jsperf使用流程
>  - 使用GitHub账号登录
>  - 填写个人信息（非必须）
>  - 填写详细的测试用例信息（title、slug）
>  - 填写准备代码（DOM操作时经常使用）
>  - 填写必要有 setup 与 teardown 代码
>  - 填写测试代码片段

>为什么要慎用全局变量
>  - 全局变量定义在全局执行上下文，是所有作用域链的顶端
>  - 全局执行上下文一直存在于上下文执行栈，直到程序退出
>  - 如果某个局部作用域出现了同名变量则会遮蔽或污染全局

>将使用中无法避免的全局变量缓存到局部
>在原型对象上新增实例对象需要的方法

>闭包特点
>  - 外部具有指向内部的引用
>  - 在“外”部作用域访问“内”部作用域的数据

>关于闭包 
>  - 闭包是一种强大的语法
>  - 闭包使用不当很容易出现内存泄露
>  - 不要为了闭包而闭包

>JavaScript中的面向对象
>  - js不需要属性的访问方法，所有属性都是外部可见的
>  - 使用属性访问方法只会增加一层重定义，没有访问的控制力

>for循环优化
>  - length要定义一下

>采用最优循环方式
>  - forEach优于定义len优于for in

>节点的添加操作必然会有回流和重绘

