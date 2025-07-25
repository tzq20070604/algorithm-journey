/**
 * @param {number[][]} richer
 * @param {number[]} quiet
 * @return {number[]}
 */
var loudAndRich = function(richer, quiet) {
    let n = quiet.length
    let m = richer.length
    let anser = Array(n).fill(0)
    let graph = Array(n).fill(0).map(()=>{return []})
    let indgree = Array(n).fill(0)
    let queue = Array(n).fill(0)
    let l = 0, r = 0
    // 1.建图 统计入度
    for (let i=0;i<m;i++){
       let [fp, tp] = richer[i]
       graph[fp].push(tp)
       indgree[tp]++
    }
    console.log(graph)
    // 2.入队列，更新入度和安静值
    for (let i=0;i<n;i++){
       anser[i] = i
       if(indgree[i] == 0){
         queue[r++] = i
       }
    }

    while(l < r){
       let node = queue[l++]
       for (let item of graph[node]){
          if (quiet[anser[item]] > quiet[anser[node]]){
              anser[item] = anser[node]
          }
        indgree[item]--
        if (indgree[item] == 0){
            queue[r++] = item
        }
       }
    }
    return anser
};