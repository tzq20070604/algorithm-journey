const fs = require('fs')
const path = require('path')
const fileName = 'xxx.input'
const absolutePath = path.resolve(__dirname, fileName); // 基于当前脚本目录
const fileStream = fs.createReadStream(absolutePath, {
  encoding: 'utf8', // 指定编码（如处理 GBK 需用第三方库）
  crlfDelay: Infinity // 兼容不同系统的换行符（\n 或 \r\n）
})
const readline = require('readline').createInterface({input:fileStream})
let lineNum = 0,pathArr = []
readline.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
       [N, M] = line.split(" ").map(Number)
    } else {
       pathArr.push(line.split(" ").map(Number))
       if(lineNum == (1 + M)){
          readline.close()
       }
    }
})

readline.on('close',()=>{
    console.log(pathArr)
})