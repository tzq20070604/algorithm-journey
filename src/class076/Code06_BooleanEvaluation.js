/**
 * @param {string} s
 * @param {number} result
 * @return {number}
 */
var countEval = function(s, result) {
    s = s.split('').map((ch)=>{
        if (ch === '0') return 0;
        if (ch === '1') return 1;
        return ch;
    });
    
    // 最后一个计算的符号
    let dp = Array(s.length).fill(0).map(()=>{
        return Array(s.length).fill(0).map(()=>{
            return Array(2).fill(-1)
        })
    })
    return f(0,s.length-1,s,dp,result)
};
// [l,r]之间最后结果为result的方法有多少种
function f(l,r,s,dp,result){
    if (l > r) return 0; // 处理非法输入的基础情况
    if (r == l){
        return s[l] == result ? 1 : 0
    }
    if (r == l + 1){
        return 0
    }
    if (dp[l][r][result] != -1){
        return dp[l][r][result]
    }
    let res = 0
    if (r == l + 2){
        let vl = s[l]
        let vr = s[r]
        let ch = s[l+1]
        if (ch == '|'){
            res = (vl | vr) == result ? 1 : 0
        } else if (ch == '&'){
            res = (vl & vr) == result ? 1 : 0
        } else { // ch == '^'
            res = (vl ^ vr) == result ? 1 : 0
        }
        dp[l][r][result] = res
        return res
    } else {
        // k为最后计算的
    for(let k = l+1; k < r; k = k+2){
        let ch = s[k]
        let l0 = f(l,k-1,s,dp,0)
        let l1 = f(l,k-1,s,dp,1)
        let r0 = f(k+1,r,s,dp,0) 
        let r1 = f(k+1,r,s,dp,1) 
        let sum = (l0 + l1) * (r0 + r1)
        if (ch == '|'){
            if (result == 1){
                res += sum - l0*r0
            } else {
                res += l0*r0
            }
        } else if (ch == '&'){
            if (result == 1){
                res += l1 * r1
            } else {
                res += sum - l1 * r1
            }
        } else { // ch == '^'
            if (result == 1){
                res += l0 * r1 + l1 * r0
            } else {
                res += sum - l0 * r1 - l1 * r0
            }
        }
      }
      dp[l][r][result] = res
      return res
   }
}

console.log(countEval("1^0|0|1",0))