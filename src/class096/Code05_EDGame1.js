// https://www.luogu.com.cn/problem/P2148
// 由分析得知道每堆石子是独立的,但是Si最大为2x10^^9,二维就更大，所以观察规律打表

let MAXN = 1000
let dp = Array(MAXN + 1).fill(0).map(()=>{
    return Array(MAXN + 1).fill(-1)
})

function computeSg1(x,y){
    if (x * y == 1){
        dp[x][y] = 0
        return 0
    }
    if (dp[x][y] != -1){
        return dp[x][y]
    }
    let appear = Array(Math.max(x,y)).fill(false)
    // 分割
    if (x > 1){ // 分割x
       for(let pick = 1; pick < x; pick++){
          appear[computeSg1(pick, x-pick)] = true
       }
    }
    if (y > 1){ // 分割y
       for(let pick = 1; pick < y; pick++){
          appear[computeSg1(pick, y-pick)] = true
       }
    }
    let ans = 0
    for(let s = 0; s <= Math.max(x,y); s++){
        if(!appear[s]){
            ans = s
            break;
        }
    }
    dp[x][y] = ans
    return ans
}


function computeSg2(x,y){
    return lowerZero((x-1) | (y-1))
}

function lowerZero(n){
    let ans = 0
    while(n >= 0){
       if ((n & 1) == 0){
         break;
       }
       n = (n >> 1)
       ans++
    }
    return ans
}

function validate(){
    console.log("开始")
    for(let x = 1; x <= 100; x++){
        for(let y = 1; y <= 100; y++){
            let ans1 = computeSg1(x,y)
            let ans2 = computeSg2(x,y)
            if (ans1 != ans2){
            console.log("有误")
            console.log(`x=${x},y=${y}`)
            console.log("ans1",ans1)
            console.log("ans2",ans2)
            console.log("\n")
            } else {
    
            }
        }
    }
    console.log("结束")
}

validate()