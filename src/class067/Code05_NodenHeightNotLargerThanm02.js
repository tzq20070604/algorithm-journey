// 状态压缩，可以按照列来求,而且是从高到低来更新，这样就不会覆盖
// 此题目要用到BigInt
let input = "";
let n, m;
const MOD = BigInt(1e9 + 7);
process.stdin.on("data", (data) => {
    input += data;
});
process.stdin.on("end", () => {
    [n, m] = input.trim().split(" ").map(Number);
    let res = kindsOfTree(n, m);
    console.log(res);
});

function kindsOfTree(n, m) {
    if (n == 0) return 1;
    if (m == 0) return 0;
    let dp = Array(n + 1).fill(0n);
    dp[0] = 1n;
    for (let i = 1; i <= m; i++) {
        for (let j = n; j >= 1; j--) {
            dp[j] = 0n
            for (let k = 0; k <= j - 1; k++) {
                dp[j] += (dp[k] * dp[j-1-k]);
            }
        }
    }
    return Number(dp[n] % MOD);
}