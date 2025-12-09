// 其实很简单 就是最大公约数的问题
const AbsoluteValueAddToArray = function (arr){
    let max = 0
    for(let item of arr){
        max = Math.max(item, max)
    }
    if (max == 0){ // 全是0
        return arr.length
    }
    // 不全是0
    let del = max
    let cnt = {}
    for(let item of arr){
        if (item != 0){
            del = gcd(del,item)
        }
        if (cnt[item] === undefined){
            cnt[item] = 0
        }
        cnt[item]++
    }
    let all = max / del
    let maxCount = 0
    for(let key of Object.keys(cnt)){
        if (key != 0){
           all += cnt[key] - 1
        }
        maxCount = Math.max(maxCount,cnt[key])
    }
    if (cnt[0] === undefined){
        if (maxCount > 1){
            all += 1
        }
    } else {
        all += cnt[0]
    }
    return all
}
/**
 * 
 * @param {Number} m  被除数
 * @param {Number} n  除数
 */
function gcd(m,n){
    return n == 0 ? m : gcd(n, m % n)
}
let res = AbsoluteValueAddToArray([1,5,7])
console.log(res)

let res1 = AbsoluteValueAddToArray([2,4,6])
console.log(res1)

let res2 = AbsoluteValueAddToArray([2,4,6,6])
console.log(res2)

let res3 = AbsoluteValueAddToArray([0,2,4,6,6])
console.log(res3)