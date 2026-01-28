/**
 * 关键是如果某个点l开始绕不了一圈，假设r点断了，则说明[l,r-1]之间的点都不能到达，从r点开始重新计算
 * 另外注意取余的妙用
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    if (gas.length == 0){
        return true
    } else {
       arr = gas.map((item,index)=>{
          return gas[index] - cost[index]
       })
    }
    var len = arr.length
    var sum = 0
    for (var r = 0, l = 0; l <=  arr.length - 1; ){
        if (r - l == len){
            return l
        } else {
            sum += arr[r % len]
            if (sum >= 0){
                r++
            } else {
                sum = 0
                l = r + 1
                r = l
            }
        }
    }
    return -1
};

// var gas = [2,3,4], cost = [3,4,3]
// var arr = []
// var res = canCompleteCircuit(gas, cost)
//^(\s*|//\s*)console\.log.*\n