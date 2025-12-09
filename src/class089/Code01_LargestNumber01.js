/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function(nums) {
    nums.sort((a,b)=>{
      let ans = (String(a) + String(b)) >= (String(b) + String(a))
      return ans ? 1 : -1 
    }) 
    let ans = nums.join('')
    return ans[0] == '0' ? '0' : ans
};

// var largestNumber = function (nums) {
//   nums.sort((a, b) => `${b}${a}` - `${a}${b}`);
//   return nums[0] ? nums.join("") : "0";
// };
