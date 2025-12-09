const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;
let lineNum = 0,
    n,
    m,
    arr;
void (async function () {
    // Write your code here
    while ((line = await readline())) {
        lineNum++;
        if (lineNum == 1) {
            arr = [];
            [n, m] = line.split(" ").map(Number);
        } else {
            arr.push(line.split(" ").map(Number));
        }
    }
    let res = f(n, m, arr);
    console.log(res);
})();

function f(money, count, arr) {
    let master = [];
    let belone = {};
    // 弄成主件附件的形式
    for (let i = 0; i < arr.length; i++) {
        let [v, w, q] = arr[i];
        if (q == 0) {
            // 主件
            master.push([v, w, i + 1]);
        } else {
            if (!belone[q]) {
                belone[q] = [];
            }
            belone[q].push([v, w, q]);
        }
    }
    let dp = Array(master.length + 1)
        .fill(0)
        .map(() => {
            return Array(money + 1).fill(0);
        });
    // console.log(master);
    // console.log(belone);
    for (let j = 1; j <= master.length; j++) {
        let [v, w, index] = master[j - 1];
        for (let p = 0; p <= money; p++) {
            let max = 0;
            let res1 = 0;
            let res2 = 0;
            let res3 = 0;
            let res4 = 0;
            let res5 = 0;
            let res6 = 0;
            //不选择主件
            res1 = dp[j - 1][p];
            max = Math.max(res1, max);
            // 选择主件
            if (p >= v) {
                res2 = dp[j - 1][p - v] + w * v;
                max = Math.max(res2, max);
            }
            let items = belone[index];
            if (items && items.length == 1) {
                let [v1, w1, index1] = items[0];
                if (p - v - v1 >= 0) {
                    // 选择
                    res3 = dp[j - 1][p - v - v1] + w * v + w1 * v1;
                    max = Math.max(res3, max);
                }
            } else if (items && items.length == 2) {
                let [v1, w1, index1] = items[0];
                let [v2, w2, index2] = items[1];
                // 只选1
                if (p - v - v1 >= 0) {
                    res4 = dp[j - 1][p - v - v1] + w * v + w1 * v1;
                    max = Math.max(res4, max);
                }

                // 只选2
                if (p - v - v2 >= 0) {
                    res5 = dp[j - 1][p - v - v2] + w * v + w2 * v2;
                    max = Math.max(res5, max);
                }

                if (p - v - v1 - v2 >= 0) {
                    // 同时选1和2
                    res6 =
                        dp[j - 1][p - v - v1 - v2] + w * v + w1 * v1 + w2 * v2;
                    max = Math.max(res6, max);
                }
            }
            dp[j][p] = max;
        }
    }
    return dp[master.length][money];
}
