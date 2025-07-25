var str1 = "adddd"
var str2 = str1 + "000"
function aaa(str){
    str = str + "345"
    return str
}

console.log("str1",str1)
console.log("str2",str2)
console.log(aaa(str1))
console.log("str1",str1)
console.log("str2",str2)