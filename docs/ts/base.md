# 第一週

開始總是美好的

## 原始數據類型

原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的 Symbol

本节主要介绍前五种原始数据类型在 TypeScript 中的应用

### 布爾值

使用 boolean 定义布尔值类型

```javaScript
let isBoolean: boolean = false
```

::: warning 注意
使用构造函数 Boolean 实例化的对象不是布尔值, new Boolean() 返回的是一个 Boolean 对象
:::

```javaScript
let isBoolean: boolean = new Boolean(true)

// Type 'Boolean' is not assignable to type 'boolean'.
// 'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.

// is right
let isBoolean: Boolean = new Boolean(true)
```
在 TypeScript 中，boolean 是 JavaScript 中的基本类型，而 Boolean 是 JavaScript 中的构造函数。其他基本类型（除了 null 和 undefined）一样，不再赘述

### 数值

使用 number 定义数值类型

```javaScript
let decLiteral: number = 99
let hexLiteral: number = 0x63 // ES6 中的十六進制
let binaryLiteral: number = 0b1100011 // ES6 中的二进制表示法
let octalLiteral: number = 0o143 // ES6 中的八进制表示法
let notANumber: number = NaN
let infinityNumber: number = Infinity

// 编译结果
var decLiteral = 99
var hexLiteral = 0x63 // 運行時環境支持直接使用十六進制
var binaryLiteral = 99
var octalLiteral = 99
var notANumber = NaN
var infinityNumber = Infinity
// 其中 0b1010 和 0o744 是 ES6 中的二进制和八进制表示法，它们会被编译为十进制数字
```

### 字符串

使用 string 定义字符串类型

```javaScript
let age: number = 18

let sentence: string = `Hello, I'm ${age} years old.` // 模板字符串
```

### 空值

使用 void 表示没有任何返回值的函数

```javaScript
function alertName(): void {
    alert('My name is Jerry')
}

// 声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null
let unusable: void = undefined
```

### Null 和 Undefined

使用 null 和 undefined 来定义这两个原始数据类型

```javaScript
let u: undefined = undefined
let n: null = null
```

与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量

```javaScript
// 这样不会报错
let num: number = undefined
let u: undefined
let num: number = u

// Type 'void' is not assignable to type 'number'.
let u: void
let num: number = u
```

## 任意值

任意值（Any）用来表示允许赋值为任意类型

### 什么是任意值类型

```javaScript
// 如果是一个普通类型，在赋值过程中改变类型是不被允许的
let age: number = 18
age = 'eighteen'
// index.ts(2,1): error TS2322: Type 'string' is not assignable to type 'number'.

// 但如果是 any 类型，则允许被赋值为任意类型
let age: any = 18
age = 'eighteen'
```

### 任意值的属性和方法
```javaScript
// 在任意值上访问任何属性都是允许的
let anyThing: any = 'Jerry'
console.log(anyThing.father)

// 同樣方法也是被允許的
let anyThing: any = 'Jerry'
anyThing.setFavorite('basketball')
```

可以认为，声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值

::: warning 注意
变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型

雖然 Any 很方便，但請減少使用以防止變成AnyScript
:::

```javaScript
let anyThing
anyThing.age = 18
anyThing.setFavorite('cat')
```

## 類型推論

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型

### 什么是类型推论

```javaScript
// 以下代码虽然没有指定类型，但是会在编译的时候报错
let age = 18
age = 'eighteen'
// index.ts(2,1): error TS2322: Type 'string' is not assignable to type 'number'.

// numberArray = [<number>]
let numberArray: Array = [0, 1]
// error TypeScript會根據賦值類型進行推斷
x.push('2')

```
TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论

::: warning 注意
如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查
:::

## 參考
[TypeScript 入門教程](https://ts.xcatliu.com/basics/primitive-data-types "TypeScript 入門教程")