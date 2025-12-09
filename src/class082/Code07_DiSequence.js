/**
 * @param {string} s
 * @return {number}
 */
var numPermsDISequence = function(s) {
    let count = s.length + 1
    let sum = 0
    // 当前使用下标数字的下标，比前一个数字小的数字的个数
    let dp = Array(count).fill(0).map(()=>{
        return Array(count).fill(-1)
    })
    // 每个都用一遍
    for(let i = 1; i <= count; i++){
       //第一个填写i
       sum += f1(1,i-1,s,dp,count)
       sum %= MOD
    }
    return sum
};

let MOD = 1e9+7

/**
 * 返回符合[index,s,length -1]范围内符合规律的排列个数
 * @param {*} index 匹配第几个第几个数字 下标
 * @param {*} less 还有几个比前一个数字小的
 * @param {*} s  字符串
 */
function f(index,less,s,dp,count){
    if (index == count){
        return 1
    }
    if(dp[index][less] != -1){
        return dp[index][less]
    }
    //根据当前字符来枚举
    let res = 0
    let ch = s[index - 1]
    let more = count - less - index
    if (ch == "D"){ // 下降
        for(let i = 1; i <= less; i++){
           res += f(index+1,i-1,s,dp,count)
           res %= MOD
        }
    } else {
        for(let i = 1; i <= more; i++){
           res += f(index+1,i - 1 + less,s,dp,count)
           res %= MOD
        }
    }
    dp[index][less] = res
    return res
}

function f1(index,less,s,dp,count){
    if (index == count){
        return 1
    }
    if(dp[index][less] != -1){
        return dp[index][less]
    }
    //根据当前字符来枚举
    let res = 0
    let ch = s[index - 1]
    let more = count - less - index
    if (ch == "D"){ // 下降
        if(less == 1){
            res = f1(index+1,0,s,dp,count)% MOD
        } else if(less > 1) {
            res += (f1(index+1,less-1,s,dp,count) % MOD + f1(index,less-1,s,dp,count)% MOD)
        } else {
            res = 0
        }
    } else { // 升序
        if (less == count - index - 1){
            res = f1(index+1,less,s,dp,count)% MOD
        } else if (more > 1) {
            res += (f1(index+1,less,s,dp,count)% MOD  + f1(index,less + 1,s,dp,count)% MOD)
        } else {
            res = 0
        }
    }
    dp[index][less] = res
    return res
}