/**
 * 
 * @param {number} n 
 * @param {number[][]} games 
 */
const enough = function(n, games){
   // 堆里放再来一个人的话，这个游戏的能够赚的
   let heap = new CustonHeap(CustonHeap.HeapType.SMALL,(a,b)=>{
      return b[3] - a[3]
   })
   //当前一个人的票价 i为当前参加的人数 Bi - Ki * i 
   // [b,k,j,v] j-1人在这个项目，再来一个人凑成j人，v就是凑成j个人时，这次多赚的收入
   for(let [b,k] of games){
       heap.insert([b,k,1,Math.max(0, b - k)])
   }
   let ans = 0
   for(let i = 1; i <= n; i++){
      let [b,k,j,v] = heap.pop()
      if (v <= 0){
        return ans
      }
      ans += v
      let cost1 = (b - k * j) * j
      let cost2 = (b - k * (j + 1)) * (j + 1)
      let del = cost2 - cost1
      heap.insert([b,k,j+1,del])
   }
   return ans
}

class CustonHeap {
    static HeapType = {
        SMALL:'small',
        BIG:'big'
    }
    type = CustonHeap.HeapType.SMALL
    items = []
    size = 0
    sortFunc = function(item1, item2){ return item1 - item2}

    constructor(type, sortFunc){
       if (type == undefined) {
         this.type = CustonHeap.HeapType.SMALL
       }
       if (sortFunc == undefined){
           sortFunc = this.sortFunc
       }
       if (type == CustonHeap.HeapType.BIG){
           this.sortFunc = function(item1, item2){
               return 0 - sortFunc(item1, item2)
           }
       } else {
           this.sortFunc = sortFunc
       }
       this.type == CustonHeap.HeapType.SMALL
    }

    insert(item){
        this.items.push(item)
        this.size++
        let i = this.size - 1
        while(i > 0){
            var fi = ((i - 1) >> 1)
            // 小根堆
            let res = (this.sortFunc(this.items[fi],this.items[i]) > 0)
            if (res){
               this.swap(i, fi)
               i = fi
            } else {
               break
            }
        }
    }

    peek(){
        if (this.isEmpty()){
            return null
        } else {
            return this.items[0]
        }
    }
    pop(){
       let tmp = null
       if (this.isEmpty()){
            return tmp
       } else {
            this.swap(0, this.size - 1)
            tmp = this.items.pop()
            this.size--
            this.heapify(0)
       }
       return tmp 
    }
    
    isEmpty(){
        return this.size == 0
    }

    swap(i, j) {
         let tmp = this.items[i]
         this.items[i] = this.items[j]
         this.items[j] = tmp
    }

    heapify(i) {
        while(i < this.size){
           let best = i
           let li = (i << 1) + 1
           let ri = (i << 1) + 2
           // 首先要lIndex和lRight 存在
           if (li < this.size && this.sortFunc(this.items[i],this.items[li]) > 0){
                best = li
           }
           if (ri < this.size && this.sortFunc(this.items[best],this.items[ri]) > 0){
                best = ri
           }
           if (best == i){
              break
           } else {
              this.swap(best, i)
              i = best
           }
        }
    }
}

// 验证方法，递归调用，值得一看
const enough1 = function(n, games){
    let m = games.length
    let cnts = Array(m).fill(0)
    return f(1,m,n,games,cnts)
}

/**
 * @param {number} index 当前是第一个人，从1到n
 * @param {number} m 表示项目的个数，固定值
 * @param {number} n 总人数
 * @param {number[][]} games 所有的游戏价格和打折
 * @param {number[]} cnts 当前游戏玩的人数
 * @returns {number} 任意选择项目，n个人最多付的钱
 */
function f(index,m,n,games,cnts){
    if (index == n+1){ //没有人了
        return 0
    } else {
        // 这个人不选任何项目
        let ans = f(index+1,m,n,games,cnts)
        // 这个人随意选择一个项目
        for(let i = 0; i < games.length; i++){
            let [b, k] = games[i]
            let cost1 = (b - k * cnts[i]) * cnts[i]
            let cost2 = (b - k * (cnts[i] + 1)) * (cnts[i] + 1)
            cnts[i]++
            let cost = f(index+1,m,n,games,cnts) + Math.max(0,cost2 - cost1)
            ans = Math.max(cost, ans)
            cnts[i]--
        }
        return ans
    }
}

function generate(len,max){
    return Array.from({length:len},()=>{
        //范围​​：生成 ​​[0, 1)​​ 之间的伪随机浮点数，即包含 0 但不包含 1。
        return Math.floor((Math.random() * (max * 2 + 1))) - max
    })
}

function valudate(){
    // 构造输出数组 
    let times = 28
    // 人数
    let number = 8
    // 游戏组数
    let m = 10
    // 游戏的最大价值
    let v = 100
    console.log('开始')
    for(let i = 0; i < times; i++){
        //人数 [1,100]
        let n = Math.floor((Math.random() * number)) + 1
        let games = generate(m,v)
        let res1 = enough(n,games)
        let res2 = enough1(n,games)
        if (res1 != res2){
            console.log('有误:')
            console.log(res1)
            console.log(res2)
            console.log("\n")
        } 
    }
    console.log('结束')
}

function generate(m,v){
   let games = []
   for(let i = 0; i < m; i++){
      let b = Math.floor(v * Math.random()) + 1
      let k = Math.floor(v * Math.random())
      games.push([b,k])
   }
   return games
}

valudate()
