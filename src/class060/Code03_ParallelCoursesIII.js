/**
 * @param {number} n
 * @param {number[][]} relations
 * @param {number[]} time
 * @return {number}
 */
var minimumTime = function(n, relations, time) {
    time.unshift(0)
    let graph = Array(n + 1).fill(0).map(()=>{return []})
    let indgree = Array(n + 1).fill(0)
    let anser = Array(n + 1).fill(0)
    let queue = []
    let ans = 0
    for (let i = 0; i < relations.length; i++){
       let [fp, tp] = relations[i]
       indgree[tp]++
       graph[fp].push(tp)
    }
    for (let i = 1; i < n + 1;i++){
        if (indgree[i] == 0){
            queue.push(i)
            anser[i] = time[i]
            ans = Math.max(ans, anser[i])
        }
    }
    while(queue.length > 0){
       let node = queue.shift()
       ans = Math.max(ans, anser[node])
       for (let tp of graph[node]){
          anser[tp] = Math.max(anser[node],anser[tp])
          indgree[tp]--
          if (indgree[tp] == 0){
            anser[tp] += time[tp]
            queue.push(tp)
          }
       }
    }
    return ans
};