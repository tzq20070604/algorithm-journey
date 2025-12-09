/**
 * @param {number} n
 * @return {number}
 */
var countNumbersWithUniqueDigits = function(n) {
    let cur = n - 1
    return f(cur,0,9)
};

/**
 * 
 * @param {*} cur 当前来到那个位置
 * @param {*} pre 前面是否有选择 0 没有选择  1 有选择
 * @param {*} left //还剩下多少个数字可以选择
 * @returns 
 */
function f(cur,pre,left){
    if (cur == -1){
        return 1
    }
    let res = 0 // 继续不选择
    if (pre == 0){
       res += f(cur-1,pre,left)
       res += left * f(cur-1,1,left)
    } else {
       res += left * f(cur-1,1,left-1)
    }
    return res
}