// var workers = [1,2,3,4,5]
// console.log(workers.slice(1,4).reverse())
// console.log(workers)

var arr = [1,2,4,5,6,6,6,6,7,8,9,10]
//请求查找6所在的范围
function find(arr, num){
     var resl = -1, resr = -1
     var l = 0, r = arr.length -1
     while(l <= r){
         var mid = l + ((r - l) >> 1)
         if (arr[mid] == num){
              resl = mid
              resr = mid
              var ll = l, lr = mid - 1
              while(ll <= lr){
                 var lmid = ll + ((lr - ll)>>1)
                 if (arr[lmid] == num){
                    resl = lmid
                    lr = lmid - 1
                 } else {
                    ll = lmid + 1
                 }
              }

              var rl = mid + 1, rr = r
              while(rl <= rr){
                var rmid = rl + ((rr - rl)>>1)
                 if (arr[rmid] == num){
                    resr = rmid
                    rl = rmid + 1
                 } else {
                    rr = rmid - 1
                 }
              }
              break;
         } else if (arr[mid] > num){
              r = mid - 1
         } else {
              l = mid + 1
         }
     }
     return [resl, resr]
}
var res = find(arr, 11)
console.log(res)