/**
 * @param {string[]} grid
 * @return {number}
 */
var shortestPathAllKeys = function(grid) {
    let m = grid.length
    let n = grid[0].length
    let start = []
    let key = 0
    for(let i = 0; i < m;i++){
        for (let j = 0; j < n; j++){
           let ch = grid[i][j]
           if (ch == '@'){
             start = [i,j]
           } else {
             if (ch.charCodeAt(0) >= 'a'.charCodeAt(0) && ch.charCodeAt(0) <= 'z'.charCodeAt(0)){
                 let del = ch.charCodeAt(0) - 'a'.charCodeAt(0)
                 key |= (1 << del)
             }
           }
        }
    }
    let queue = []
    let level = -1
    let visit = Array(m).fill(0).map(()=>{return Array(n).fill(0).map(()=>{return Array(key + 1).fill(false)})})
    visit[start[0]][start[1]][0] = true; 
    queue.push([start[0], start[1], 0])
    let derect = [[0,1],[0,-1],[1,0],[-1,0]]
    while(queue.length > 0){
        let size = queue.length
        level++
        for (let i =0;i < size;i++){
            let [row,col,status] = queue.shift()
            if (status == key){
               return level
            }
            //前后左右 
            for (let [delRow,delCol] of derect){
                let nextRow = row + delRow
                let nextCol = col + delCol
                if (nextRow < 0 || nextRow >= m || nextCol < 0 || nextCol >= n){
                    continue
                }
                let next = grid[nextRow][nextCol]
                // 如果是墙
                if (next == '#'){
                    continue
                } else if (next.charCodeAt(0) >= 'A'.charCodeAt(0) && next.charCodeAt(0) <= 'Z'.charCodeAt(0)){
                     // 如果是锁，判断是否能开锁
                    let lock = next.charCodeAt(0) - 'A'.charCodeAt(0)
                    if ((status & (1 << lock)) !== 0){ // 可以开锁
                        if (!visit[nextRow][nextCol][status]){
                            visit[nextRow][nextCol][status] = true
                            queue.push([nextRow,nextCol,status])
                        }
                    }
                } else if (next.charCodeAt(0) >= 'a'.charCodeAt(0) && next.charCodeAt(0) <= 'z'.charCodeAt(0)){
                     // 如果是钥匙，判断是否可以加入
                    let tmp = status | (1 << (next.charCodeAt(0) - 'a'.charCodeAt(0)))
                    if (!visit[nextRow][nextCol][tmp]){
                        visit[nextRow][nextCol][tmp] = true
                        queue.push([nextRow,nextCol,tmp])
                    }
                } else {
                    // 其他
                    if (!visit[nextRow][nextCol][status]){
                        visit[nextRow][nextCol][status] = true
                        queue.push([nextRow,nextCol,status])
                    }
                }
            }
        }
    }
    return -1
};