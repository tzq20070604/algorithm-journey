/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    setup()
    for(var i = 0; i < t.length; i++){
      if (sDict[t[i]]){
         sDict[t[i]]++
      } else{
         sDict[t[i]] = 1
      }
      curDict[t[i]] = 0
    }
   
    for (var l = 0, r = 0; r < s.length; r++){
        var ch = s[r]
        // 无用的字符
        if (sDict[ch] !== undefined){
            curDict[ch]++
            var satify = false
            while(isSatify()){
                satify = true
                curDict[s[l]]--
                l++
            }
            // 之前满足过，现在不满足了，就扩大窗口，并计算最小值
            if (satify && !isSatify()){
                l--
                curDict[s[l]]++
                if (ans > r - l + 1){
                    start = l
                    ans = r - l + 1
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

var sDict = {}
var curDict = {}
var ans = Infinity
var start = 0

function setup(){
   sDict = {}
   curDict = {}
   ans = Infinity
   start = 0
}

function isSatify(){
    for (var key in sDict){
        var count = curDict[key]
        if (count < sDict[key]){
            return false
        }
    }
    return true
}

// var str = minWindow("cabwefgewcwaefgcf","cae")