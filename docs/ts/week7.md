# 第七週

忙碌是常態

## 类型别名

类型别名用来给一个类型起个新名字

### 舉個栗子

```javaScript
type One = string
type More = () => string
type OneOrMore = One | More
function getSomething(n: OneOrMore): One {
    if (typeof n === 'string') {
        return n
    } else {
        return n()
    }
}

```

我们使用 type 创建类型别名，类型别名常用于联合类型

## 字符串字面量类型

字符串字面量类型用来约束取值只能是某几个字符串中的一个

### 舉個栗子

```javaScript
type TopSuperStar = 'Michael Jackson' | 'The Beatles'
function whoIsSuperStar(name: TopSuperStar) {
    // do something
}

whoIsSuperStar('Michael Jackson') // right
whoIsSuperStar('蔡徐坤') // error
```

### 元组

数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象

### 舉個栗子

```javaScript
let Tuple: [string, number]
Tuple[0] = 'luckly'
Tuple[1] = 99.999

Tuple[0].slice(1)
Tuple[1].toFixed(2)

// 当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项
Tuple = ['luckly'] // error

// 当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型
Tuple[3].push('oka!')
Tuple[4].push(true) // error
```

## 參考
[TypeScript 入門教程](https://ts.xcatliu.com/basics/type-of-function "TypeScript 入門教程")