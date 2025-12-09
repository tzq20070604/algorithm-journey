/**
 * 这道题看起来很难，其实也就是普通的动态规划，涉及到第N个工作是做，还是不做的问题
 * 归根到底是一个0.1背包问题
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number}
 */
var jobScheduling = function(startTime, endTime, profit) {
    let jobs = []
    for(let i=0;i < startTime.length;i++){
       jobs.push([startTime[i],endTime[i],profit[i]])
    }
    jobs.sort((a,b)=>{
        if (a[1] != b[1]){
            return a[1] - b[1]
        } else if (a[0] != b[0]){
            return a[0] - b[0]
        } else {
            return a[2] - b[2]
        }
    })
    let dp = Array(startTime.length).fill(-1)
    return f(jobs.length - 1,dp,jobs)
};
// index份工作的是否能获得的最大报酬
function f(index,dp,jobs){
    if(index == 0){
        return jobs[0][2]
    } 
    if (dp[index] != -1){
        return dp[index]
    }
    // 如果不做这份工作
    let res = 0
    res = f(index - 1,dp,jobs)
    // 做这份工作,剩下结束的最大值不能超过开始时间
    let x = findIndex(jobs[index][0],index,jobs)
    if (x != -1){
       res = Math.max(res,f(x,dp,jobs) + jobs[index][2])
    } else {
       res = Math.max(res,jobs[index][2])
    }
    dp[index] = res
    return res
}

// 找到结束时间<= startTime，最大结束时间的工作的编号
function findIndex(startTime,cur,jobs){
    let l = 0, r = cur -1,index = -1 
    while(l <= r){
        let mid = l + ((r - l) >> 1)
        if (jobs[mid][1] <= startTime){
            index = mid
            l = mid + 1
        } else {
            r = mid - 1
        }
    }
    return index
}