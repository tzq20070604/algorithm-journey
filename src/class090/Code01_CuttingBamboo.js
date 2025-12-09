/**
 * @param {number} bamboo_len
 * @return {number}
 */
var cuttingBamboo = function(bamboo_len) {
    if (bamboo_len <= 3){
        let arr = [0,0,1,2]
        return arr[bamboo_len]
    } else {
        let yu = bamboo_len % 3
        let pow = 0
        let tail = 1
        if (yu == 0){
           pow = bamboo_len / 3
        } else if (yu == 1){
           tail = 4
           pow = (bamboo_len - tail) / 3
        } else { // 2
           tail = 2
           pow = (bamboo_len - tail) / 3
        }
        return power1(3,pow) * tail % mod
    }
};

const mod = 10 ** 9 + 7
function power(base,pow){
   let ans = 1
   for(let i = 1; i <= pow; i++){
       ans = ans * base % mod
   }
   return ans
}

function power1(x,n){
   let ans = 1
   while(n > 0){
        if ((n & 1) == 1){
          ans = quickMuti(ans,x) % mod
        }
        // 这里可能会溢出
        x = quickMuti(x,x) % mod
        n = (n >> 1)
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