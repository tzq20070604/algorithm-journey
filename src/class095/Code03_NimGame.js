// 每次让后手面对异或值都等于0的状态，异或值为0是必输态
const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0
rl.on('line',(line)=>{
   lineNum++
   if (lineNum >= 3 && lineNum % 2 == 1) {
     let ans = line.trim().split(' ').reduce((pre,cur)=>{
         return Number(pre) ^ Number(cur)
     },0)
     console.log(ans == 0 ? "No":'Yes')
   } 
})

