/**
 * @param {string} s
 * @return {number}
 */
var findSubstringInWraproundString = function(s) {
    let n = s.length
    let maxArr = Array(26).fill(0)
    maxArr[s.charCodeAt(0) - 97] = 1
    let dp = Array(n).fill(1)
    // -1 表示未计算
    for(let i = 1; i < s.length; i++){
        let pre = s[i-1].charCodeAt(0)
        let cur = s[i].charCodeAt(0)
        if ((cur == 97 && pre == 97 + 25) || (cur - pre == 1)){
           dp[i] = dp[i-1] + 1
        }
        maxArr[cur - 97] = Math.max(maxArr[cur - 97], dp[i])
    }
    let res = 0
    for (let i = 0; i < 26; i++){
        res += maxArr[i]
    }
    return res
};

let res = findSubstringInWraproundString('a')
console.log(res)
