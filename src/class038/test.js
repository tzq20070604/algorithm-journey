const msg = "Learn JavaScript and TypeScript";
console.log(msg.length) // 31
// The index at which to begin searching. If omitted, the search begins at the end of the string.
console.log(msg.lastIndexOf("Script", 15)); // 10
console.log(msg.lastIndexOf("Script", 30)); // 25
console.log(msg.lastIndexOf("and", 17)); // 从第17位开始往前搜索

console.log(msg.startsWith("JavaScript", 6)); // true (从索引6开始)
console.log(msg.endsWith("JavaScript", 16)); // true (考虑前16个字符)

console.log(msg.search(/Script/i)); // 10 (忽略大小写)
console.log(msg.search(/[^a-z]/i)); // 5 (第一个非字母的位置)

var matches = msg.match(/Scr[ei]pt/g);
console.log(matches); // ["Script", "Script"] 
console.log('PI = 3.14'.match(/\d+\.\d+/)); // ["3.14"]

var matches = [...msg.matchAll(/Scr(.)pt/g)];
console.log(matches[0]); // ["Script", "i"]
console.log(matches[1]); // ["Script", "i"]

var ddd
var kkk = ddd ?? 8
console.log(ddd)
console.log(kkk)