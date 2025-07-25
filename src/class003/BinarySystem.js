// 最大值2^32 - 1 最小值0 
// var aaa = Math.pow(2,32) 
var aaa = -7 
console.log(aaa)
function printBinary(num){
  var str = ''
  if (Number.isInteger(num)){
     var i = 31
     while(i >= 0){
        // 这里注意优先级顺序
        if ((num & (1 << i)) != 0){
            str += "1"
        } else {
            str += "0"
        }
        i--
     }
  } else{
      console.log("非整数")
  }
  console.log(str)
  console.log(str.length)
}
printBinary(aaa)

//console.log("整数: %d, 浮点数: %f, 字符串: %s, 对象: %o", 10, 3.14159265, "Hello", {a:1, b:2});