// printPrimeFactors(4012100)
function printPrimeFactors(n){
    let m = n
    for(let i = 2; i * i <= n; i++){
        if (m % i == 0){
            console.log(i)
            while(m % i == 0){
              m = m / i
            }
        }
    }
    if (m > 1){
        console.log(m)
    }
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var largestComponentSize = function(nums) {
    let len = nums.length
    let MAXN = 0
    for(let i = 0; i < len;i++){
       MAXN = Math.max(MAXN, nums[i])
    }
    let factors = Array(MAXN+1).fill(-1)
    let union = new Union(len)
    // 以公共的因子为键，以下标为值
    for(let j = 0; j < len; j++){
        let m = nums[j]
        for(let i = 2; i * i <= m; i++){
            if (m % i == 0){
                if (factors[i] != -1){
                    union.union(factors[i],j)
                } else {
                    factors[i] = j
                }
                while(m % i == 0){
                   m = m / i
                }
            }
        }
        if (m > 1){
            if (factors[m] != -1){
                union.union(factors[m],j)
            } else {
                factors[m] = j
            }
        }
    }
    let ans = 0
    for(let k = 0; k < len; k++){
        ans = Math.max(ans,union.size[union.find(k)]) 
    }
    return ans
};

class Union{
    len = 0
    father = []
    size = []
    constructor(length){
        for (let i = 0; i < length; i++){
            this.father.push(i)
            this.size.push(1)
        }
    }

    isSameUnion(i, j){
       return this.find(i) == this.find(j)
    }

    union(i, j){
       let ri = this.find(i)
       let rj = this.find(j)
       if (ri == rj){
          return true
       } else {
          if (this.size[ri] >= this.size[rj]){
             this.father[rj] = ri
             this.size[ri] += this.size[rj]
          } else {
            this.father[ri] = rj
            this.size[rj] += this.size[ri]
          }
       }
    }

    find(i){
        if (i != this.father[i]){
            this.father[i] = this.find(this.father[i])
        }
        return this.father[i]
    }
}