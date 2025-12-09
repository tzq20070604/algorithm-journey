const fs = require('fs')
const path = require('path')
const fileName = 'Code01_PartitionedKnapsack.txt'
const absolutePath = path.resolve(__dirname, fileName); // 基于当前脚本目录
const fileStream = fs.createReadStream(absolutePath, {
  encoding: 'utf8', // 指定编码（如处理 GBK 需用第三方库）
  crlfDelay: Infinity // 兼容不同系统的换行符（\n 或 \r\n）
})
const readline = require('readline').createInterface({input:fileStream})
// 有些从0开始，有些从1开始，所以要从新弄
// const readline = require('readline').createInterface({input:process.stdin})
let n,m,map={},arr,lineNum = 0
readline.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
       map={};
       [m,n] = line.split(' ').map(Number)
    } else {
       let [w,v,group] = line.split(' ').map(Number)
       if (!map[group - 1]){
          map[group - 1] = []
       }
       map[group - 1].push([w,v])
    }
    if (lineNum == n + 1){
       let keys = Object.keys(map)
       arr = Array.from({length:keys.length},(v,k)=>{return map[k]})
       let res = f(arr,m)
       console.log(res)
    }
})

function f(arr,m){
    // console.log(arr)
    // console.log(m)
    // 前arr组物品，不超过重量m的重量的最大价值
    let dp = Array(arr.length + 1).fill(0).map(()=>{
        return Array(m + 1).fill(0)
    })
    for(let i = 1; i <= arr.length; i++){
        let group = arr[i-1]
        if (!group){
            console.log(i)
            group = []
        }
        for(let j = 0; j <= m; j++){
            dp[i][j] = dp[i-1][j]
            for(let k = 0; k < group.length; k++){
               if(j >= group[k][0])
               dp[i][j] = Math.max(dp[i][j], dp[i-1][j - group[k][0]] + group[k][1])
            }
        }
    }
    // console.log(dp)
    return dp[arr.length][m]
}