var count = 0;
var MaxLength = 1000000;
var pathArr = null;
var passArr = null;
var endArr = null;

function buildTrieTree() {
    count = 1;
    pathArr = Array.from({ length: MaxLength }, () => {
        return Array(26).fill(0);
    });
    passArr = new Array(MaxLength).fill(0);
    endArr = new Array(MaxLength).fill(0);
    // //console.log(pathArr)
    // //console.log(passArr)
    // //console.log(endArr)
}

/**
 *
 * @param {*} string
 * @returns
 */
function insertWord(string) {
    if (string.length == 0) {
        return;
    }
    var cur = 1;
    passArr[cur]++;
    //console.log("\n", string)
    for (var i = 0; i < string.length; i++) {
        var ch = string[i];
        var index = ch.charCodeAt(0) - "a".charCodeAt(0);

        var curVal = pathArr[cur][index];
        //console.log("cur",cur)
        //console.log("index", index)
        //console.log("count",count)
        //console.log("ch",ch)
        //console.log("curVal",curVal)
        if (!curVal) {
            pathArr[cur][index] = ++count;
        }
        curVal = pathArr[cur][index];
        passArr[curVal]++;
        cur = curVal;
    }
    endArr[cur]++;
}

function deleteWord(string) {
    if (string.length == 0) {
        return;
    }
    var cur = 1;
    passArr[cur]--;
    for (var i = 0; i < string.length; i++) {
        var ch = string[i];
        var index = ch.charCodeAt() - "a".charCodeAt();
        var curVal = pathArr[cur][index];
        if (--passArr[curVal] == 0) {
            passArr[curVal] = 0;
            pathArr[cur][index] = 0;
            return;
        }
        cur = curVal;
    }
    endArr[cur]--;
}
/**
浏览器	window	window[functionName]
Node.js	global	global[functionName]
严格通用	不污染全局	通过显式传入上下文
 */

function findWord(string) {
    if (string.length == 0) {
        return "NO";
    }
    var cur = 1;
    for (var i = 0; i < string.length; i++) {
        var ch = string[i];
        var index = ch.charCodeAt() - "a".charCodeAt();
        var curVal = pathArr[cur][index];
        if (curVal == 0) {
            return "NO";
        }
        cur = curVal;
    }
    return endArr[cur] == 0 ? "NO" : "YES";
}

function preCount(string) {
    if (string.length == 0) {
        return "NO";
    }
    var cur = 1;
    for (var i = 0; i < string.length; i++) {
        var ch = string[i];
        var index = ch.charCodeAt() - "a".charCodeAt();
        var curVal = pathArr[cur][index];
        if (curVal == 0) {
            return 0;
        }
        cur = curVal;
    }
    return passArr[cur];
}


/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 
 * @param b int整型二维数组 
 * @param a int整型二维数组 
 * @return int整型一维数组
 */
function countConsistentKeys( b ,  a ) {
    // 对于每个a插入 
    
}
module.exports = {
    countConsistentKeys : countConsistentKeys
};

