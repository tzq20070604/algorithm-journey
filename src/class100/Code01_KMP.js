// KMP算法模版
// 测试链接 : https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (needle.length == 0){
        return -1
    }
    // 表示下标i前面(不包括下标i)已经匹配的字符串的最长前缀和后缀的长度
    let next = Array(needle.length+1).fill(0)
    computeNextArr(needle,next)
    let res = findIndex(haystack,needle,next)
    return res
};

function computeNextArr(needle,next){
    next[0] = -1, next[1] = 0
    // x 模式串要匹配的位置  y模式串当前最大前缀的下一个字符
    let x = 1, y = 0
    while(x < needle.length){
        // 说明匹配上了
       if (needle[x] == needle[y]){
          x++
          y++
          next[x] = y
       } else if (y >= 0){ // 说明可跳转,y模式串当前最大前缀的下一个字符
          y = next[y]
       } else {
          x++
          y++
       }
    }
}

function findIndex(haystack,needle,next){
    let x = 0, y = 0
    while(x < haystack.length){
        if (haystack[x] == needle[y]){
            x++
            y++
        } else if (y >= 0){
            y == next[y]
        } else {
            x++
            y++
        }
        if (x == needle.length){
            return x - y
        }
    }
    return -1
}