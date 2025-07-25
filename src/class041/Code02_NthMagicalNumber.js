 var gcd = function(a, b){
    var x = Math.min(a,b)
    var y = Math.max(a,b)
    var tmp = 0
    while(y % x != 0){
        tmp = x
        x = y % x
        y = tmp
    }
    return x
 }

 var lcm = function(a,b){
    return a * b / gcd(a, b)
 }

 /**
 * @param {number} n
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var nthMagicalNumber = function(n, a, b) {
   var c = lcm(a, b)
   var d = Math.floor((a * b * c) * n /((a + b)*(c - 1)))
   var x = d - c
   var y = d + c
//    console.log(c,d,x,y)
   for (var i = x; i <= y; i++){
      var jjj = Math.floor(i / a) +  Math.floor(i / b) - Math.floor(i / c)
    //   console.log(jjj)
      if (jjj == n){
         return i
      }
   }
};

nthMagicalNumber(2,3,4)