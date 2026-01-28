/**
 * 理解筛的含义，不难，但是很绕
 * @param {number} n
 * @return {number}
 */
var countPrimes = function(n) {
    return euler(n-1)
};

function ehrlich(n){
    if(n <= 1){
        return 0
    }
    // 默认都是质数
    let visit = Array(n+1).fill(false)
    //有因子，肯定是[2,根号i] 从小到大取碰撞，碰到了就是合数，否则就是质数
    for(let i = 2; i * i <= n; i++){
         // 如果visit[i]为true，说明之前肯定有比i小因子筛选过
       if (!visit[i]){
           //使用i因子,筛选一遍，比i*i小的，肯定比小的因子筛选过
           // 比如 i * (i-1),肯定被i-1筛选过
           for(let j = i * i; j <= n; j += i){
              visit[j] = true
           }
       }
    }
    let ans = 0
    for(let i = 2;i <= n; i++){
       if (!visit[i]){
          ans++
       }
    }
    return ans
}

function euler(n){
    if(n <= 1){
        return 0
    }
    // 默认都是质数
    let visit = Array(n+1).fill(false)
    let prime = []
    for(let i = 2; i <= n; i++){
        if (!visit[i]){
            // 说明i为质数
            prime.push(i)
        }
        for(let j = 0; j < prime.length;j++){
            if (i * prime[j] > n){
                break
            }
           
            if (i % prime[j] == 0){
                // 如果后续还是i去乘的话，就包含了prime[j]的因子，不是由最小的因子去设置的
                break
            }
            visit[i * prime[j]] = true
        }
    }
    return prime.length
}

// 只是计数的话
// 埃氏筛还能改进
function ehrlich2(n){
    if(n <= 1){
        return 0
    }
    // 默认都是质数
    let visit = Array(n+1).fill(false)
    // 先除掉偶数,剩下的数字，相当于将2的因子删除后的数量
    let count = (n + 1) >> 1
    // 从小到大取碰撞，碰到了就是合数，否则就是质数
    for(let i = 3; i * i <= n; i = i + 2){
         // 如果visit[i]为true，说明之前肯定有比i小因子筛选过
       if (!visit[i]){
        // 因为i为质数且不为2，i*i一定为奇数，i * i + i为偶数
           for(let j = i * i; j <= n; j += 2*i){
              if(!visit[j]){
                 count--
                 visit[j] = true
              }
           }
       }
    }
    return count
}