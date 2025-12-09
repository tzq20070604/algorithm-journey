/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board1, word1) {
    // 深度优先
    board = board1
    word = word1
    m = board.length
    n = board[0].length
    for (let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
           if (search(i,j,0)){
              return true
           }
        }
    }
    return false
};

var board,word,m,n
function search(i,j,index){
    if (index == word.length){
        return true
    }
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] != word[index]){
        return false
    }
    let tmp = board[i][j]
    board[i][j] = -1
    let res = false
    let derect = [[0,1],[0,-1],[1,0],[-1,0]]
    for(let [delx,dely] of derect) {
       res |= search(i + delx,j+dely,index+1)
    }
    board[i][j] = tmp
    return res
}