/**
 * @param {number[][]} roads
 * @param {number} seats
 * @return {number}
 */
var minimumFuelCost = function(roads, seats) {
    // 针对每个节点需要统计 当前节点的人数和已经消耗的油
    //首先建图
    seatNum = seats
    roadArr = roads
    graph = Array(roadArr.length + 1).fill(0).map(()=>{
        return []
    })
    for (let i = 0; i < roads.length; i++){
        let [from,to] = roads[i]
        graph[from].push(to)
        graph[to].push(from)
    }
    let res = f(0,-1)
    return res.cost
};

let graph,seatNum,roadArr
function f(index,parent){
   let res = {
      cost:0,
      persons:1
   }
   let nodes = graph[index]
   for(let node of nodes){
      if (node !== parent){
         let obj = f(node,index)
         res.cost += obj.cost + Math.ceil(obj.persons/seatNum)
         res.persons += obj.persons
      }
   }
   return res
}