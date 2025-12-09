let input = ''
process.stdin.on('data',(data)=>{
    input += data
})

process.stdin.on('end',()=>{
   let group = 0
   let lineNum = 0
   let lines = input.trim().split('\n')
   if (lineNum == 0){
      group = parseInt(lines[lineNum])
      lineNum++
   }
   let res = []
   for (let i = 0; i < group; i++){
      let [n,m] = lines[lineNum++].split(' ').map(Number)
      let end = lineNum + m - 1
      let graph = Array(n + 1).fill(0).map(()=>{return []});
      for (;lineNum <= end;lineNum++){
         let [u,v,w] = lines[lineNum].split(' ').map(Number)
         if (w >= 0){
           graph[u].push([v,w])
           graph[v].push([u,w])
         } else {
           graph[u].push([v,w])
         } 
      }
      res.push(claculate(n,graph))
   }
    // 计算结果
   console.log(res.join('\n'))
})

function claculate(n, graph){
    let distance = Array(n + 1).fill(Infinity)
    let enter = Array(n + 1).fill(false)
    let anser =  Array(n + 1).fill(0)
    let queue =[]
    distance[1] = 0
    enter[1] = true
    anser[1] = 1
    queue.push(1)
    let front = 0
    while(front < queue.length){
        let u = queue[front++]
        enter[u] = false
        for (let j =0;j < graph[u].length;j++){
           // 当下的边 
           let [v,w] = graph[u][j]
           if (distance[u] + w < distance[v]) {
               distance[v] = distance[u] + w
               if (!enter[v]){
                  anser[v]++
                  if (anser[v] > n -1){
                    return "YES"
                  }
                  enter[v] = true
                  queue.push(v)
               }
           }
        }
    }
    return "NO"
}