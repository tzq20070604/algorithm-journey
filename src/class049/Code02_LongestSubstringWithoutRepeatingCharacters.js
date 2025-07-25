/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    dict = {}
    ans = 0
    for (var l=0,r=0;l <= r, r < s.length; r++){
       var ch = s[r]
       var index = dict[ch]
       if (index !== undefined && index >= l){
          ans = Math.max(ans,r-1 - l + 1)
          l = index + 1
       } else {
          ans = Math.max(ans,r - l + 1)
       }
       dict[ch] = r
    }
    return ans
};

var dict = {}
var ans = 0