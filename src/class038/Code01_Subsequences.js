/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 
 * @param s string字符串 
 * @return string字符串一维数组
 */

var set = new Set()
function generatePermutation( s ) {
    subresursion("",0, s)
    return [...set]
}

function subresursion(pre, index, str){
   if (index == s.length - 1){
        set.add(pre + str.charAt(index))
        set.add(pre)
   } else {
    // 要
        var pre1 = pre
        pre = pre + str.charAt(index)
        subresursion(pre,index + 1, str)
        subresursion(pre1,index + 1, str)
   }
}
module.exports = {
    generatePermutation : generatePermutation
};