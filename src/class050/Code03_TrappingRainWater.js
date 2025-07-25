/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    var index = 0
    var res = 0
    while(index < height.length){
    //    console.log(index)
       var max = -1
       var maxIndex = -1
       var findIndex = -1
       for(var i = index + 1; i < height.length; i++){
           if (height[i] >= height[index]){
              findIndex = i
              break;
           }
           if (height[i] > max){
              maxIndex = i
              max = height[i]
           }
       }
       if (findIndex != -1){
          res += sum(index, findIndex, height)
          index = findIndex
       } else if (maxIndex != -1) {
          res += sum(index, maxIndex, height)
          index = maxIndex
       } else {
          break;
       }
    }
    return res
};

function sum(i, j, height){
    console.log(i, j)
    var ans = 0
    if (j == -1){
        return 0
    }
    var minHeight = Math.min(height[i], height[j])
    for (var k = i + 1 ; k < j; k++){
       ans += (minHeight - height[k])
    }
    return ans
}

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]))