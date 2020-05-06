# 第二週

忙碌是常態

## 聯合類型

联合类型（Union Types）表示取值可以为多种类型中的一种

### 舉個栗子

```javaScript
    let myFavoriteType: boolean | number
    myFavoriteType = true
    myFavoriteType = 99

    // error
    myFavoriteType = '99'
```

联合类型使用 | 分隔每个类型

### 访问联合类型的属性或方法

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，只能访问此联合类型的所有类型里共有的属性或方法


```javaScript
function getPhoneNumber(phone: string | number): number {
    // error
    return phone.length
    // Property 'length' does not exist on type 'number'.
}

// is right
function getPhoneNumber(phone: string | number): number {
    return phone.toString()
}
```

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型並只能使用該類型的屬性與方法

```javaScript
let myFavoriteNumber: string | number
myFavoriteNumber = 'Ninety-nine'
console.log(myFavoriteNumber.length) // 11
myFavoriteNumber = 99;
console.log(myFavoriteNumber.length) // 编译时报错

// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
```

## 对象的类型——接口

在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型

### 什么是接口

在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）

TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述


### 舉個栗子

```javaScript
interface GirlFriend { // 接口一般首字母大写
    name: string;
    age: number;
}

// 定義的類型屬性必須與接口一一對應 少與多都不可
let ex: GirlFriend = {
    name: '張鈞甯',
    // age: 18
}
// index.ts(6,5): error TS2322: Type '{ name: string; }' is not assignable to type 'GirlFriend'.
//   Property 'age' is missing in type '{ name: string; }'.

```

### 可选属性

有时我们希望不要完全匹配一个形状，那么可以用可选属性

```javaScript
interface GirlFriend {
    name: string;
    age?: number;
}

let ex: GirlFriend = {
    name: '張鈞甯'
    // gender: 'lady' 
    // 仍然不允许添加未定义的属性
}

```

### 任意属性

有时候我们希望一个接口允许有任意的属性

```javaScript
interface GirlFriend {
    name: string;
    age: number;
    [propName: string]: string; // 需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
}

// error
let ex: GirlFriend = {
    name: '張鈞甯',
    age: 18,
    gender: 'lady'
}
// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'GirlFriend'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.

```

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型

```javaScript
interface GirlFriend {
    name: string;
    age: number;
    [propName: string]: string | number;
}

```


### 只读属性

有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性

只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候

```javaScript
interface GirlFriend {
    index: number;
    name: string;
    age: number;
    [propName: string]: string | number;
}

let ex: GirlFriend = {
    index: 9,
    name: '張鈞甯',
    age: 18,
    gender: 'lady'
}

ex.index = 10
// index.ts(14,5): error TS2540: Cannot assign to 'index' because it is a constant or a read-only property.
```

## 数组的类型

在 TypeScript 中，数组类型有多种定义方式，比较灵活

### 「类型 + 方括号」表示法

```javaScript
let week: number[] = [1, 2, 3, 4, 5, 6, 7]

// error
week = [1, 2, '3', 4, 5, 6]
// Type 'string' is not assignable to type 'number'.

// 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制
week.push('7')
// Argument of type '"8"' is not assignable to parameter of type 'number'.
```

### 数组泛型

我们也可以使用数组泛型（Array Generic） Array<elemType> 来表示数组

```javaScript
let week: Array<number> = [1, 2, 3, 4, 5, 6, 7]

```

### 用接口表示数组

```javaScript
interface Week {
    [index: number]: number;
}

let week: NumberArray = [1, 2, 3, 4, 5, 6, 7]
// 接口的方式一般只用在类数组

```

### 类数组

类数组（Array-like Object）不是数组类型，比如 arguments

```javaScript
function newGirlFriend() {
    let args: number[] = arguments
}
// Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.

interface GirlFriend {
    index: number;
    name: string;
    age: number;
    [propName: string]: string | number;
}

function newGirlFriend() {
    let args: GirlFriend = arguments
}
```

### any 在数组中的应用

用 any 表示数组中允许出现任意类型

```javaScript
let exInfo: any[] = ['張鈞甯', 25, { favoritePet: 'cat' }]

```

## 參考
[TypeScript 入門教程](https://ts.xcatliu.com/basics/union-types "TypeScript 入門教程")