const maxValue1 = function(n,k){
     let b = n % k
     let a = (n - b) / k
     let p1 = power(a,k-b)
     let p2 = power(a+1,b)
     ans = quickMuti(p1,p2)
     return ans
}

const mod = 10 ** 9 + 7
function power(base,pow){
   let ans = 1
   for(let i = 1; i <= pow; i++){
       ans = ans * base % mod
   }
   return ans
}

function quickMuti(a,b){
   let ans = 0
   while(b != 0){
      if ((b & 1) == 1){
         ans = (ans + a) % mod
      }
      b = (b >> 1)
      a = (a << 1) % mod
   }
   return ans
}
