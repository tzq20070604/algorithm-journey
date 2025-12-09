/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function(nums) {
    let size = {}
    for(let i = 0; i < nums.length; i++){
        size[nums[i]] = getSize(nums[i])
    }
    nums.sort((a,b)=>{
        let l = a * Math.pow(10,size[b]) + b
        let r = b *  Math.pow(10,size[a]) + a
        return r - l
    })
    let ans = nums.join('').replace(/^0+(?=[0-9])/,'')
    return ans
};

function getSize(num){
    if (num == 0){
        return 1
    }
    let a = 0
    let b = num
    while(b > 0){
        b = Math.floor(b / 10)
        a++
    }
    return a
}
