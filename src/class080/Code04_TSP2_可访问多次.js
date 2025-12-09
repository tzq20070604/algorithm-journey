// 这里有限制每个村只能去一次，如果是每个村能够去多次，这需要使用使用​​Floyd-Warshall算法​​计算所有村庄对之间的最短距离，然后转化为经典的旅行商问题
function floydWarshall(graph, n) {
    let dist = [...graph]; // 复制距离矩阵
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    return solveTSP(dist,n)
}

// 使用状态压缩DP求解TSP
function solveTSP(adjMatrix, n) {
    const totalStates = 1 << n;
    const dp = new Array(totalStates);
    for (let i = 0; i < totalStates; i++) {
        dp[i] = new Array(n).fill(Infinity);
    }
    // 初始化：从村庄0（即题目中的村庄1）出发
    dp[1][0] = 0;
    // 状态转移
    for (let state = 1; state < totalStates; state++) {
        for (let i = 0; i < n; i++) {
            if ((state & (1 << i)) === 0) continue;
            if (dp[state][i] === Infinity) continue;
            
            for (let j = 0; j < n; j++) {
                if (state & (1 << j)) continue;
                const newState = state | (1 << j);
                dp[newState][j] = Math.min(
                    dp[newState][j],
                    dp[state][i] + adjMatrix[i][j]
                );
            }
        }
    }
    
    // 最后返回起点
    let minDistance = Infinity;
    for (let i = 0; i < n; i++) {
        minDistance = Math.min(
            minDistance,
            dp[totalStates - 1][i] + adjMatrix[i][0]
        );
    }
    
    return minDistance;
}