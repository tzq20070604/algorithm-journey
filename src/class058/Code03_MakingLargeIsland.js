/**
 * @param {number[][]} grid
 * @return {number}
 */
var largestIsland = function(grid) {
    var id = 1
    var m = grid.length
    var n = grid[0].length
    for(var i = 0; i < m; i++){
        for(var j = 0; j < n; j++){
           if (grid[i][j] == 1){
              dfs(i,j,m,n,++id,grid)
           }
        }
    }
    var cnt = Array(id+1).fill(0)
    var max = 0
    for(var i = 0; i < m; i++){
        for(var j = 0; j < n; j++){
           if (grid[i][j] != 0){
               cnt[grid[i][j]]++
               max = Math.max(max, cnt[grid[i][j]])
           }
        }
    }

    for(var i = 0; i < m; i++){
        for(var j = 0; j < n; j++){
           let used = new Set();
           let ans = 1
           if (grid[i][j] == 0){
               //判断上下左右四个方向
               if (i !== 0){
                  let up = grid[i - 1][j]
                  if (up > 1){
                    ans += cnt[up]
                    used.add(up)
                  }
               }
               
               if (i !== m-1){
                  let down = grid[i + 1][j]
                  if (down > 1 && !used.has(down)){
                    ans += cnt[down]
                     used.add(down)
                  }
               }

               if (j !== 0){
                  let left = grid[i][j - 1]
                  if (left > 1 && !used.has(left)){
                    ans += cnt[left]
                    used.add(left)
                  }
               }

               if (j !== n-1){
                  let right = grid[i][j + 1]
                  if (right > 1 && !used.has(right)){
                    ans += cnt[right]
                    used.add(right)
                  }
               }
               max = Math.max(max, ans) 
           }
        }
    }
    return max
};

function  dfs(i,j,m,n,id,grid){
   console.log(i,j,id)
   if (i < 0 || i == m || j < 0 || j == n || grid[i][j] != 1){
       return
   }
   grid[i][j] = id
   dfs(i-1,j,m,n,id,grid)
   dfs(i,j - 1,m,n,id,grid)
   dfs(i+1,j,m,n,id,grid)
   dfs(i,j+ 1,m,n,id,grid)
}