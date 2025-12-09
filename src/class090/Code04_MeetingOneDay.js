/**
 * 玩游戏闯关解锁的思想
 * 首先来到某一天，那些游戏可以解锁，解锁后按照结束时间越早的，先做
 * @param {number[][]} events
 * @return {number}
 */
var maxEvents1 = function(events) {
    let games = {}
    let min = Infinity, max = 0
    for(let i = 0;i < events.length;i++){
      min = Math.min(events[i][0],min)
      max = Math.max(events[i][1],max)
      if (games[events[i][0]] == undefined){
         games[events[i][0]] = []
      }
      games[events[i][0]].push(events[i])
    }
    let sum = 0
    let heap = new CustomHeap(CustomHeap.HeapType.SMALL,(a,b)=>{return a[1]-b[1]})
    for (let day = min; day <= max; day++){
       let newGames = games[day]
       for(let i = 0;newGames != undefined && i < newGames.length; i++){
           heap.insert(newGames[i])
       }
       // heap里面放着都是已经解锁的游戏
       while(!heap.isEmpty()){
          let game = heap.pop()
          if (day <= game[1]){
             sum++
             break
          }
       }
    }
    return sum
};

/**
 * 玩游戏闯关解锁的思想
 * 首先来到某一天，那些游戏可以解锁，解锁后按照结束时间越早的，先做
 * @param {number[][]} events
 * @return {number}
 */
var maxEvents = function(events) {
    events.sort((a,b)=>{return a[0]-b[0]})
    let min = Infinity, max = 0
    for(let i = 0;i < events.length;i++){
      min = Math.min(events[i][0],min)
      max = Math.max(events[i][1],max)
    }
    let sum = 0,i = 0,n = events.length
    let heap = new CustomHeap(CustomHeap.HeapType.SMALL,(a,b)=>{return a[1]-b[1]})
    for (let day = min; day <= max; day++){
       while(i < n && events[i][0] == day){
          heap.insert(events[i])
          i++
       }
       // heap里面放着都是已经解锁的游戏
       while(!heap.isEmpty()){
          let game = heap.pop()
          if (day <= game[1]){
             sum++
             break
          }
       }
    }
    return sum
};

class CustomHeap {
    static HeapType = {
        SMALL:'small',
        BIG:'big'
    }
    type = CustomHeap.HeapType.SMALL
    items = []
    size = 0
    sortFunc = function(item1, item2){ return item1 - item2}

    constructor(type, sortFunc){
       if (type == undefined) {
         this.type = CustomHeap.HeapType.SMALL
       }
       if (sortFunc == undefined){
           sortFunc = this.sortFunc
       }
       if (type == CustomHeap.HeapType.BIG){
           this.sortFunc = function(item1, item2){
               return 0 - sortFunc(item1, item2)
           }
       } else {
           this.sortFunc = sortFunc
       }
       this.type == CustomHeap.HeapType.SMALL
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