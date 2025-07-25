/**
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