// 巴什博弈(Bash Game)
// 一共有n颗石子，两个人轮流拿，每次可以拿1~m颗石子
// 拿到最后一颗石子的人获胜，根据n、m返回谁赢
// 思考过程：其实这个也是动态规划问题，
// 显然如果石头数量n <= m，先手赢，
// 如果n = m + 1,先手输掉,谁先遇到这种情况谁失败
// 如果n > m + 1 && n <= 2*m + 1, 先手赢
// 如果 n = 2 * m + 2 后手赢

function bashGame1(n,m){
     return n % (m + 1) == 0 ? "后手":"先手"
}

function bashGame2(n,m){
     let dp = Array(n+1).fill(0).map(()=>{
         return Array(m+1).fill(-1)
     })
     return f(n,m,dp)
}

function f(n,m,dp){
    if (n == 0){
        return "后手"
    }
    if (n <= m){
       return "先手"
    }
    if (dp[n][m] != -1){
        return dp[n][m]
    }
    let ans = "后手"
    for(let pick = 1; pick <= m; pick++){
        // 先手取pick个
        if (f(n - pick, m, dp) == "后手"){
            ans = "先手"
            break;
        }
    }
    dp[n][m] = ans
    return dp[n][m]
}

/**
 * 
 * @param {number} len >0 生成数组的长度
 * @param {最多值} max >= 0 生成数组的范围
 * @returns 生成[1,2*max + 1]之间的任意整数数组
 */
function generate(len,max){
    return Array.from({length:len},()=>{
        //random 范围​​：生成 ​​[0, 1)​​ 之间的伪随机浮点数，即包含 0 但不包含 1。
        let n = Math.floor((Math.random() * (max * 2 + 1))) + 1
        let m = Math.floor((Math.random() * (max * 2 + 1))) + 1
        return [n,m]
    })
}

function valudate(){
    // 构造输出数组 
    let times = 10000
    let max = 400
    let length = 200
    console.log('开始')
    for(let i = 0; i < times; i++){
        let n = Math.floor((Math.random() * (max * 2 + 1))) + 1
        let m = Math.floor((Math.random() * (max * 2 + 1))) + 1
        let res1 = bashGame1(n,m)
        let res2 = bashGame2(n,m)
       
        if (res1 != res2){
            console.log('有误:=========================')
            console.log(res1)
            console.log(res2)
            console.log("\n")
        } else {
        //    console.log("正确",res1,res2)
        }
    }
    console.log('结束') 
}

function func1(nums){
    return nums.length
}

function func2(nums){
    return nums.length
}

valudate()