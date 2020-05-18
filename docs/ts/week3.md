# 第三週

忙碌是常態

## 函数類型

[​函数是 JavaScript 中的一等公民](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch2.html "​函数是 JavaScript 中的一等公民")

### 函数声明

在 JavaScript 中，有两种常见的定义函数的方式——函数声明和函数表达式

```javaScript
// 1.函数声明（Function Declaration）
function getName(name) {
    return `my name is ${name}`
}
​
// 2.函数表达式（Function Expression）
let getName = function (name) {
    return `my name is ${name}`
}

```

一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到

```javaScript
function getName(name: string): string {
    return `my name is ${name}`
}

// 输入多余的（或者少于要求的）参数，是不被允许的
getName('abby', 'kitty')
// index.ts(4,1): error TS2346: Supplied parameters do not match any signature of call target

getName()
// index.ts(4,1): error TS2346: Supplied parameters do not match any signature of call target

```

### 函数表达式

```javaScript
let getName = function (name: string): string {
    return `my name is ${name}`
}
// 这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 getName，是通过赋值操作进行类型推论而推断出来的

// 手动给 getName 添加类型
let getName: (name: string) => string = function (name: string): string {
    return `my name is ${name}`
}

```

::: warning 注意
注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>
在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型
:::

### 用接口定义函数的形状

```javaScript
// 采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变
interface isString {
    (source: string): boolean
}
​
let getType: isString
getType = function(source: string) {
    return typeof('source') === 'string'
}

```

### 可选参数

与接口中的可选属性类似，我们用 ? 表示可选的参数

```javaScript
// 可选参数必须接在必需参数后面
function person(name: string, sex?: string) {
    if (sex) {
        return `${name} is ${sex}`
    } else {
        return name
    }
}

let abby = person('Abby', 'girl')
let didi = person('Didi')

```

### 参数默认值

TypeScript 会将添加了默认值的参数识别为可选参数

```javaScript
// 此时就不受「可选参数必须接在必需参数后面」的限制了
function person(sex?: string = 'boy' name: string) {
    return `${person} is ${sex}`
}
let abby = person('Abby', 'girl')
let didi = person('Didi')

```

### 剩余参数

ES6 中，可以使用 ...rest 的方式获取函数中的剩余参数，该参数只能是最后一个参数

```javaScript
// items 是一个数组，所以可以用数组的类型来定义它
function push(array, ...items: number[]) {
    items.forEach(item => {
        array.push(item)
    })
}
​
let luckyNum: number[] = []
push(luckyNum, 1, 2, 3)

```

### 重载

重载定义多个 reverse 的函数类型

```javaScript
// 重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现
function reverse(x: number): number
function reverse(x: string): string
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''))
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('')
    }
}

```

::: warning 注意
注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面
:::

## 类型断言

类型断言可以用来手动指定一个值的类型，语法: 值 as 类型 或 <类型>值

### 将一个联合类型断言为其中一个类型

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型中共有的属性或方法

而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法

```javaScript
interface Ferrari {
    model: string
    run(): void
}

interface Aircraft {
    model: string
    fly(): void
}
​
// Property 'fly' does not exist on type 'Ferrari'
function isFerrari(vehicle: Ferrari | Aircraft) {
    if (typeof vehicle.run === 'function') {
        return true
    }
    return false
}

//获取 Aircraft.fly 的时候会报错，此时可以将 vehicle 断言成 Ferrari
function isFerrari(vehicle: Ferrari | Aircraft) {
    if (typeof (vehiclea as Ferrari).run === 'function') {
        return true
    }
    return false
}
```

需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误
使用类型断言时一定要格外小心，尽量避免断言后调用方法或引用深层属性，以减少不必要的运行时错误

### 将一个父类断言为更加具体的子类

```javaScript
interface ApiError extends Error {
    code: number
}
interface HttpError extends Error {
    statusCode: number
}
​
function isApiError(error: Error) {
    // 父类 Error 中没有 code 属性，故直接获取 error.code 会报错，需要使用类型断言获取 (error as ApiError).code
    // 接口是一个类型，不是一个真正的值，它在编译结果中会被删除，无法使用 instanceof 来做运行时判断
    if (typeof (error as ApiError).code === 'number') {
        return true
    }
    return false
}

```

### 将任何一个类型断言为 any

需要注意的是，将一个变量断言为 any 可以说是解决 TypeScript 中类型问题的最后一个手段
它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 as any

```javaScript
(window as any).foo = 1

```

### 将 any 断言为一个具体的类型
遇到 any 类型的变量时，通过类型断言及时的把 any 断言为精确的类型，使我们的代码向着高可维护性的目标发展

```javaScript
function getCacheData(key: string): any {
    return (window as any).cache[key]
}

interface Ferrari {
    model: string
    run(): void
}

// 我们调用完 getCacheData 之后，立即将它断言为明确的 Ferrari 类型​
const LaFerrari = getCacheData('LaFerrari') as Ferrari
LaFerrari.run()

```

### 类型断言的限制
并不是任何一个类型都可以被断言为任何另一个类型，若 A 兼容 B，那么 A 能够被断言为 B，B 也能被断言为 A

```javaScript
interface Vehiclea {
    model: string
}

interface Ferrari {
    model: string
    run(): void
}
​
function testVehiclea(vehiclea: Vehiclea) {
    return (vehiclea as Ferrari)
}

function testFerrari(ferrari: Ferrari) {
    return (ferrari as Vehiclea)
}

```

允许 vehiclea as Ferrari 是因为「父类可以被断言为子类」
允许 ferrari as Vehiclea 是因为既然子类拥有父类的属性和方法，那么被断言为父类，获取父类的属性、调用父类的方法，就不会有任何问题，故「子类可以被断言为父类」

### 双重断言

双重断言，则可以打破「要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可」的限制，将任何一个类型断言为任何另一个类型
若你使用了这种双重断言，那么十有八九是非常错误的，它很可能会导致运行时错误

```javaScript
interface Ferrari {
    model: string
    run(): void
}

interface Aircraft {
    model: string
    fly(): void
}
​
function testAircraft(LaFerrari: Ferrari) {
    // 除非迫不得已，千万别用双重断言
    return (LaFerrari as any as Aircraft)
}

```


### 类型断言 vs 类型转换

类型断言只会影响 TypeScript 编译时的类型，类型断言语句在编译结果中会被删除

```javaScript
function toBoolean(something: any): boolean {
    return something as boolean
}
​
toBoolean(1)
// 返回值为 1

// something 断言为 boolean 虽然可以通过编译，但是并没有什么用，代码在编译后会变成 
function toBoolean(something) {
    return something
}

```

所以类型断言不是类型转换，它不会真的影响到变量的类型

### 类型断言 vs 类型声明

类型声明比类型断言更加严格 最好优先使用类型声明

```javaScript
function getCacheData(key: string): any {
    return (window as any).cache[key]
}
​
interface Ferrari {
    model: string
    run(): void
}
​
const LaFerrari = getCacheData('LaFerrari') as Ferrari
LaFerrari.run()

// 类型声明
const LaFerrari: Ferrari = getCacheData('LaFerrari')
LaFerrari.run()

```

### 类型断言 vs 泛型
```javaScript
function getCacheData<T>(key: string): T {
    return (window as any).cache[key]
}
​
interface Ferrari {
    model: string
    run(): void
}
​
const LaFerrari = getCacheData<Ferrari>('LaFerrari')
LaFerrari.run()
```

通过给 getCacheData 函数添加了一个范型 <T>，我们可以更加规范的实现对 getCacheData 返回值的约束，这也同时去除掉了代码中的 any，是最优的一个解决方案

## 參考
[TypeScript 入門教程](https://ts.xcatliu.com/basics/type-of-function "TypeScript 入門教程")