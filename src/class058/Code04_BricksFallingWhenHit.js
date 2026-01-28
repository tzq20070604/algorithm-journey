/**
 * 思路：先消除被打的那一块，然后dfs 被消除的节点的上下左右，比如先上变为2，遍历y=0(顶部)，如果有值为2，则说明上面不会掉下来，否则就会掉下来，再dfs左侧，如果左侧不等于2，则dfs左侧为3，遍历顶部如果有值为3，则不会掉落，否则值为3的都会掉落，
 * 将会掉落的和相加，将不会掉落的砖块置1.
 * @param {number[][]} grid
 * @param {number[][]} hits
 * @return {number[]}
 */
var hitBricks = function(grid, hits) {
    var m = grid.length
    var n = grid[0].length
    for (var i = 0; i < hits.length; i++){
        let [x,y] = hits[i]
        // 写二维数组的时候，特别要注意 grid[x][y] grid[x, y]
        grid[x][y]--
    }
    for (var i = 0; i < n; i++){
        if (grid[0][i] == 1){
            dfs(0,i,m,n,grid)
        }
    }
    var arr = Array(hits.length).fill(0)
    for (var i = hits.length - 1; i >= 0 ; i--){
        let [x,y] = hits[i]
        if (worth(x,y,m,n,grid)){
          arr[i] = dfs(x,y,m,n,grid)
          arr[i]--
        }
    }
    return arr
};

function dfs(x,y,m,n,grid){
     if (x < 0 || y < 0 || x >= m || y >= n || (grid[x][y] != 1)){
         return 0
     }
     grid[x][y] = 2
     return 1 + dfs(x-1,y,m,n,grid) + dfs(x+1,y,m,n,grid) + dfs(x,y-1,m,n,grid) + dfs(x,y+1,m,n,grid)

}

function worth(x,y,m,n,grid){
    grid[x][y]++
    if (grid[x][y] != 1){
        return false
    }
    return x == 0 
        || (x > 0 && grid[x-1][y] == 2)
        || (y > 0 && grid[x][y-1] == 2)
        || (x < m-1 && grid[x+1][y] == 2)
        || (y < n-1 && grid[x][y+1] == 2)
}