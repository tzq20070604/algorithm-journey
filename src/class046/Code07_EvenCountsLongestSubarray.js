/**
 * @param {string} s
 * @return {number}
 */
var findTheLongestSubstring = function(s) {
    var dict = {0:-1}
    var ans = 0
    var status = 0
    for (var i = 0; i < s.length; i++){
       var offset = move(s[i])
       if (offset != -1){
           status ^= (1 << offset)
       } 
       if (dict[status] !== undefined){
          ans = Math.max(ans, i - dict[status])
       } else {
          dict[status] = i
       }
    }
    return ans
};


function move(ch){
    switch(ch){
        case 'a':return 0
        case 'e':return 1
        case 'i':return 2
        case 'o':return 3
        case 'u':return 4
    }
    return -1
}