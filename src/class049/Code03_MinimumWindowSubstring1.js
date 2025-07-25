/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    setup()
    for(var i = 0; i < t.length; i++){
      if (sDict[t[i]] === undefined){
         sDict[t[i]] = -1
      } else {
         sDict[t[i]]--
      }
      // 多少个债务
      debt--
    }
   
    for (var l = 0, r = 0; r < s.length; r++){
        var ch = s[r]
        // 无用的字符 说明是有效的字符
        if (sDict[ch] !== undefined){
            if (++sDict[ch] <= 0){
               debt++
            }
            while(debt == 0){
               if (sDict[s[l]] === undefined){
                  l++
               } else if (sDict[s[l]] == 0){
                   // 不能减
                   if (ans > r - l + 1){
                    start = l
                    ans = r - l + 1
                   }
                   break;
               } else {
                  sDict[s[l]]--
                  l++
               }
            }
        }
    }
    if (ans == Infinity){
        return ""
    } else {
        return s.slice(start,start + ans)
    }
};


var ans = Infinity
var start = 0
var sDict = {}
var debt = 0

function setup(){
   sDict = {}
   debt = 0
   ans = Infinity
   start = 0
}
