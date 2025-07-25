/**
 * @param {number} n
 * @param {number[]} batteries
 * @return {number}
 */
var maxRunTime = function(n, batteries) {
    var sum = 0
    var max = 0
    for (var i = 0; i < batteries.length; i++){
       var tmp = batteries[i]
       sum += tmp
       max = Math.max(max, tmp)
    }
    var value = sum / n
    if (value >= max){
        return Math.floor(value)
    }
    var res = 0
    for (var l = 0, r = max; l <= r;){
        var mid = l + ((r - l)>>1)
        var satisfy = isTimeSatisfy(batteries,mid,n)
        if (satisfy){
           res = mid
           l = mid + 1
        } else {
           r = mid - 1
        }
    }
    return res
};

function isTimeSatisfy(batteries,time,n){
    var count = n
    var sum = 0
    for (var i = 0; i < batteries.length; i++){
        var b = batteries[i]
        if (b >= time){
            count--
        } else {
            sum += b
        }
    }
    if (count * time <= sum){
        return true
    } else {
        return false
    }
}