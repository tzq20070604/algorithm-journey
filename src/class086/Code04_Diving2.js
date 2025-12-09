// const Path = require('path')
// const FS = require('fs')
// const filePath = Path.resolve(__dirname,'Code04_Diving1.txt')
// const stream = FS.createReadStream(filePath,{encoding:'utf8'})
// const rl = require('readline').createInterface({input:stream})
const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0, m,v,n,arr=[]
rl.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
        [m,v,n] = line.trim().split(' ').map(Number)
    } else {
        arr.push(line.trim().split(' ').map(Number))
    }
    if (lineNum == n + 1){
       compute()
    }
})

function compute(){
    let dp = Array(m + 1).fill(0).map(()=>{
            return Array(v + 1).fill(0)
    })
    let path = Array(m + 1).fill(0).map(()=>{
            return Array(v + 1).fill('')
    })
    // n m v 只要有一个为0，dp[n][m][v] = 0
    for(let i = 1; i <= n; i++){
        let [im,iv,it] = arr[i-1]
        for(let j = m; j >= 1; j--){
            for(let k = v; k >=1 ; k--){
                // 第n个选择或者不选择
                // 不选择
                // 选择
                if (j >= im && k >= iv){
                    let tmp = dp[j - im][k-iv] + it
                    let tmp1 = (path[j - im][k-iv] + ' ' + i).trim()
                    if (tmp > dp[j][k]){
                        dp[j][k] = tmp
                        path[j][k] = tmp1
                    } else if (tmp == dp[j][k]){
                        if (tmp1 < path[j][k]){
                             path[j][k] = tmp1
                        }
                    }
                }
            }
        }
    }
    console.log(dp[m][v])
    console.log(path[m][v])
}