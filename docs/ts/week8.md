# 第八週

忙碌是常態

## 枚举

枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等

### 舉個栗子

```javaScript
enum Handsomeboy {Leehom, Leslie, Daniel}

// 枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射
console.log(Handsomeboy["Leehom"] === 0, Handsomeboy[0] === "Leehom"); // true
console.log(Handsomeboy["Leslie"] === 1, Handsomeboy[1] === "Leslie"); // true
console.log(Handsomeboy["Daniel"] === 2, Handsomeboy[2] === "Daniel"); // true

```

### 手动赋值
```javaScript
// 如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的
enum Handsomeboy {Leehom = 2, Leslie, Daniel}

// 編譯結果 Daniel會覆蓋Leehom
var Handsomeboy
(function (Handsomeboy) {
    Handsomeboy[Handsomeboy["Leehom"] = 2] = "Leehom"
    Handsomeboy[Handsomeboy["Leslie"] = 1] = "Leslie"
    Handsomeboy[Handsomeboy["Daniel"] = 2] = "Daniel"
})(Handsomeboy || (Handsomeboy = {}))

// 手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查 (编译出的 js 仍然是可用的)
enum Handsomeboy {Leehom = <any>"力宏", Leslie, Daniel}

```

### 常数项和计算所得项 
枚举项有两种类型：常数项（constant member）和计算所得项（computed member）

```javaScript
// 前面我们所举的例子都是常数项，一个典型的计算所得项的例子
enum Color {Red, Green, Blue = "blue".length}

// 如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错
enum Color {Red = "red".length, Green, Blue}

```

[下常数项和计算所得项的完整定义](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Enums.html "下常数项和计算所得项的完整定义")

### 常数枚举
常数枚举是使用 const enum 定义的枚举类型

### 舉個栗子
```javaScript
// 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]

// 編譯結果
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */]

```

### 外部枚举
外部枚举（Ambient Enums）是使用 declare enum 定义的枚举类型

### 舉個栗子
```javaScript
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]

// eclare 定义的类型只会用于编译时的检查，编译结果中会被删除
// 編譯結果
var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]

```

## 类
TypeScript 除了实现了所有 ES6 中的类的功能以外，还添加了一些新的用法

### 类的概念
* 类（Class）：定义了一件事物的抽象特点，包含它的属性和方法
* 对象（Object）：类的实例，通过 <em bgcolor=#fafafa>new</em> 生成
* 面向对象（OOP）的三大特性：封装、继承、多态
* 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对* 外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
* 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
* 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 <em bgcolor=#fafafa>Cat</em> 和 <em bgcolor=#fafafa>Dog</em> 都继承自 <em bgcolor=#fafafa>Animal</em>， 但是分别实现了自己的 <em bgcolor=#fafafa>eat</em> 方法。此时针对某一个实例，我们无需了解它是 <em bgcolor=#fafafa>Cat</em> 还是 <em bgcolor=#fafafa>Dog</em>，就可以直接调用 <em bgcolor=#fafafa>eat</em> 方法，程序会自 动判断出来应该如何执行 <em bgcolor=#fafafa>eat</em>
* 存取器（getter & setter）：用以改变属性的读取和赋值行为
* 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 <em bgcolor=#fafafa>public</em> 表示公有属性或方法
* 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
* 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自 另一个类，但是可以实现多个接口

### 属性和方法
使用 class 定义类，使用 constructor 定义构造函数，通过 new 生成新实例的时候，会自动调用构造函数

### 舉個栗子
```javaScript
class Human {
    public sex
    constructor(sex) {
        this.sex = sex
    }
    getSex() {
        return `My gender is ${this.sex}`
    }
}

let man = new Human('man')
console.log(man.getSex()) // My gender is man

```

### 类的继承
使用 extends 关键字实现继承，子类中使用 super 关键字来调用父类的构造函数和方法

### 舉個栗子
```javaScript
class Man extends Human {
    constructor(sex) {
        super(sex) // 调用父类的 constructor(sex)
        console.log(this.sex)
    }

    getSex() {
        return 'Hello, ' + super.getSex() // 调用父类的 getSex()
    }
}

let Jack = new Man('Jack') // Jack
console.log(Jack.getSex())

```

### 存取器
使用 getter 和 setter 可以改变属性的赋值和读取行为

### 舉個栗子
```javaScript
class Human {
    public sex
    constructor(sex) {
        this.sex = sex
    }
    get sex() {
        return this.sex
    }

    set sex(value) {
        this.sex = value
    }
}

let man = new Human('man')
man.sex = 'bigMan' // setter: bigMan
console.log(man.sex) // getter: bigMan

```

### 静态方法
使用 static 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用

### 舉個栗子
```javaScript
class Animal {
    static isAnimal(a) {
        return a instanceof Animal
    }
}

let a = new Animal('dog')
Animal.isAnimal(a); // true
a.isAnimal(a); // TypeError: a.isAnimal is not a function

```

### TypeScript 中类的用法
TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected。

* public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
* private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
* protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的

### 舉個栗子
```javaScript
class Human {
    public name
    private age
    protected sex
    public constructor(name, age, sex) {
        this.name = name
        this.age = age
        this.sex = sex
    }
}

// 使用 private 修饰的属性或方法，在子类中也是不允许访问，而如果是用 protected 修饰，则允许在子类中访问
class Man extends Human {
    constructor(name, age, sex) {
        super(name, age, sex)
        console.log(this.age) // error
        console.log(this.sex)  // right
    }
}

// 当构造函数修饰为 private 时，该类不允许被继承或者实例化，当构造函数修饰为 protected 时，该类只允许被继承
class Human {
    public name
    private constructor(name) {
        this.name = name
    }

    protected getName() {
        return this.name
    }
}
class Man extends Human {
    constructor(name) {
        super(name) // error
    }
}

let Jack = new Human('Jack') // error
console.log(Human.getName()) // right

```

### 参数属性
修饰符和readonly还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值

### 舉個栗子
```javaScript
class Human {
    // public name: string
    public constructor(public name) {
        // this.name = name;
    }
}

// readonly 只读属性关键字，只允许出现在属性声明或索引签名或构造函数中
class Human {
    public constructor(readonly name) {
    }
}
let Jack = new Human('Jack')
Jack.name = 'Tom' // error

// 注意如果 readonly 和其他访问修饰符同时存在的话，需要写在其后面
// public readonly name

```

### 抽象类
abstract 用于定义抽象类和其中的抽象方法
需要注意的是，即使是抽象方法，TypeScript 的编译结果中，仍然会存在这个类

### 舉個栗子
```javaScript
abstract class Human {
    public constructor(readonly name) {
    }

    public abstract sayHi()
}

// 首先抽象类是不允许被实例化的
let Jack = new Human('Jack') // error

// 其次，抽象类中的抽象方法必须被子类实现
class Man extends Human {
    public sayHi() {
        console.log(`My name is ${this.name}`)
    }
}

```

### 类的类型
给类加上 TypeScript 的类型很简单，与接口类似

### 舉個栗子
```javaScript
class Human {
    public constructor(public name: string) {
    }

    sayHi(): string {
        return `My name is ${this.name}`
    }
}

```

## 类与接口

### 类实现接口
实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 implements 关键字来实现。这个特性大大提高了面向对象的灵活性

### 舉個栗子
```javaScript
interface Alarm {
    alert(): void
}

interface Light {
    lightOn(): void;
    lightOff(): void;
}

class Door {
}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert')
    }
}

class Car implements Alarm {
    alert() {
        console.log('Car alert')
    }
}

// 一个类可以实现多个接口
class Car2 implements Alarm, Light {
    alert() {
        console.log('Car alert')
    }
    lightOn() {
        console.log('Car light on')
    }
    lightOff() {
        console.log('Car light off')
    }
}

```

### 接口继承接口

### 舉個栗子
```javaScript
interface Alarm {
    alert(): void;
}

interface LightableAlarm extends Alarm {
    lightOn(): void;
    lightOff(): void;
}

```

### 接口继承类
在接口继承类的时候，只会继承它的实例属性和实例方法（实例的类型不包括构造函数、静态属性或静态方法）

### 舉個栗子
```javaScript
// 实际上，当我们在声明 class Point 时，除了会创建一个名为 Point 的类之外，同时也创建了一个名为 Point 的类型（实例的类型）。
class Point {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

interface Point3d extends Point {
    z: number
}

let point3d: Point3d = {x: 1, y: 2, z: 3}

```

当我们声明 interface Point3d extends Point 时，Point3d 继承的实际上是类 Point 的实例的类型，「接口继承类」和「接口继承接口」没有什么本质的区别

## 參考
[TypeScript 入門教程](https://ts.xcatliu.com/advanced/enum.html "TypeScript 入門教程")