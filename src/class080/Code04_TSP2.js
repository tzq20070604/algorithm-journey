let graph = [], n, input = '',totalStates = 0,dp
let lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\n')
n = Number(lines[0].trim())
lines.slice(1).map((str)=>{
    graph.push(str.trim().split(' ').map(Number))
})
// 0表示没有走，1表示走过了
totalStates = 1 << n; 
let res = compute()
console.log(res)

function compute() {
    dp = Array(totalStates).fill().map(() => 
        Array(n).fill(-1)
    );
    // 从当前状态和当前所在村出发，走完所有的村庄，耗费的最小消费
    // state 位 0表示没有走，1表示走过了
    function f(state,index){
            if(state == totalStates - 1){
                // 回到0号村
                dp[state][index] = graph[index][0]
                return dp[state][index]
            }
            // 命中缓存
            if(dp[state][index] != -1){
               return dp[state][index]
            }

            let ans = Infinity
            // 下一个要去的地方
            for (let next = 1; next < n; next++) {
                //去过了
                if (state & (1 << next)) continue;
            
                let newCost = f(state | (1 << next),next) + graph[index][next]
                ans = Math.min(ans, newCost)
            }
           dp[state][index] = ans
           return ans
    }
    return f(1,0)
}