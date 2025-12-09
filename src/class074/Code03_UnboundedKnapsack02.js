// 最大公约数优化
const fs = require('fs')
let arr = fs.readFileSync('/dev/stdin','utf8').trim().split('\n')
for(let i = 0; i < arr.length; i++){
    arr[i] = arr[i].trim().split(' ').map(Number)
}
function f(arr){
    let [t,m] = arr[0]
    // 求最大公约数
    // 然后time 也减小
    let sub = getArrGcd(arr)
    getMax(t, arr, sub)
    function gcd(a, b) {
        if (b === 0) return a;
        return gcd(b, a % b);
    }
    function getArrGcd(arr){
        let sub = 1
        for(let i = 1; i < arr.length; i++){
            if (i == 0){
                sub = v
            } else {
                sub = gcd(sub,arr[i][0])
            }
        }
        return sub
    }

    function getMax(t,arr,sub){
        t = Math.floor(t / sub)
        let buffer1 = new ArrayBuffer((Math.ceil(t / sub) + 1) * 8);
        let dp = new Float64Array(buffer1);
        for(let i = 2; i <= arr.length;i++){
            let [v,w] = arr[i-1]
            v = v / sub
            for(let time=1; time <= t; time++){
                if (time >= v){
                    dp[time] = Math.max(dp[time],dp[time-v] + w)
                } 
            }
        }
        console.log(dp[t])
    }
}
f(arr)