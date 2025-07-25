/**
 * 搞出单调性 才能使用滑动窗口
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestSubstring = function(s, k) {
    var ans = 0
    // 刚字符串种类为i次时，且每种字符数必须大于等于k时，最大子串长度
    for(var i = 1; i <= 26; i++){
        var res = longestSubstringContainN(s,k,i)
        ans = Math.max(ans,res)
    }
    return ans
};

function longestSubstringContainN(s, k, n){
         var ans = 0
         var category = 0
         // 达标的种类
         var satify = 0
         var dict = {}
         Array(26).fill(0).map((item,index)=>{
            var code = 'a'.charCodeAt(0) + index
            var ch = String.fromCharCode(code)
            dict[ch] = 0
         })
         // 必须包含n种字符,窗口中的子字符串从不达标到达标
         for(var l=0,r=0; r < s.length; r++){
             if (dict[s[r]] == 0){
                category++
             } 
             if (dict[s[r]] == k - 1){
                satify++
             }
             dict[s[r]]++
             if (category < n){
                continue
             } 
             // 达标，但是窗口是不能左边移动的，如果移动左边，只会导致不达标
            if (category == n){
               if (satify == category){
                  ans = Math.max(ans, r - l + 1)
               }
            } 
             // 当category > n,说明此时窗口的字母种类次数已经超过，必须左侧右移，才能重新达标
             while (category > n) {
                    if (dict[s[l]] == 1){
                        category--
                    } 
                    if (dict[s[l]] == k){
                        satify--
                    }
                    dict[s[l]]--
                    l++
            }
            // 达标时，看看是否满足条件，此时如果再将左侧窗口右移，一定不会好于现在的答案
            if (satify == category){
                ans = Math.max(ans, r - l + 1)
            }
         }
         return ans
}

// console.log(longestSubstring("bbaaacbd",3))