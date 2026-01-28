var minimumObstacles = function(grid) {
    let m = grid.length
    let n = grid[0].length
    let distance = Array(m).fill(0).map(()=>{
        return Array(n).fill(Infinity)
    })
    let directs = [[0,-1],[0,1],[-1,0],[1,0]]
    // 其实双端队列 在js里面可以使用数组就行 长度就使用length
    const queue = new CircularDeque(40001)
    queue.push([0,0])
    distance[0][0] = 0
    while(!queue.isEmpty()){
       let [x, y] = queue.shift()
       if (x == m - 1 && y == n -1){
         return distance[m-1][n-1]
       }
        // 上下左右
        for (let i =0; i< 4; i++){
            let x1 = x + directs[i][0]
            let y1 = y + directs[i][1]
            if (x1 < 0 || y1 < 0 || x1 >= m || y1 >= n){
                continue
            }
             let newCost = distance[x][y] + grid[x1][y1];
  if (newCost >= distance[x1][y1]) continue; // 直接比较新代价
            distance[x1][y1] = newCost;
            grid[x1][y1] == 1 ? queue.push([x1,y1]):queue.unshift([x1,y1])
        }
    }
}

class CircularDeque{
    Type = {
       Left : "Left",
       Right : "Right"
    }
    Derection = {
       Add:"Add",
       Minus:"Minus"
    }
    size = 0
    l = 0
    r = 0
    array = []
    length = 0
    constructor(length){
        this.size = 0
        this.l = this.r = 0
        this.length = length
        this.array = Array(length).fill(0)
    }

    isFull(){
        return this.size == this.length
    }

    isEmpty(){
        return this.size == 0
    }

    push(item){
        if (this.isFull()){
            return false
        } else{
            if (this.isEmpty()){
                this.l = this.r = 0
                this.array[this.r] = item
                this.size = 1
            } else {
               this.oprate(this.Type.Right,this.Derection.Add,item)
               return this.peekLast()
            }
        }
    }

    pop(){
        if (this.isEmpty()){
            return false
        } else{
            let tmp = this.peekLast()
            this.oprate(this.Type.Right,this.Derection.Minus)
            return tmp
        }
    }

    unshift(item){
        if (this.isFull()){
            return false
        } else{
            if (this.isEmpty()){
                this.l = this.r = 0
                this.array[this.r] = item
                this.size = 1
            } else {
                 this.oprate(this.Type.Left,this.Derection.Add,item)
                 return this.peekFirst()
            }
        }
    }

    shift(){
        if (this.isEmpty()){
            return false
        } else{
            let tmp = this.peekFirst()
            this.oprate(this.Type.Left,this.Derection.Minus)
            return tmp
        }
    }

    peekFirst(){
        if (this.isEmpty()){
            return false
        } else {
            return this.array[this.l]
        }
    }

    peekLast(){
        if (this.isEmpty()){
            return false
        } else {
            return this.array[this.r]
        }
    }
    
    oprate(type, derect,item){
        if (derect == this.Derection.Add){
            if (type == this.Type.Left){
               (this.l == 0)? (this.l = this.length - 1): this.l--
               this.array[this.l] = item
            } else {
               (this.r == this.length - 1)? (this.r = 0): this.r++
               this.array[this.r] = item
            }
            this.size++
        } else {
            if (type == this.Type.Left){
                (this.l == this.length - 1)? (this.l = 0): this.l++
            } else {
                (this.r == 0)? (this.r = this.length - 1): this.r--
            }
            this.size--
        }
    }
}
