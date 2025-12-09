let Max = 200
let fibonacciArr = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
function win1(a,b,c){
   let dp = Array(a+1).fill(0).map(()=>{
       return Array(b+1).fill(0).map(()=>{
           return Array(c+1).fill(-1)
       })
   })
   return recurse(a,b,c,dp)
}

function recurse(a,b,c,dp){
    if (a + b + c == 0){
        return "后手"
    }
    if (dp[a][b][c] != -1){
        return dp[a][b][c]
    }
    let ans = "后手"
    // 从a中拿任意一个斐波那契数字,从b中拿任意一个斐波那契数字,从c中拿任意一个斐波那契数字
    for(let i = 0; i < fibonacciArr.length; i++){
       if (fibonacciArr[i] <= a){// 可以拿
          if (recurse(a - fibonacciArr[i], b, c, dp) == "后手"){
              ans = "先手"
              break;
          }
       }
    }
    if (ans == "后手"){
        for(let i = 0; i < fibonacciArr.length; i++){
           if (fibonacciArr[i] <= b){// 可以拿
              if (recurse(a, b - fibonacciArr[i], c, dp) == "后手"){
                 ans = "先手"
                 break;
              }
           }
       }
    }

    if (ans == "后手"){
        for(let i = 0; i < fibonacciArr.length; i++){
           if (fibonacciArr[i] <= c){// 可以拿
              if (recurse(a, b, c - fibonacciArr[i], dp) == "后手"){
                 ans = "先手"
                 break;
              }
           }
       }
    }
    dp[a][b][c] = ans
    return ans
}


function win2(a,b,c){
    let n = Math.max(a,Math.max(b,c))
    let appear = Array(Max).fill(false)
    let sg = Array(n).fill(0)
    compute(n,sg,appear)
    return (sg[a] ^ sg[b] ^ sg[c]) != 0 ? "先手" : "后手"
}

function compute(n,sg,appear){
    for(let i = 1; i <= n; i++){
        appear.fill(false)
        for(let j = 0; fibonacciArr[j] <= i; j++){
            appear[sg[i - fibonacciArr[j]]] = true
        }
        for(let s=0;s<=Max;s++){
            if (!appear[s]){
                sg[i] = s
                break
            }
        }
    }
}

function valudate(){
    // 构造输出数组 
    let times = 100
    let max = 200
    console.log('开始')
    for(let i = 0; i < times; i++){
        let a = Math.floor((Math.random() * (max * 2 + 1))) + 1
        let b = Math.floor((Math.random() * (max * 2 + 1))) + 1
        let c = Math.floor((Math.random() * (max * 2 + 1))) + 1
        let res1 = win1(a,b,c)
        let res2 = win2(a,b,c)
        if (res1 == res2){
            // console.log('正确:')
            // console.log(res1)
            // console.log("\n")
        }  else {
            console.log('有误:')
            console.log(a,b,c)
            console.log(res1)
            console.log(res2)
            console.log("\n")
        }
    }
    console.log('结束')
}

valudate()