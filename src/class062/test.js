let str = 'adcva'
let str1 = str.replaceAll('a',"b")
console.log(str,str1)

function leftStr(target, subStr){
    let next = ''
    let i =0, j= 0
    for(;j < subStr.length && i < target.length;){
        if (subStr[j].charCodeAt(0) < target[i].charCodeAt(0)){
            j++
        } else if (subStr[j].charCodeAt(0) == target[i].charCodeAt(0)){
            j++
            i++
        } else {
            next += target[i]
            i++
        }
    }
    return next + target.slice(i, target.length)
}

let res = leftStr('aabbcccf','abccdf')
console.log(res)