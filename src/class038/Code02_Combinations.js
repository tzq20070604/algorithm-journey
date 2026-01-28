/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var total = []
var numArr = []
var subsetsWithDup = function(nums) {
   if (nums.length == 0){
      return total
   }
   numArr = nums.sort((a,b)=>{return a-b})
   total = []
   subsetRecursion([],0)
   return total
};

/**
 * @param {number[]} path
 * @param {number} i
 * @return {null} 
 */
var subsetRecursion = function(path, i){
   if (i >= numArr.length){
      total.push(path)
      return
   }
   var j = i
   while(numArr[j + 1] == numArr[j]){
     j++
   }
   // 相同的数[i, j] 
   for (var k = 0; k <= j - i + 1; k++){
     //console.log(`i = ${i}, j = ${j}, k=${k}, num[i] =${numArr[i]}`)
     // 选择0到j - i + 1个arr[i]
     var items = Array(k).fill(numArr[i])
     var path1 = path.concat(items)
     subsetRecursion(path1,j + 1)
   }
}