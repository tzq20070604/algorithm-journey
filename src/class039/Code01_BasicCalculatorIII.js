var str = ""
var where = 0
function calculator(string){
    if(string.length == 0){
        return 0
    } else {
        if (string[0] == "-"){
            string = "0"+string
        }
        str = string
        where = 0
        var ans = calcul(0)
        return ans
    }
}

function calcul(cur){
    var numStack = []
    var opStack = []
    var prefix = null
    while(cur < str.length && str[cur] != ")"){
        if (str[cur] == "("){
            var res = calcul(cur + 1)
            addItemToStack(numStack, opStack, res, null)
            cur = where
        } else { // 归档数字或者入栈
            if (str[cur] >= '0' && str[cur] <= '9'){
                var num = str[cur].charCodeAt(0) - '0'.charCodeAt(0)
                if (prefix === null){
                   prefix = num
                } else {
                   prefix = prefix * 10 + num
                }
            } else { // + - * /
                addItemToStack(numStack, opStack, prefix, str[cur])
                prefix = null
            }
            cur++
        }
    }
    addItemToStack(numStack, opStack, prefix, null)
    where = cur + 1
    return calculateStack(numStack, opStack)
}

function calculateStack(numStack, opStack){
    // 结束一个
    var sum = 0
    while(opStack.length != 0){
        var num = numStack.pop()
        var op = opStack.pop()
        if (op == "+"){
            sum += num
        } else {
            sum -= num
        }
    }
    if (numStack.length == 1){
        sum += numStack.pop()
    }
    return sum
}

function addItemToStack(numStack, opStack, prefix, op){
    var lastOp = opStack[opStack.length - 1]
    if (lastOp == "*" || lastOp == "/"){
        opStack.pop()
        var lastNum = numStack.pop()
        var num = (lastOp == "*" ? (lastNum * prefix) : (lastNum / prefix))
        numStack.push(num)
        if (op != null){
           opStack.push(op)
        }
    } else { 
        if (prefix != null){
           numStack.push(prefix)
        }
        if (op != null){
           opStack.push(op)
        }
    }
}

// 20
var str1 = "2+12*2-6"
var ans1 = calculator(str1)
console.log("ans1 = ",ans1)

//37
var str2 = "2+8*2-6+(10/2*5)"
var ans2 = calculator(str2)
console.log("ans2 =", ans2)

//-10
var str3 = "(4-3*(5-2))*2"
var ans3 = calculator(str3)
console.log("ans3 = ", ans3)

//-64
var str4 = "((8-6*(2+(6+(9/3+1)))))"
var ans4 = calculator(str4)
console.log("ans4 = ", ans4)

// -8
var str5 = "((0-8))"
var ans5 = calculator(str5)
console.log("ans5 = ", ans5)