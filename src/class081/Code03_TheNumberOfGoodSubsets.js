/**
 * @param {number[]} nums
 * @return {number}
 */
var numberOfGoodSubsets = function(nums) {
    // 因为nums里面的数都是小于30的，质数有29 23 19 17 13 11 7 5 3 2共10个数
    // 每个质数只能出现一次，那么乘积最大值可以确定也就是这10个数相乘，现在用status表示那些位要，那些位不要
    let MaxValue = 30
    let limit = 10 
    let max = (1 << limit)
    let cnt = Array(MaxValue+1).fill(0)
    for(let i = 0; i < nums.length;i++){
       cnt[nums[i]]++
    }
    let ans = 0
    let dp = Array(max).fill(0).map(()=>{
        return Array(MaxValue + 1).fill(-1)
    })
    for(let s = 1; s < max; s++){
        ans += f(s,MaxValue,cnt,dp)
        ans = (ans % MOD)
    }
    return ans
};

const MOD = 1e9+7
//在[1到n]范围内，能否凑够s
function f(s,n,cnt,dp){
    if (n == 1){ 
       if (s == 0){
          let res = 1;
		  for (let j = 0; j < cnt[n]; j++) {
			 res = (res << 1) % MOD;
		  }
          return res
       } else {
          return 0
       }
    }
    if (dp[s][n] != -1){
        return dp[s][n]
    }
    let ans = 0
    ans += f(s,n-1,cnt,dp)
    ans = ans % MOD
    let cur = own[n]
    if(cur != 0 && cnt[n] != 0 && ((s & cur) == cur)){
        ans += (cnt[n] * f(s^cur,n-1,cnt,dp)) % MOD
        ans = ans % MOD
    }
    dp[s][n] = ans
    return ans
}

var own = [ 0b0000000000, // 0
			0b0000000000, // 1
			0b0000000001, // 2
			0b0000000010, // 3
			0b0000000000, // 4
			0b0000000100, // 5
			0b0000000011, // 6
			0b0000001000, // 7
			0b0000000000, // 8
			0b0000000000, // 9
			0b0000000101, // 10
			0b0000010000, // 11
			0b0000000000, // 12
			0b0000100000, // 13
			0b0000001001, // 14
			0b0000000110, // 15
			0b0000000000, // 16
			0b0001000000, // 17
			0b0000000000, // 18
			0b0010000000, // 19
			0b0000000000, // 20
			0b0000001010, // 21
			0b0000010001, // 22
			0b0100000000, // 23
			0b0000000000, // 24
			0b0000000000, // 25
			0b0000100001, // 26
			0b0000000000, // 27
			0b0000000000, // 28
			0b1000000000, // 29
			0b0000000111 // 30
            ]
