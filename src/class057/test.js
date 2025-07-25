console.log("0 != undefined", 0 != undefined)
console.log("0 !== undefined", 0 !== undefined)

console.log("0 != null", 0 != null)
console.log("0 !== null", 0 !== null)

console.log("NaN != NaN", NaN != NaN)
console.log("NaN !== NaN", NaN !== NaN)

console.log("null != undefined", null != undefined)
console.log("null !== undefined", null !== undefined)

console.log("false != 0", false != 0)
console.log("false !== 0", false !== 0)
var meetting = [[1,2],[3,4],[5,6],[3,3]]
meetting.sort((item1,item2)=>{return item1[1] - item2[1]})


console.log(meetting)