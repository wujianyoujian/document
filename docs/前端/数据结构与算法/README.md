# 数据结构与算法

## 题目
### 696. 计数二进制子串
给定一个字符串 s，计算具有相同数量0和1的非空(连续)子字符串的数量，并且这些子字符串中的所有0和所有1都是组合在一起的。

重复出现的子串要计算它们出现的次数。

示例 1 :
```
输入: "00110011"
输出: 6
解释: 有6个子串具有相同数量的连续1和0：“0011”，“01”，“1100”，“10”，“0011” 和 “01”。

请注意，一些重复出现的子串要计算它们出现的次数。

另外，“00110011”不是有效的子串，因为所有的0（和1）没有组合在一起
```
> 思路:  
> 00110011
> 1. 从字符串的序列0开始, 生成子串(只能取到倒数第二位, 01, 10)
> 2. 匹配子串是否符合规则, 每次查找的子串只查找一个符合的
> 3. 在子串找到符合规则的字符返回
```javascript
let countBinarySubstrings = (s) => {
  // 00110011
  // 0011, 1100, 01, 10, 0011, 01
  let result = []
  let subString = (str) => {
    // 先取到开始的字符为0还是1
    // 看开始字符出现的次数, 再取对应的字符的次数组成正则表达式
    // 通过正则表达式进行测试
    // j 初始
    let j = str.match(/^(0+|1+)/)[0]
    // k 对应字符
    let k = (j[0] === '0' ? '1' : '0').repeat(j.length)

    if (str.slice(0, (j + k).length) === (j + k)) {
      return j + k
    }
  }
  for (let i = 0; i < s.length - 1; i++) {
    let r = subString(s.slice(i))
    if (r) {
      result.push(r)
    }
  }
  return result.length
}
```

### 17. 电话号码的字母组合
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。


![avatar](https://assets.leetcode-cn.com/aliyun-lc-upload/original_images/17_telephone_keypad.png)

示例:
```
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
说明:
尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。
```

> 思路
> 1. 先定义出所有的数字对应的字符数组  
> 2. 先两个字符数组相乘, 得出的结果就变成一个新的数组, 再与下一个数组进行相乘  
> 3. 这样本质上就变成两个数组进行排列组合的问题了

```javascript
var letterCombinations = function(digits) {
  let result = []
  let keyboardNumber = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z']
  }
  // 两个字符数组进行排列
  let multiply = (a, b) => {
    let r = []
    a.map((value1, index1) => {
      b.map((value2, index2) => {
        r.push(value1 + value2)
      })
    })
    return r
  }
  if (digits.length > 0) {
    result = keyboardNumber[digits[0]]
    for (let i = 1; i < digits.length; i++) {
      result = multiply(result, keyboardNumber[digits[i]])
    }
    return result
  }
  return result
}
```