/**
 * [
  101027544, 144108930,
  282475249, 457850878,
  458777923, 470211272,
  622650073, 984943658
]
[
   16531729,  74243042,
  114807987, 115438165,
  137522503, 143542612,
  441282327, 784484492,
  823378840, 823564440
]
 */

/**
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */
var findRadius = function(houses, heaters) {
   houses = houses.sort((a,b)=>{return a - b})
   heaters = heaters.sort((a,b)=>{return a - b})
   var left = 0
   var right = heaters.length - 1
   var ans = 0
   for (var i = 0; i < houses.length; i++){
        // 返回半径最小的加热器的编号
        var bestHeatIndex = findRadiusResursion(houses,heaters,i, left, right)
        ans = Math.max(ans, Math.abs(heaters[bestHeatIndex] - houses[i]))
        left = bestHeatIndex
   }
   return ans
}

function findRadiusResursion(houses,heaters,houseIndex,left, right){
       var house = houses[houseIndex]
       if (left == right){
           return left
       } 
       if (left == right - 1){
          if (Math.abs(house - heaters[left]) - Math.abs(house - heaters[right]) <= 0){
             return left
          } else {
             return right
          }
       }
       var leftVal = house - heaters[left]
       var rightVal = house - heaters[right]
       var sign1 = (leftVal & (1 << 31))  >>> 31
       var sign2 = (rightVal & (1 << 31)) >>> 31
       var isSame = ((sign1 ^ sign2) == 0)
       //console.log("sign1",sign1,leftVal)
       //console.log("sign2",sign2,rightVal)
       if (isSame){
          if (house - heaters[left] > 0) {
             return right
          } else {
             return left
          }
       }
       var mid = left + ((right - left)>>1)
       var index1 = findRadiusResursion(houses,heaters,houseIndex,left,mid)
       var index2 = findRadiusResursion(houses,heaters,houseIndex,mid + 1,right)
       if (Math.abs(house - heaters[index1]) - Math.abs(house - heaters[index2]) <= 0){
             return index1
        } else {
             return index2
        }
}

// findRadius([1,2,3],[1,2,3])

// findRadius([282475249,622650073,984943658,144108930,470211272,101027544,457850878,458777923],[823564440,115438165,784484492,74243042,114807987,137522503,441282327,16531729,823378840,143542612])