// const fs = require('fs')
// const path = require('path')
// const fileName = 'Code05_CourseSelection1.input'
// const absolutePath = path.resolve(__dirname, fileName); // 基于当前脚本目录
// const fileStream = fs.createReadStream(absolutePath, {
//   encoding: 'utf8', // 指定编码（如处理 GBK 需用第三方库）
//   crlfDelay: Infinity // 兼容不同系统的换行符（\n 或 \r\n）
// })
// const readline = require('readline').createInterface({input:fileStream})
const readline = require('readline').createInterface({input:process.stdin})
let lineNum = 0, N,M,cnt = 1,heads,nexts,tos,weights,dfn=1,dfnArr,sizeArr,vals
readline.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
      [N,M] = line.trim().split(/\s+/).map(Number)
      buildGraph()
    } else {
       let [k,s] = line.trim().split(/\s+/).map(Number)
       addEdge(k,lineNum-1,s)
    }
    if (lineNum == N+1){
       f()
    }
})

function addEdge(u,v,w){
   let nextEi = heads[u]
   heads[u] = cnt
   nexts[cnt] = nextEi
   tos[cnt] = v
   weights[cnt] = w
   cnt++
}

function buildGraph(){
   cnt = 1
   heads = Array(N + 1).fill(0)
   nexts = Array(M+1).fill(0)
   tos = Array(M+1).fill(0)
   weights = Array(M+1).fill(0)
}

function buildDFN(){
   dfn = 1
   dfnArr = Array(N+2).fill(0)
   sizeArr = Array(N+2).fill(0)
   vals = Array(N+2).fill(0)
   doDFN(0,0)
}

function doDFN(index,weight){
   let bak = dfn
   dfnArr[index] = bak
   sizeArr[bak] = 1
   vals[bak] = weight
   dfn++
   for(let ei = heads[index];ei != 0; ei = nexts[ei]){
      let v = tos[ei]
      doDFN(v,weights[ei])
      sizeArr[bak] += sizeArr[dfnArr[v]]
   }
}

// DFN 序号 从1～N+1，再补上一个值为0的空节点便于计算,选择M门课的最大受益，前提条件是如果
//头节点选择了，才能在其子树上选择，否则不能在其子树上选择，转移方程能够保证这一点
function f(){
   buildDFN()
   let dp = Array(N+2).fill(0).map(()=>{
         let buffer = new ArrayBuffer((M+2)*8)
         return new Float64Array(buffer).fill(-1)
   })
   let res = recursion(1,M+1,dp)
   console.log(res)
}
// 表示从dfn序号为index门课开始选起，选满lesson门课，能获得的最大受益
function recursion(index,lesson,dp){
   if (index == N+2){
      return 0
   }
   if (lesson == 0){
      return 0
   }
   if (lesson == 1){
      return vals[index]
   } 
   if (dp[index][lesson] != -1){
      return dp[index][lesson]
   }
   // 不止一门课分2种情况，选择自己，不选自己
   let res1 = recursion(index+1,lesson-1,dp) + vals[index]
   let res2 = recursion(index+sizeArr[index],lesson,dp)
   let res = Math.max(res1, res2)
   dp[index][lesson] = res
   return res
}