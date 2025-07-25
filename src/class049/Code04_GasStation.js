/**
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