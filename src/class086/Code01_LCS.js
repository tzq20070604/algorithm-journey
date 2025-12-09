const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

let lineNum = 0;
let str1, str2, path = [];

void (async function () {
    // Write your code here
    let line; // ✅ 声明line变量
    
    while ((line = await readline())) {
        lineNum++;
        if (lineNum == 1) {
            str1 = line;
        } else if (lineNum == 2) {
            str2 = line;
            break; // ✅ 读取到第二行后退出循环
        }
    }
    
    path = [];
    compute(str1, str2);
    rl.close(); // ✅ 关闭readline接口
})();

function compute(str1, str2) {
    if (!str1 || !str2) { // ✅ 添加空值检查
        console.log('');
        return;
    }
    
    let dp = Array(str1.length + 1)
        .fill(0)
        .map(() => {
            return Array(str2.length + 1).fill(-1);
        });
    f(str1, str2, str1.length, str2.length, dp);
    getPath(str1, str2, str1.length, str2.length, dp);
    console.log(path.join(''));
}

function f(str1, str2, l1, l2, dp) {
    if (l1 == 0 || l2 == 0) {
        dp[l1][l2] = 0;
        return 0;
    }
    if (dp[l1][l2] != -1) {
        return dp[l1][l2];
    }
    let ans = 0;
    if (str1[l1 - 1] == str2[l2 - 1]) {
        ans = f(str1, str2, l1 - 1, l2 - 1, dp) + 1;
    } else {
        ans = Math.max(
            f(str1, str2, l1 - 1, l2, dp),
            f(str1, str2, l1, l2 - 1, dp)
        );
    }
    dp[l1][l2] = ans;
    return ans;
}

function getPath(str1, str2, l1, l2, dp) {
    while (l1 > 0 && l2 > 0) { // ✅ 使用严格比较
        if (str1[l1 - 1] === str2[l2 - 1]) {
            path.unshift(str1[l1 - 1]);
            l1--;
            l2--;
        } else {
            if (dp[l1 - 1][l2] > dp[l1][l2 - 1]) {
                l1--;
            } else {
                l2--;
            }
        }
    }
}