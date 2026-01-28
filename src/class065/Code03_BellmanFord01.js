/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function(n, flights, src, dst, k) {
   if (src === dst) return 0; // 特判相同城市
   let cur = Array(n).fill(Infinity)
   let next = Array(n).fill(Infinity)
   cur[src] = 0
   next[src] = 0
   // 可以松弛k+1次
   for (let i =0; i <= k; i++){
       for (let [u,v,w] of flights){
          //原点到u的距离+w的距离 能否小于起始点到v的距离
          if (cur[u] != Infinity && cur[u] + w < next[v]){
             next[v] = cur[u] + w
          }
       }
       // 这一步很重要 不然就是修改一个指针
       cur = [...next]
   }
   return cur[dst] != Infinity ? cur[dst] : -1
};


