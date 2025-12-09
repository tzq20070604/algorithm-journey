function removeLeadingZeros(str) {
    // 去除字符串开头的所有零
    let result = str.replace(/^0+/, '');
    // 如果结果为空字符串，说明原字符串全是零，则返回"0"
    if (result === '') {
        return '0';
    }
    return result;
}

// 测试示例
console.log(removeLeadingZeros("0000123")); // "123"
console.log(removeLeadingZeros("0000000")); // "0"
console.log(removeLeadingZeros("123000"));  // "123000" (注意：只去除开头的零)
console.log(removeLeadingZeros("0.123"));   // "0.123"  (小数点前的零不会被去除)
// (?=...)：这是正向前瞻断言的语法括号。它像一个“巡逻兵”，只负责向前（向右）张望，检查括号内定义的模式是否存在，但它自己不会占据任何位置，也不会把检查的内容纳入最终的匹配结果中
// 0 宽度
console.log("0123".replace(/^0+(?=[0-9])/,'')); 