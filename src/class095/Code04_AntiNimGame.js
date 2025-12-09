const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0
rl.on('line',(line)=>{
   lineNum++
   if (lineNum >= 3 && lineNum % 2 == 1) {
      let arr = line.trim().split(' ')
      let sum = 0, ans = 0
      for(let i = 0; i < arr.length; i++){
         let num = parseInt(arr[i])
         sum += num
         ans ^= num
      }
      if (sum == arr.length){
         ans = sum % 2 == 0 ? "John" : 'Brother'
      } else {
         ans = (ans != 0 ? "John":'Brother')
      }
      console.log(ans)
      return ans
   } 
})

const fs = require('fs')
const path = require('path')
const fileName = 'xxx.input'
const absolutePath = path.resolve(__dirname, fileName); // 基于当前脚本目录
const fileStream = fs.createReadStream(absolutePath, {
  encoding: 'utf8', // 指定编码（如处理 GBK 需用第三方库）
  crlfDelay: Infinity // 兼容不同系统的换行符（或）
})
const readline = require('readline').createInterface({input:fileStream})