/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function(s1, t1) {
    s = s1
    t = t1
    dict = {}
    dp = Array(s.length + 1).fill(0).map(()=>{
        return  Array(t.length + 1).fill(-1)
    })
    for(let i = 0; i < s.length; i++){
        if (!dict[s[i]]){
            dict[s[i]] = []
        }
        dict[s[i]].push(i)
    }
    return f(s.length, t.length)
};

var dict,dp,s,t
function f(i,j){
    if (j > i){
        return 0
    }
    if (j == 0){
        return 1
    }
    if (i == 0){
        return 0
    }
    if (dp[i][j] != -1){
        return dp[i][j]
    }
    let arr = dict[t[j-1]]
    let anser = 0
    if (!arr){
        dp[i][j] = anser
        return dp[i][j]
    }
    for(let k = 0; k < arr.length; k++){
       let index = arr[k]
       if (index < i){
          anser += f(index, j-1)
       }
    }
    dp[i][j] = anser
    return dp[i][j]
}