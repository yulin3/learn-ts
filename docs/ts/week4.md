# 第四週

忙碌是常態

## 声明文件

当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能

### 什么是声明语句

```javaScript
// 编译器并不知道 $ 或 jQuery 是什么东西
jQuery('#foo')
// ERROR: Cannot find name 'jQuery'

// 我们需要使用 declare var 来定义它的类型
declare var jQuery: (selector: string) => any

```

declare var 并没有真的定义一个变量，只是定义了全局变量 jQuery 的类型，仅仅会用于编译时的检查，在编译结果中会被删除

### 什么是声明文件

通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，必需以 .d.ts 为后缀，这就是声明文件

```javaScript
// src/jQuery.d.ts
declare var jQuery: (selector: string) => any

```

### 第三方声明文件

当然，jQuery 的声明文件不需要我们定义了，社区已经帮我们定义好了：[jQuery in DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/jquery/index.d.ts "jQuery in DefinitelyTyped")

推荐的是使用 @types 统一管理第三方库的声明文件

```javaScript
npm install @types/jquery --save-dev

```

### 书写声明文件

当一个第三方库没有提供声明文件时，我们就需要自己书写声明文件了

库的使用场景主要有以下几种：
  + 全局变量：通过 `<script>` 标签引入第三方库，注入全局变量
  + npm 包：通过 import foo from 'foo' 导入，符合 ES6 模块规范
  + UMD 库：既可以通过 `<script>` 标签引入，又可以通过 import 导入
  + 直接扩展全局变量：通过 `<script>` 标签引入后，改变一个全局变量的结构
  + 在 npm 包或 UMD 库中扩展全局变量：引用 npm 包或 UMD 库后，改变一个全局变量的结构
  + 模块插件：通过 `<script>` 或 import 导入后，改变另一个模块的结构

### 全局变量

使用全局变量的声明文件时，如果是以 npm install @types/xxx --save-dev 安装的，则不需要任何配置。如果是将声明文件直接存放于当前项目中，则建议和其他源码一起放到 src 目录下（或者对应的源码目录下）

全局变量的声明文件主要有以下几种语法：
  + declare var 声明全局变量
  + declare function 声明全局方法
  + declare class 声明全局类
  + declare enum 声明全局枚举类型
  + declare namespace 声明（含有子属性的）全局对象
  + interface 和 type 声明全局类型

一般来说，全局变量都是禁止修改的常量，所以大部分情况都应该使用 const 而不是 var 或 let
声明语句中只能定义类型，切勿在声明语句中定义具体的实现

```javaScript
declare const jQuery = function(selector) {
    return document.querySelector(selector)
};
// ERROR: An implementation cannot be declared in ambient contexts.

// declare function 用来定义全局函数的类型。jQuery 其实就是一个函数，所以也可以用 function 来定义
declare function jQuery(selector: string): any

// 在函数类型的声明语句中，函数重载也是支持的
declare function jQuery(selector: string): any
declare function jQuery(domReadyCallback: () => any): any

// 当全局变量是一个类的时候，我们用 declare class 来定义它的类型
// src/Animal.d.ts

declare class Animal {
    name: string
    constructor(name: string)
    sayHi(): string
}

// 使用 declare enum 定义的枚举类型也称作外部枚举（Ambient Enums）
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
```

### interface 和 type

```javaScript
// src/jQuery.d.ts
interface AjaxSettings {
    method?: 'GET' | 'POST'
    data?: any
}
declare namespace jQuery {
    function ajax(url: string, settings?: AjaxSettings): void
}

// 暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。故最好将他们放到 namespace 下
declare namespace jQuery {
    interface AjaxSettings {
        method?: 'GET' | 'POST'
        data?: any
    }
    function ajax(url: string, settings?: AjaxSettings): void
}

// src/index.ts
let settings: jQuery.AjaxSettings = {
    method: 'POST',
    data: {
        name: 'foo'
    }
}

```

### 三斜线指令

类似于声明文件中的 import，它可以用来导入另一个声明文件。与 import 的区别是，当且仅当在以下几个场景下，我们才需要使用三斜线指令替代 import
  + 当我们在书写一个全局变量的声明文件时
  + 当我们需要依赖一个全局变量的声明文件时

在全局变量的声明文件中，是不允许出现 import, export 关键字的。一旦出现了，那么他就会被视为一个 npm 包或 UMD 库，就不再是全局变量的声明文件了。故当我们在书写一个全局变量的声明文件时，如果需要引用另一个库的类型，那么就必须用三斜线指令

```javaScript
// types/jquery-plugin/index.d.ts
// 书写一个全局变量的声明文件
/// <reference types="jquery" />

declare function foo(options: JQuery.AjaxSettings): string

// types/node-plugin/index.d.ts
// 依赖一个全局变量的声明文件
/// <reference types="node" />

export function foo(p: NodeJS.Process): string

```

## 内置对象

内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准

TypeScript 库中內置對象的[定義處](https://github.com/Microsoft/TypeScript/tree/master/src/lib "定義處"), 該定义中不包含 Node.js 部分

### ECMAScript 的内置对象

ECMAScript 标准提供的内置对象有： Boolean、Error、Date、RegExp 等

```javaScript
let bool: Boolean = new Boolean(1)
let err: Error = new Error('Error occurred')
let date: Date = new Date()
let reg: RegExp = /[a-z]/

```

更多的内置对象，可以查看 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects "MDN") 的文档

### DOM 和 BOM 的内置对象

DOM 和 BOM 提供的内置对象有：Document、HTMLElement、Event、NodeList 等

```javaScript
let body: HTMLElement = document.body
let allDiv: NodeList = document.querySelectorAll('div')
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
})

```

### TypeScript 核心库的定义文件

TypeScript 核心库的定义文件中定义了所有浏览器环境需要用到的类型，并且是预置在 TypeScript 中的
当我們在使用一些常用的方法的时候，TypeScript 实际上已经帮你做了很多类型判断的工作，舉個栗子

```javaScript
Math.max(6, '99')
// index.ts(1,14): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'

```

### 用 TypeScript 写 Node.js

Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件

```
npm install @types/node --save-dev

```

## 參考
[TypeScript 入門教程](https://ts.xcatliu.com/basics/type-of-function "TypeScript 入門教程")