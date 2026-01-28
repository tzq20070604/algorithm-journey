// 测试链接 : https://leetcode.cn/problems/word-search-ii/ 经典
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
    let tree = new Tree(10000,26)
    for(let str of words){
        tree.insert(str)
    }
    // console.log(tree.tree)
    // console.log(tree.pass)
    // console.log(tree.end)
    let paths = []
    for(let r = 0; r < board.length; r++){
        for(let c = 0; c < board[0].length;c++){
            dfs(r,c,1,paths,tree, board)
        }
    }
    return paths
};

function dfs(r, c, cur, paths, tree, board){
   if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || board[r][c] == 0){
       return 0
   }
   let ch = board[r][c]
   let road = tree.path(ch)
   let next = tree.tree[cur][road]
   if (tree.pass[next] == 0){
     return 0
   }
   let count = 0
   if (tree.end[next] != null){
    // console.log(next)
    // console.log(tree.end[next])
     paths.push(tree.end[next])
     tree.end[next] = null
     count = 1
   }
   
   board[r][c] = 0
   count += dfs(r+1, c, next, paths, tree, board)
   count += dfs(r-1, c, next, paths, tree, board)
   count += dfs(r, c+1, next, paths, tree, board)
   count += dfs(r, c-1, next, paths, tree, board)
   board[r][c] = ch
   tree.pass[next] = tree.pass[next] - count
   return count
}

class Tree {
    cnt = 1
    tree = [[]]
    pass = []
    end = []
    constructor(maxCnt,width){
       this.cnt = 1
       this.tree = new Array(maxCnt).fill(0).map(()=>{
            return Array(width).fill(0)
       })
       this.pass = new Array(maxCnt).fill(0)
       this.end = new Array(maxCnt).fill(null)
    }

    insert(word){
        if (word.length == 0){
            return false
        }
        let cur = 1
        this.pass[cur]++
        for(let i = 0; i < word.length; i++){
            let index = this.path(word[i])
            if(this.tree[cur][index] == 0){
                this.tree[cur][index] = ++this.cnt
            }
            this.pass[this.tree[cur][index]]++
            cur = this.tree[cur][index]
        }
        this.end[cur] = word
    }
    
    path(ch) {
        return ch.charCodeAt(0) - "a".charCodeAt(0)
    }
}