/**
 * @param {number[][]} hats
 * @return {number}
 */
var numberWays = function(hats) {
    let n = hats.length
    let persons = Array(40 + 1).fill(0)
    for(let i = 0; i < hats.length; i++){
        for(let j = 0; j < hats[i].length; j++){
            persons[hats[i][j]] |= (1 << i)
        }
    }
    let status = 0
    let satify = (1 << n) - 1
    let dp = Array(41).fill(0).map(()=>{
        return Array(satify + 1).fill(-1)
    })
    return f(0,status,satify,persons,dp)
};

let MOD = 10**9 + 7
// 1e9 + 7
/**
 * 返回所有人都被满足时的总方案数
 * @param {*} cur 当前帽子的序号
 * @param {*} status 当前这些人的状态
 * @param {*} satify  所有人都满足的状态
 * @param {*} persons 当前帽子有那些人喜欢
 * @param {*} n 总人数
 */
function f(cur,status,satify,persons,dp){
    if (status == satify){
        return 1
    }
    if(cur == persons.length){
        return 0
    }

    if (dp[cur][status] != -1){
        return dp[cur][status]
    }
    // 不使用这个帽子
    let ans = f(cur + 1,status,satify,persons,dp)
    // 使用这个帽子
    let person = persons[cur]
    while(person != 0){
        // person保留最右侧的1，其余位置置0
        let rightOne = person & (-person)
        // 此帽子这个人喜欢，这个人没有被满足
        if ((status & rightOne) == 0){
            ans = (ans + f(cur + 1,(status | rightOne),satify,persons,dp)) % MOD
        }
        // 这个要注意
        person = person ^ rightOne
    }
    dp[cur][status] = ans
    return ans
}