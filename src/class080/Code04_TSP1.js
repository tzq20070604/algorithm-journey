let graph, n, input = ''
process.stdin.on('data',(data)=>{
    input += data
}) 
process.stdin.on('end',()=>{
   let lines = input.trim().split('\n')
   n = Number(lines[0].trim())
   graph = lines.slice(1).map((str)=>{return     str.trim().split(' ').map(Number)})
    let res = compute()
    console.log(res)
})

function compute() {
    const totalStates = 1 << n;
    const dp = Array(totalStates).fill().map(() => 
        Array(n).fill(Infinity)
    );
    
    // 初始化：从村庄0出发
    dp[1][0] = 0;
    
    // 迭代所有状态
    for (let state = 1; state < totalStates; state++) {
        for (let cur = 0; cur < n; cur++) {
            if (dp[state][cur] === Infinity) continue;
            
            for (let next = 0; next < n; next++) {
                if (state & (1 << next)) continue;
                
                const newState = state | (1 << next);
                const newCost = dp[state][cur] + graph[cur][next];
                
                if (newCost < dp[newState][next]) {
                    dp[newState][next] = newCost;
                }
            }
        }
    }
    
    // 返回起点
    let minCost = Infinity;
    for (let i = 0; i < n; i++) {
        minCost = Math.min(minCost, dp[totalStates - 1][i] + graph[i][0]);
    }
    
    return minCost;
}