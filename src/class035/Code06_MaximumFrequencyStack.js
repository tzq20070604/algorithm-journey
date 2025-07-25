

var FreqStack = function() {
    this.valueTimesDict = {}
    this.topTimes = 0
    this.topTimeDict = {}
};

/** 
 * @param {number} val
 * @return {void}
 */
FreqStack.prototype.push = function(val) {
   var curValueTime = this.valueTimesDict[val]
   curValueTime = curValueTime ? curValueTime+1 : 1
   this.valueTimesDict[val] = curValueTime
   var arr = this.topTimeDict[curValueTime] ? this.topTimeDict[curValueTime] :[]
   arr.push(val)
   this.topTimeDict[curValueTime] = arr
   this.topTimes = Math.max(this.topTimes,curValueTime)
};

/**
 * @return {number}
 */
FreqStack.prototype.pop = function() {
    var arr = this.topTimeDict[this.topTimes]
    var ans = arr.pop()
    if (arr.length == 0){
        this.topTimeDict[this.topTimes] = undefined
        this.topTimes--
    }
    var curValueTime = this.valueTimesDict[ans]
    curValueTime = curValueTime > 1 ? curValueTime - 1 : 0
    this.valueTimesDict[ans] = curValueTime
    if (curValueTime == 0){
        delete this.valueTimesDict[ans]
    }
    return ans
};

/** 
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(val)
 * var param_2 = obj.pop()
 */