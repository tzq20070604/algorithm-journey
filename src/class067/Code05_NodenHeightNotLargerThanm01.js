// 此题目要用到BigInt
let input = "";
let n, m;
const MOD = BigInt(1e9 + 7)
process.stdin.on("data", (data) => {
    input += data;
});
process.stdin.on("end", () => {
    [n, m] = input.trim().split(" ").map(Number);
    let res = kindsOfTree(n, m);
    console.log(res)
});

function kindsOfTree(n, m){
   if (n == 0) return 1
   if (m == 0) return 0
   let dp = Array.from({length:n+1},(_,index)=>{return index == 0?Array(m+1).fill(1n): Array(m+1).fill(0n)})
   for (let i = 1; i <=n; i++){
     for(let j = 1; j <= m; j++){
        for (let k = 0; k <= i - 1; k++){
            dp[i][j] += dp[k][j-1] * dp[i-1-k][j-1]
        }
     }
   }
   return Number(dp[n][m] % MOD)
}