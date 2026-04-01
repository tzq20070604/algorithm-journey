/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function(times, n, k) {
    // 建图
    let graph = Array(n+1).fill(0).map(()=>{ return []})
    for (let i = 0; i < times.length; i++){
        let [ui, vi, wi] = times[i]
        graph[ui].push([vi, wi])
    }

    // 流程
    let distance = Array(n+1).fill(Infinity)
    let visited = Array(n+1).fill(false)
    let heap = new Heap(Heap.HeapType.SMALL, (item1,item2)=>{
        return item1[1] - item2[1]
    })
    distance[k] = 0
    heap.insert([k, 0])
    while(!heap.isEmpty()){
       let [v,s] = heap.pop()
       if (!visited[v]){
          visited[v] = true
          for(let i = 0; i < graph[v].length; i++){
              let [u,c] = graph[v][i]
              if (s + c < distance[u]){
                 distance[u] = s + c
                 heap.insert([u, distance[u]])
              }
          }
       }
    }
    let ans = 0
    for (let i = 1; i <= n; i++){
        ans = Math.max(ans, distance[i])
    }
    return (ans == Infinity) ? -1 : ans
};


