/**
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */
var findRadius = function(houses, heaters) {
   houses = houses.sort((a,b)=>{return a - b})
   heaters = heaters.sort((a,b)=>{return a - b})
   var res = 0
   for(var j = 0; j < houses.length; j++){
       var house = houses[j]
       var left = 0, right = heaters.length - 1
       var ans = Infinity
       while(left <= right){
          if(Math.abs(house -  heaters[left]) < Math.abs(house -  heaters[right])){
              ans = Math.min(ans, Math.abs(house -  heaters[left]))
              right--
          } else {
              ans = Math.min(ans, Math.abs(house -  heaters[right]))
              left++
          }
       }
       res = Math.max(res, ans)
   }
   return res
};