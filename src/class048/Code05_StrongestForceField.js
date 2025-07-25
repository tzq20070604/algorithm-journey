/**
 * @param {number[][]} forceField
 * @return {number}
 */
// 首先 把首页
var arr = []
var fieldOfGreatestBlessing = function(forceField) {
   arr = Array.from({length:forceField.length * 2 + 2},()=>{
       return Array.from({length:forceField.length * 2 + 2},()=>{
            return 0
       })
   })
   var xArr = []
   var yArr = []
   forceField.map((item)=>{
      if (!xArr.includes(2* item[0] - item[2])){
         xArr.push(2* item[0] - item[2])
      } 
      if (!xArr.includes(2* item[0] + item[2])){
         xArr.push(2* item[0] + item[2])
      }
   })
   forceField.map((item)=>{
      if (!yArr.includes(2* item[1] - item[2])){
         yArr.push(2* item[1] - item[2])
      } 
      if (!yArr.includes(2* item[1] + item[2])){
         yArr.push(2* item[1] + item[2])
      }
   })
   xArr = xArr.sort((a1,a2)=>{return a1-a2})
   yArr = yArr.sort((a1,a2)=>{return a1-a2})
  //console.log("xArr",xArr)
  //console.log("yArr",yArr)
   forceField.map((item)=>{
      //console.log(item)
      var a = 2* item[0] - item[2]
      var b = 2* item[0] + item[2]
      var c = 2* item[1] - item[2]
      var d = 2* item[1] + item[2]
      var a1 = xArr.indexOf(a) + 1
      var b1 = xArr.indexOf(b) + 1
      var c1 = yArr.indexOf(c) + 1
      var d1 = yArr.indexOf(d) + 1
      addDiff(a1,b1,c1,d1)
   })
   return build()
};
// (a1,c1) (b1,d1)
function addDiff(a1,b1,c1,d1){
  //console.log(a1,c1,b1,d1)
    arr[a1][c1] += 1
    arr[b1+1][d1+1] += 1
    arr[a1][d1 + 1] -= 1
    arr[b1 + 1][c1] -= 1
}

function build(){
    var ans = 0
    for (var i = 1; i < arr.length; i++){
        for (var j = 1; j < arr.length;j++){
           arr[i][j] = arr[i][j] + arr[i-1][j] + arr[i][j-1] - arr[i-1][j-1]
           ans = Math.max(ans, arr[i][j])
        }
    }
   //console.log(arr)
   //console.log(ans)
    return ans
}

// fieldOfGreatestBlessing([[0,0,1],[1,0,1]])
// fieldOfGreatestBlessing([[4,4,6],[7,5,3],[1,6,2],[5,6,3]])
fieldOfGreatestBlessing([[932,566,342],[546,489,250],[723,454,748],[830,887,334],[617,534,721],[924,267,892],[151,64,65],[318,825,196],[102,941,940],[748,562,582],[76,938,228],[921,15,245],[871,96,823],[701,737,991],[339,861,146],[484,409,823],[574,728,557],[104,845,459],[363,804,94],[445,685,83],[324,641,328],[626,2,897],[656,627,521],[935,506,956],[210,848,502],[990,889,112]])
