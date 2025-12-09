// 此题目要用到BigInt
let input = "";
let n, m;
process.stdin.on("data", (data) => {
    input += data;
});
process.stdin.on("end", () => {
    [n, m] = input.trim().split(" ").map(Number);
    kindsOfTree(n, m);
});
const MOD = BigInt(10 ** 9 + 7);
let dp;
function kindsOfTree(n, m) {
    dp = Array(n + 1)
        .fill(0)
        .map(() => {
            return Array(m + 1).fill(-1n);
        });
    let res = f(n, m, dp);
    console.log(Number(res))
}

function f(n, m, dp) {
    if (dp[n][m] != -1n) {
        return dp[n][m];
    }
    if (n == 0) {
        dp[n][m] = 1n;
        return dp[n][m];
    }
    if (m == 0){
        dp[n][m] = 0n;
        return dp[n][m];
    }
    // 若数值在安全整数范围内（±(2^53 - 1)），可直接使用 *和 %运算符：
    // 左侧的个数
    dp[n][m] = 0n;
    for (let i = 0; i <= n - 1; i++) {
        let left = f(i, m - 1, dp);
        let right = f(n - 1 - i, m - 1, dp);
        let res = left * right % MOD
        dp[n][m] = (dp[n][m] + res) % MOD;
    }
    return dp[n][m];
}