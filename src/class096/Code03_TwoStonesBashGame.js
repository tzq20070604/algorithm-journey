function win1(a,b,m){
    // 第一步在a中取数
    // 第二步在b中取数
    let dp = Array(a+1).fill(0).map(()=>{
        return Array(b + 1).fill(-1)
    })
    return recurse(a,b,m,dp)
}

// 递归加上记忆化搜索
function recurse(a,b,m,dp){
   if (a == b){
      return "后手"
   }
   if (m >= Math.max(a,b)){
      return "先手"
   }
   if (dp[a][b] != -1){
      return dp[a][b]
   }
   let ans = "后手"
   for(let i = 1; i <= a && i <= m; i++){
      if (recurse(a - i, b, m, dp) == "后手"){
         ans = "先手"
         break;
      }
   }
   if (ans == "后手"){
        for(let i = 1; i <= b && i <= m; i++){
            if (recurse(a, b - i, m, dp) == "后手"){
                ans = "先手"
                break;
            }
        }
   }
   dp[a][b] = ans
   return ans
}

// SG定理
function win2(a,b,m){
    let n = Math.max(a,b)
    let appear = Array(m+1).fill(false)
    let sg = Array(n + 1).fill(0)
    for(let i = 1; i <= n; i++){
        appear.fill(false)
        for(let j = 1; j <= i && j <= m; j++){
            appear[sg[i - j]] = 1
        }
        for(let s = 0; s <= m; s++){
            if (!appear[s]){
                sg[i] = s
                break
            }
        }
    }
    // 这里注意sg[a] ^ sg[b] 一定要用括号括起来
    return (sg[a] ^ sg[b]) != 0 ? "先手" : "后手";
}

// 观察法
function win3(a,b,m){
    return a % (m + 1) != b % (m + 1) ? "先手":"后手"
}

/**
 * 
 * @param {number} len >0 生成数组的长度
 * @param {最多值} max >= 0 生成数组的范围
 * @returns 生成[-max,max]之间的任意整数数组
 */
function generate(len,max){
    return Array.from({length:len},()=>{
        //random 范围​​：生成 ​​[0, 1)​​ 之间的伪随机浮点数，即包含 0 但不包含 1
        return Math.floor((Math.random() * (max * 2 + 1))) - max
    })
}

function valudate(){
    // 构造输出数组 
    let times = 200
    let max = 400
    console.log('开始')
    for(let i = 0; i < times; i++){
        let a = Math.floor((Math.random() * (max * 2 + 1))) + 1
        let b = Math.floor((Math.random() * (max * 2 + 1))) + 1
        let m = Math.floor((Math.random() * (max * 2 + 1))) + 1
        let res1 = win1(a,b,m)
        let res2 = win2(a,b,m)
        let res3 = win3(a,b,m)
        win1(a,b,m)
        if (res1 == res2 && res2 == res3){
            // console.log('正确:')
            // console.log(res1)
            // console.log("\n")
        }  else {
            console.log('有误:')
            console.log(a,b,m)
            console.log(res1)
            console.log(res2)
            console.log(res3)
            console.log("\n")
        }
    }
    console.log('结束')
}

valudate()