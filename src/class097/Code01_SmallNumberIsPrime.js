function isPrime(n){
    if (n <= 1){
        return false
    }
    for(let i = 2; i * i <= n;i++){
        if (n % i == 0){
            return false
        }
    }
    return true
}
let ans = '['
for(let i = 1; i <= 100; i++){
    if (isPrime(i)){
        if (ans != '['){
            ans += ', '
        }
        ans += `${i}`
    }
}
ans += ']'
console.log(ans)
// [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
// [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n, 43n, 47n, 53n, 59n, 61n, 67n, 71n, 73n, 79n, 83n, 89n, 97n]