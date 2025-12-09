/**
 * @param {string} s
 * @return {number}
 */
var distinctSubseqII = function(s) {
    const MOD = 10**9 + 7
    let all = 1
    let cnt = Array(26).fill(0)
    let arr = s.split('').map((item)=>{return item.charCodeAt(0) - 'a'.charCodeAt(0)})
    for(let item of arr){
        let newAdd = (all - cnt[item] + MOD) % MOD 
        cnt[item] = (cnt[item] + newAdd) % MOD 
        all = (all + newAdd) % MOD 
    }
    return (all - 1 + MOD) % MOD 
};