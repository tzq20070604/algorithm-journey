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
let lineNum = 0, N,M,graph,scores,dp
readline.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
       [N,M] = line.trim().split(/\s+/).map(Number)
       dp = Array(N+1).fill(0).map(()=>{
           return Array(N+1).fill(0).map(()=>{
              let buffer = new ArrayBuffer((M+2)*8)
             return new Float64Array(buffer).fill(-1)
           })
       })
       graph = Array(N+1).fill(0).map(()=>{
         return []
       })
       scores = Array(N+1).fill(0)
    } else {
       let [k,s] = line.trim().split(/\s+/).map(Number)
       scores[lineNum-1] = s
       graph[k].push(lineNum-1)
    }
    if (lineNum == N+1){
       let res = f(0,graph[0].length,M+1)
       // console.log(13)
       console.log(res)
    }
})
// 表示在i节点的前j课子树上选择k门课(必须要选择i节点)能获得的最大受益
function f(i,j,k){
    if (k == 0){
        return 0
    }
    if (j == 0 || k == 1){
        return scores[i]
    }
    if (dp[i][j][k] != -1){
        return dp[i][j][k]
    }
    // 第j颗子树不选择课程
    let res = f(i,j-1,k)
    let v = graph[i][j-1]
    // 第j颗子树选择课程s门课，最多选择k-1门课，因为有一门要留给根节点
    for(let s = 1; s <= k-1; s++){
        res = Math.max(res, f(i,j-1,k-s) + f(v,graph[v].length,s))
    }
    dp[i][j][k] = res
    return res
}