// const fs = require('fs')
// const path = require('path')
// const fileName = 'Code02_LargeNumberIsPrime1.input'
// const absolutePath = path.resolve(__dirname, fileName); // 基于当前脚本目录
// const fileStream = fs.createReadStream(absolutePath, {
//   encoding: 'utf8', // 指定编码（如处理 GBK 需用第三方库）
//   crlfDelay: Infinity // 兼容不同系统的换行符（\n 或 \r\n
// })
// const rl = require('readline').createInterface({input:fileStream})
// 有3个测试用例通不过
const rl = require('readline').createInterface({input:process.stdin})
let lineNum = 0
rl.on('line',(line)=>{
    lineNum++
    line = line.trim()
    if (lineNum != 1){
        let ans = millerRabinTest(BigInt(line)) 
        console.log(ans ? "Yes" : "No")
    }
})
// 最关键的风险是，当可用的测试基数 nums[i]少于算法推荐的最小数量时，测试的可靠性会急剧下降。
// 质数的个数代表测试次数
// 如果想增加测试次数就继续增加更大的质数
/**
 * Miller-Rabin 素性测试算法
 * @param {number} n - 待测试的大整数（n > 3）
 * @param {number} k - 测试次数，增加k可提高准确性（通常k=5~20）
 * @returns {boolean} - 如果n可能是素数返回true，否则返回false
 */
function millerRabinTest(n, k = 40) {
    if (n <= 1n) return false;
    if (n === 2n || n === 3n) return true;
    if (n % 2n === 0n) return false;

    // 将 n-1 表示为 2^r * d 的形式，其中 d 是奇数
    let d = n - 1n;
    let r = 0;
    while (d % 2n === 0n) {
        d /= 2n;
        r++;
    }

    // 快速幂算法（模幂运算）
    const powerMod = (a, b, mod) => {
        let result = 1n;
        a = a % mod;
        while (b > 0) {
            if (b % 2n === 1n) {
                result = (result * a) % mod;
            }
            a = (a * a) % mod;
            b = b / 2n;
        }
        return result;
    };

    // 进行k次测试
    for (let i = 0; i < k; i++) {
        // 随机选择基数a，范围在[2, n-2]
        const a = 2n + BigInt(Math.floor(Math.random() * Number(n - 3n)));
        let x = powerMod(a, d, n);

        if (x === 1n || x === n - 1n) {
            continue; // 通过当前测试
        }

        let continueLoop = false;
        for (let j = 0; j < r - 1; j++) {
            x = powerMod(x, 2n, n);
            if (x === n - 1n) {
                continueLoop = true;
                break;
            }
        }

        if (!continueLoop) {
            return false; // 确定是合数
        }
    }
    return true; // 大概率是素数
}

// 使用示例：
// console.log(millerRabinTest(BigInt('5'), 5));  // 测试大素数（应返回true）
// console.log(millerRabinTest(1000000000n, 5)); // 测试合数（应返回false）