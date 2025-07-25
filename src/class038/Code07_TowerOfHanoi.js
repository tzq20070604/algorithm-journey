// https://leetcode.cn/problems/hanota-lcci/
// var hanota = function(A, B, C) {
//     while(A.length != 0) {
//         if (A.length == 1){
//             C.push(A.pop())
//             return 
//         }
//         var num = A.pop()
//         hanota(A,B,C)
//         A.push(num)
//     }
// };

// 经典
var hanota = function (from, other, to){
    var deep = from.length
    hanotaResursion(from,other,to,deep)
}
// from 上面有deep个数 从小到大的顺序，请将它移到to上去 从小到大的顺序
function hanotaResursion(from, other, to, deep){
    if (deep == 1){
       to.push(from.pop())
    } else{
        hanotaResursion(from, to, other, deep - 1)
        to.push(from.pop())
        hanotaResursion(other,from, to, deep - 1)
    }
}
var from = [1,2,4,5,7,8,9]
var to = []
var other = []
hanota(from, other, to)
console.log(from)
console.log(other)
console.log(to)