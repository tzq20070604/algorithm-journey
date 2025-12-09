const fs = require('fs')
const path = require('path')
const fileName = 'Code03_readGroupTest.input'
const absolutePath = path.resolve(__dirname, fileName); // 基于当前脚本目录
const fileStream = fs.createReadStream(absolutePath, {
  encoding: 'utf8', // 指定编码（如处理 GBK 需用第三方库）
  crlfDelay: Infinity // 兼容不同系统的换行符（\n 或 \r\n）
})
const rl = require('readline').createInterface({input:fileStream})
let lineNum = 0,totalGroup = 0, curGroup = 0, st = 0, count = 0,group = []
rl.on('line',(line)=>{
   lineNum++
   if (lineNum == 1){
      totalGroup = parseInt(line.trim())
      // 设置第一组的开始
      st = lineNum + 1
   }
   // 读组头，和组成员个数
   if (lineNum == st && curGroup <= totalGroup){
      curGroup++
      count = parseInt(line.trim())
      group = Array(count).fill(0)
   } else {
      let item = parseInt(line.trim())
      // 每组其他行
      if (lineNum < st + count){
         group[lineNum - st - 1] = item
      }
      // 每组 最后一行
      if (lineNum == st + count){
        group[lineNum - st - 1] = item
        st = lineNum + 1
        console.log(curGroup,group)
      }
   }
})