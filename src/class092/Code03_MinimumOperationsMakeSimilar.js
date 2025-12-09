/**
 * @param {number[]} nums
 * @param {number[]} target
 * @return {number}
 */
var makeSimilar = function(nums, target) {
    let a1 = [], b1 = [], a2 = [],b2 =[]
    for(let i = 0; i < nums.length; i++){
        if ((nums[i] & 1) == 1){
            a1.push(nums[i])
        } else {
            b1.push(nums[i])
        }
        if ((target[i] & 1) == 1){
            a2.push(target[i])
        } else {
            b2.push(target[i])
        }
    }
    a1.sort((a,b)=>{return a - b})
    b1.sort((a,b)=>{return a - b})
    a2.sort((a,b)=>{return a - b})
    b2.sort((a,b)=>{return a - b})
    let sum = 0
    for(let j = 0; j < a1.length; j++){
        sum += Math.abs(a1[j] - a2[j])
    }
    for(let j = 0; j < b1.length; j++){
        sum += Math.abs(b1[j] - b2[j])
    }
    return sum / 4
};