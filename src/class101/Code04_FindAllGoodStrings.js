// https://leetcode.cn/problems/find-all-good-strings/

var MOD = 10**9 + 7
var str1, str2, pattern,len,nexts

/**
 * @param {number} n
 * @param {string} s1
 * @param {string} s2
 * @param {string} evil
 * @return {number}
 */
var findGoodStrings = function(n, s1, s2, evil) {
    str1 = s1
    str2 = s2
    len = n
    pattern = evil
    nexts = computeNexts()
    let r2 = countOfString(str2) 
    let r1 = countOfString(str1)
    let res = (r2 - r1 + MOD) % MOD
    let count = kmp(str1)
    res = (res + count) % MOD
    return res
};

function kmp(str){
   let x = 0, y = 0
   while(x < str.length){
      if (str[x] === pattern[y]){
         x++
         y++
      } else if (y > 0){
         y = nexts[y]
      } else {
         x++
      }
      if (y == pattern.length){
         return 0
      }
   }
   return 1
}

function computeNexts(){
   let arr = Array(pattern.length + 1).fill(0)
   arr[0] = -1
   let x = 1, y = 0
   while(x < pattern.length){
      if (pattern[x] === pattern[y]){
        x++
        y++
        arr[x] = y
      } else if (y > 0){
        y = arr[y]
      } else {
        x++
      }
   }
   return arr
}


// 字典序大于等于str且不含evil的字符串的个数
function countOfString(str){
  dp = Array(len).fill(0).map(()=>{
        return Array(pattern.length).fill(0).map(()=>{
            return Array(2).fill(-1)
        })
  })
  return f(0,0,0,str,dp)
}

//当前来到i的位置，匹配子串j的位置，是否可以自由选择
// free为0 不可自由选择
// free为1 可自由选择
function f(i,j,free,str,dp){
   if (j == pattern.length){
     return 0
   }
   if (i == len){
     return 1
   }
   if (dp[i][j][free] != -1){
     return dp[i][j][free]
   }
   
   let sum = 0
   if (free){
      for(let m = 0; m <= 25; m++){
         let ch = String.fromCharCode('a'.charCodeAt(0) + m)
         sum = (sum + f(i+1, computeIndex(j,ch),1, str,dp)) % MOD
      }
   } else {
      let del = str[i].charCodeAt(0) - 'a'.charCodeAt(0)
      for(let m = 0; m < del; m++){
          let ch = String.fromCharCode('a'.charCodeAt(0) + m)
          sum = (sum + f(i+1, computeIndex(j,ch),1, str,dp)) % MOD
      }
      ch = str[i]
      sum = (sum + f(i+1, computeIndex(j,ch),0, str,dp)) % MOD
   }
   dp[i][j][free] = sum
   return sum
}

function computeIndex(j,ch){
    while(j >= 0 && pattern[j] != ch){
            j = nexts[j]
    }
    return j+1
}