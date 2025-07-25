/**
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */
var findRadius = function(houses, heaters) {
   houses = houses.sort((a,b)=>{return a - b})
   heaters = heaters.sort((a,b)=>{return a - b})
   var res = 0
   for(var j = 0, h = 0; j < houses.length; j++){
       while(!bestHeater(houses, heaters,j,h)){
          h++
       }
       res = Math.max(res, Math.abs(houses[j] - heaters[h]))
   }
   return res
};

function bestHeater(houses, heaters,houseIndex,heaterIndex){
   if (heaterIndex == heaters.length - 1){
       return true
   } else {
       var house = houses[houseIndex]
       var h1 = Math.abs(house - heaters[heaterIndex])
       var h2 = Math.abs(house - heaters[heaterIndex + 1])
       return h1 < h2 ? true : false
   }
}
