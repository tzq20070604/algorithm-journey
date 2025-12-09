/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function(days, costs) {
    // 选择1，7 和30 天
    dayArr = days
    costArr = costs
    lessArr = Array(days.length).fill(-1)
    sum = lessCost(0)
    return sum
};

let dayArr = []
let costArr =[]
let lessArr = []
function lessCost(index){
    if (index == dayArr.length){
        return 0
    }
    if (lessArr[index] != -1){
        return lessArr[index]
    }
    let tmp = index
    let sevenIndex = index
    let thirstyIndex = index
    while(tmp < dayArr.length){
        if (dayArr[tmp] - dayArr[index] <= 6){
           sevenIndex = tmp
           thirstyIndex = tmp
           tmp++
        } else if (dayArr[tmp] - dayArr[index] <= 29){
           thirstyIndex = tmp
           tmp++
       } else {
          break
       }
    }
    let a1 = costArr[0] + lessCost(index + 1)
    let a2 = costArr[1] + lessCost(sevenIndex + 1)
    let a3 = costArr[2] + lessCost(thirstyIndex + 1)
    let res = Math.min(a1,a2,a3)
    lessArr[index] = res
    return res
}