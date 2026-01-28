/**
 * 假设当前字符为a,这一次由2部分组成，现有的字符，和所有的字符都加一个a，所有的字符新加一个a和现有的字符有重复的减掉
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