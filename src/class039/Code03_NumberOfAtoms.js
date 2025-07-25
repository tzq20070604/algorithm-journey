var where = 0
var dict = {}
var str = ""
var countOfAtoms = function(formula) {
    where = 0
    dict = {}
    if (formula.length == 0){
        return ""
    }
    str = formula
    var dict = countOfAtomsResursion(0)
    return stringFromDict(dict)
};
function stringFromDict(dict){
   var path = ""
   var keys = Object.keys(dict).sort()
   for (var key of keys){
      var value = dict[key]
      path += key
      path += (value == 1 ? "": value)
   }
   return path
}
var countOfAtomsResursion = function(cur){
    var name = null
    var pre = null
    var count = 0
    var total = {}
    while(cur < str.length && str[cur] != ")"){
        var ch = str[cur]
        if (ch >= 'A' && ch <= 'Z' || ch == '('){ // 需要结算,或开始新的递归
            if (name != null){
                total[name] = (total[name] ?? 0) + (count ? count : 1)
                name = null
                count = 0
            } 
            if (pre != null){
                fill(total, pre, count ? count : 1)
                pre = null
                count = 0
            }
            if (ch == "("){
                pre = countOfAtomsResursion(cur + 1)
                // ^(\s)*console\.log[^\n]*\n 可删除console.log("aaa")
                // ^\s*\n 删除所有的空行
                cur = where 
            } else {
                name = ch
                cur++
            }
        } else if (ch >= 'a' && ch <= 'z'){
            name += ch
            cur++
        } else { // 等于数字
            count = count * 10 + (ch.charCodeAt(0) - '0'.charCodeAt(0))
            cur++
        }
    }
    if (name != null){
        total[name] = (total[name] ?? 0) + (count ? count : 1)
        name = null
     } 
    if (pre != null){
        fill(total, pre, count ? count : 1)
        pre = null
        count = 0
    }
    where = cur + 1
    return total
}
function fill(total, pre, count){
    for (var key in pre){
        var old = total[key] ?? 0
        total[key] = pre[key] * count + old
    }
}