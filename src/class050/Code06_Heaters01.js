/**
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */
var findRadius = function(houses, heaters) {
   houses = houses.sort((a,b)=>{return a - b})
   heaters = heaters.sort((a,b)=>{return a - b})
   var heatIndex = 0
   var ans = 0
   for (var i = 0; i < houses.length; i++){
        // 返回半径最小的加热器的编号
        var bestHeatIndex = findRadiusResursion(houses,heaters,i,heatIndex)
        ans = Math.max(ans, Math.abs(heaters[bestHeatIndex] - houses[i]))
        heatIndex = bestHeatIndex
   }
   return ans
}

function findRadiusResursion(houses,heaters,houseIndex,heatIndex){
       var house = houses[houseIndex]
       var left = heatIndex, right = heaters.length - 1, bestIndex = -1
       while(left <= right){
          if(Math.abs(house -  heaters[left]) < Math.abs(house -  heaters[right])){
              bestIndex = left
              right--
          } else {
              bestIndex = right
              left++
          }
       }
      return bestIndex
}