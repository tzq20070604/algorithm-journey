/**
 * @param {string} s
 * @return {number}
 */
const MOD = 1e9+7
let prefix, suffix
var countPalindromicSubsequences = function(s) {
    let indexDict = {}
    suffix = Array(s.length).fill(-1)
    for(let i = 0; i < s.length; i++){
       let val = indexDict[s[i]]
       if (val !== undefined){
          suffix[val] = i
       }
       indexDict[s[i]] = i
    }
    prefix = Array(s.length).fill(s.length)
    indexDict = {}
    for(let i = s.length-1; i >= 0; i--){
       let val = indexDict[s[i]]
       if (val !== undefined){
          prefix[val] = i
       }
       indexDict[s[i]] = i
    }
    let dp = Array(s.length).fill(0).map(()=>{
        return  Array(s.length).fill(-1)
    })
    return f(0,s.length-1,s,dp)
};

// 在[l,r]区间 回文子系列的个数
function f(l,r,s,dp){
   if (l > r){
      return 0
   }
   if (l == r){
     return 1
   } 
   if (r == l+1){
     return 2
   }
   if (dp[l][r] != -1){
     return dp[l][r]
   }
   let res = 0
   if (s[r] == s[l]){
     //[l+1,r-1] 中不包含s[l]
     let pre = prefix[r]
     let suf = suffix[l]
     if (suf == pre){ // 有一个
        res = 2 * f(l+1,r-1,s,dp) + 1  // aa 这种情况
        res %= MOD
     } else if (pre > suf){ // 至少有2个
        res = 2 * f(l+1,r-1,s,dp) - f(suf + 1,pre - 1,s,dp) + MOD
        res %= MOD
     } else { // 一个也没有 aa a
        res = 2 * f(l+1,r-1,s,dp) + 2
        res %= MOD
     }   
   } else {
     res = f(l,r-1,s,dp) + f(l+1,r,s,dp) - f(l+1,r-1,s,dp) + MOD
     res %= MOD
   }
   dp[l][r] = res
   return res
}

// countPalindromicSubsequences("abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba")