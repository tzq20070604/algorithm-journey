var where = 0
var str = ""

var decodeString = function(s) {
    where = 0
    if (s.length == 0){
       return ""
    }
    str = s
    return decodeStringResursion(0)
};

function decodeStringResursion(cur){
    var path = ""
    var numPrefix = null
    var strPrfix = null
    while(cur < str.length && str[cur] != "]"){
      var cc = str[cur]
      if (cc == '['){
        var ans = decodeStringResursion(cur + 1)
        path = path + Array(numPrefix == null ? 1 : numPrefix).fill(ans).join("")
        numPrefix = null
        strPrfix = null
        cur = where
      } else if ((cc.charCodeAt(0) - '0'.charCodeAt(0) >= 0) && ('9'.charCodeAt(0) - cc.charCodeAt(0) >= 0)) {
        var ccCode = cc.charCodeAt(0) -'0'.charCodeAt(0)
        if (numPrefix === null){ // 前面不是数字
           if (strPrfix){
                 path = path + strPrfix
                 strPrfix = null
           }
           numPrefix = ccCode
        } else {
            numPrefix = numPrefix * 10 + ccCode
        }
        cur++
      } else {
         if (strPrfix === null){
            strPrfix = cc
         } else {
            strPrfix = strPrfix + cc  
         }
         cur++
      }
    }
    if (strPrfix != null){
        path = path + Array(numPrefix == null ? 1 : numPrefix).fill(strPrfix).join("")
    }
    where = cur + 1
    // console.log(path)
    return path
}

//decodeString("3[z]2[2[y]pq4[2[jk]e1[f]]]ef")