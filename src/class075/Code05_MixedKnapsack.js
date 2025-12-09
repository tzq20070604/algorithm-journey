//http://poj.org/problem?id=1742 该连接不支持js, 针对最后一种分组优化，这里只需要维护窗口中的找零的数量即可
const readline = require('readline').createInterface({input:process.stdin})
let lineNum = 0, vArr,cArr,n,m,dp
readline.on('line',(line)=>{
    lineNum++
    if (lineNum == 1){
        [n,m] = line.trim().split(' ').map(Number)
    }
    if (lineNum == 2){
        let arr = line.trim().split(' ').map(Number)
        vArr = arr.slice(0, n)
        cArr = arr.slice(n)
        dp = Array(m + 1).fill(false)
        dp[0] = true
        f()
    }
})

function f(){
    for(let i=1; i <= n; i++){
        let [c,v] = [cArr[i-1],vArr[i-1]]
        if (c == 1){ // 0 1 背包
            for(let j = m; j >=v; j--){
                dp[j] = (dp[j-v] || dp[j])
            }
        } else if (c * v >= m){ // 无限背包
            for(let j = v; j <= m; j++){
                dp[j] = (dp[j-v] || dp[j])
            }
        } else { // 分组背包 使用窗口优化 
            for(let mod = 0; mod <= Math.min(m,v-1); mod++){
                let cnt = 0
                // 维持一个窗口
                for(let j = m - mod; j >= Math.max(0, m - mod - c*v); j = j - v){
                    if(dp[j] == true){
                        cnt++
                    }
                }
                for(let j = m - mod, enter = m - mod - (c + 1)*v ; j >= 0; j = j - v, enter = enter - v){
                    // 这个顺序不能搞错，因为窗口里的值是之前的，而不是按照更新后来移除的
                    // 计算
                    let res = cnt > 0 ? true : false
                    // 移除左边界
                    if (dp[j]){
                        cnt--
                    }
                    dp[j] = res
                    // 进入右边界
                    if(enter >= 0 && dp[enter]){
                        cnt++
                    }
                }
            }
        }
    }
    let res = []
    for(let k=1;k<=m;k++){
       if (dp[k]){
          res.push(k)
          console.log(k)
       }
    }
    return res
}
