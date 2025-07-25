/**
 * @param {number[]} tasks
 * @param {number[]} workers
 * @param {number} pills
 * @param {number} strength
 * @return {number}
 */
var maxTaskAssign = function(tasks, workers, pills, strength) {
    tasks = tasks.sort((a,b)=>{return a - b})
    workers = workers.sort((a,b)=>{return b - a })
    //console.log(workers)
    var len = workers.length
    var r = Math.min(tasks.length, workers.length)
    var l = 0
    var max = 0
    while(l <= r){
        var mid = l + ((r - l) >> 1)
        if (f(tasks,workers.slice(0,mid).reverse(), pills, strength, mid)){
            max = Math.max(mid, max)
            l = mid + 1
        } else {
            r = mid - 1
        }
    }
    return max
};

function f(tasks, workers, pills, strength, count){
    //console.log("\n", count, "个")
    //console.log(tasks)
    //console.log(workers)
    var ql = 0, qr = 0
    var need = 0
    for (var i = 0, j = 0; i < count; i++){
       var worker = workers[i]
       while((j < tasks.length) && (worker >= tasks[j])){ // 可以解锁
          //console.log("不吃药可解锁",i, j)
          queue[qr++] = j++
       }
       if (ql < qr && worker >= tasks[queue[ql]]){
           //console.log("不吃药解锁",i, queue[ql])
           ql++
       } else {
            // 吃药解锁
            worker += strength
            need++
            //console.log("吃药后的能力值",i, worker)
            while((j < tasks.length) && (worker >= tasks[j])){ // 可以解锁
                //console.log("吃药后可解锁",i, j)
                queue[qr++] = j++
            }
            if (ql < qr){
               //console.log("吃药后解锁",i, queue[qr-1])
               qr--
            } else {
               //console.log("吃药后可解锁队列依然为空",i)
               return false
            }
       }
    }
    return need <= pills
}

var queue = Array(5 * (10**4)+1).fill(0)
var ql = 0, qr = 0