let lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n')
let lineNum = 0,arr,n, money, happy = 0
for(let i =0; i < lines.length;i++){
    let line = lines[i]
    if (i == 0){
        [n,money] = line.split(' ').map(Number);
        arr = [];
    } else {
        let [old, cur, value] = line.split(' ').map(Number)
        if (old - cur >= cur){
            money += old - 2 * cur
            happy += value
        } else {
            arr.push([cur * 2 - old,value])
        }
    }
}
let res = happy + f(money, arr) 
console.log(res)
function f(money,arr){
    // 前i个商品，花费money，最大能获得的快乐值
    let dp = new Array(arr.length + 1).fill(0).map(()=>{
        return new Array(money + 1).fill(0)
    })
    for(let i = 1; i <= arr.length; i++){ 
        let [cost, value] = arr[i-1]
        for(let j = 0; j <= money; j++){
            dp[i][j] = dp[i-1][j]
            if (j >= cost){
                dp[i][j] = Math.max(dp[i-1][j - cost] + value,dp[i][j]) 
            }  
        }
    }
    return dp[arr.length][money]
}

