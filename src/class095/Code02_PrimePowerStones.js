// 测试链接 : https://www.luogu.com.cn/problem/P4018
// 思路：1，2，3，4，5都是质数的k次方，6不是
// 如果n不是6的倍数，先手就拿n % 6， n % 6肯定是1，2，3，4，5 其中之一，此时后手不可能拿6的倍数(不是质数)，拿完之后留给先手肯定不是6的倍数，假设是m，先手再拿m%6，拿完之后再将
// 6的倍数留给后手，后手肯定最先碰到6，最后先手获胜
// 反之也一样
// const fs = require('fs')
// const path = require('path')
// const fileName = 'Code02_PrimePowerStones.input'
// const absolutePath = path.resolve(__dirname, fileName); // 基于当前脚本目录
// const fileStream = fs.createReadStream(absolutePath, {
//   encoding: 'utf8', // 指定编码（如处理 GBK 需用第三方库）
//   crlfDelay: Infinity // 兼容不同系统的换行符（\n 或 \r\n）
// })
// const rl = require('readline').createInterface({input:fileStream})
const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0,n = 0
rl.on('line',(line)=>{
   lineNum++
   if (lineNum == 1){
      n = Number(line.trim())
   } else {
     let ans = Number(line.trim()) % 6 == 0 ? "Roy wins!" : "October wins!"
     console.log(ans)
   }
})