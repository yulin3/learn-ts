# 第九週

忙碌是常態

## 泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

### 舉個栗子

实现一个函数 createArray，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值

```javaScript
// 使用數組泛型每一項都是any
function createArray(length: number, value: any): Array<any> {
    let result = []
    for (let i = 0; i < length; i++) {
        result[i] = value
    }
    return result
}

createArray(3, 'x'); // ['x', 'x', 'x']

// 如果我們預期的是每一項都是輸入的value類型則可以用泛型實現
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value
    }
    return result
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
```

### 多个类型参数

定义泛型的时候，可以一次定义多个类型参数

### 舉個栗子

```javaScript
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}

swap([7, 'seven']) // ['seven', 7]

```

### 泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法

### 舉個栗子

```javaScript
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length) // error 泛型 T 不一定包含属性 length
    return arg
}

// 我们可以对泛型进行约束，只允许这个函数传入那些包含 length 属性的变量
interface Lengthwise {
    length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length)
    return arg
}

// 多个类型参数之间也可以互相约束 T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id]
    }
    return target
}

let x = { a: 1, b: 2, c: 3, d: 4 }

copyFields(x, { b: 10, d: 20 })

```

### 泛型接口

之前学习过，可以使用接口的方式来定义一个函数需要符合的形状

### 舉個栗子

```javaScript
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1
}

// 使用含有泛型的接口来定义函数的形状
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>
}

let createArray: CreateArrayFunc<any> // 此时在使用泛型接口的时候，需要定义泛型的类型-為何
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = []
    for (let i = 0; i < length; i++) {
        result[i] = value
    }
    return result
}

createArray(3, 'x'); // ['x', 'x', 'x']

```

### 泛型类

与泛型接口类似，泛型也可以用于类的类型定义中

### 舉個栗子

```javaScript
class GenericNumber<T> {
    zeroValue: T
    add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function(x, y) { return x + y; }

```

### 泛型参数的默认类型

在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用(什麼情況下從實際值推斷不出?)

### 舉個栗子

```javaScript
function createArray<T = string>(length: number, value: T): Array<T> {}

```

## 声明合并

如果定义了多個相同名字的函数、接口或类，那么它们会合并成一个类型

### 函数的合并

之前学习过，我们可以使用重载定义多个函数类型

### 舉個栗子

```javaScript
function reverse(x: number): number; // 函數定義
function reverse(x: string): string; // 函數定義
function reverse(x: number | string): number | string { // 函數實現
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''))
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('')
    }
}

```

### 接口的合并

接口中的属性在合并时会简单的合并到一个接口中，注意，合并的属性的类型必须是唯一的

### 舉個栗子

```javaScript
interface Alarm {
    price: number
}

interface Alarm {
    weight: number
}

// 相當於
interface Alarm {
    price: number
    weight: number
}

interface Alarm {
    price: string  // 类型不一致，会报错
    weight: number
}

```
```javaScript
// 接口中方法的合并，与函数的合并一样
interface Alarm {
    price: number
    alert(s: string): string
}
interface Alarm {
    weight: number
    alert(s: string, n: number): string
}

// 相當於
interface Alarm {
    price: number
    weight: number
    alert(s: string): string
    alert(s: string, n: number): string
}

```
### 类的合并

类的合并与接口的合并规则一致

## 參考
[TypeScript 入門教程](https://ts.xcatliu.com/advanced/generics.html "TypeScript 入門教程")