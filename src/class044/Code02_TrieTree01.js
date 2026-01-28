class TrieTree {
    count = 0;
    maxLength = 10001;
    width = 26
    pathArr = null;
    passArr = null;
    endArr = null;

    buildTrieTree(maxLength, width) {
        this.maxLength = maxLength ?? 10001
        this.width = width ?? 26
        this.count = 1;
        this.pathArr = Array.from({ length: this.maxLength }, () => {
            return Array(this.width).fill(0);
        });
        this.passArr = new Array(this.maxLength).fill(0);
        this.endArr = new Array(this.maxLength).fill(0);
    }

    /**
     *
     * @param {*} string
     * @returns
     */
    insertWord(string) {
        if (string.length == 0) {
            return false;
        }
        var cur = 1;
        this.passArr[cur]++;
        for (var i = 0; i < string.length; i++) {
            var ch = string[i];
            var road = this.getPath(ch)
            var curVal = this.pathArr[cur][road];
            if (!curVal) {
                this.pathArr[cur][road] = ++this.count;
            }
            curVal = this.pathArr[cur][road];
            this.passArr[curVal]++;
            cur = curVal;
        }
        this.endArr[cur]++;
        return true
    }

    deleteWord(string) {
        if(!this.findWord(string)){
           return false
        }
        if (string.length == 0) {
            return false;
        }
        var cur = 1;
        this.passArr[cur]--;
        for (var i = 0; i < string.length; i++) {
            var ch = string[i];
            var road = this.getPath(ch)
            var curVal = this.pathArr[cur][road];
            if (--this.passArr[curVal] == 0) {
                this.pathArr[cur][road] = 0;
                return false;
            }
            cur = curVal;
        }
        this.endArr[cur]--;
}
/**
浏览器	window	window[functionName]
Node.js	global	global[functionName]
严格通用	不污染全局	通过显式传入上下文
 */

    findWord(string) {
        if (string.length == 0) {
            return false;
        }
        var cur = 1;
        for (var i = 0; i < string.length; i++) {
            var ch = string[i];
            var road = this.getPath(ch)
            var curVal = this.pathArr[cur][road];
            if (curVal == 0) {
                return false;
            }
            cur = curVal;
        }
        return this.endArr[cur] == 0 ? false: true;
    }

    precount(string) {
        if (string.length == 0) {
            return 0;
        }
        var cur = 1;
        for (var i = 0; i < string.length; i++) {
            var ch = string[i];
            var index = this.getPath(ch)
            var curVal = this.pathArr[cur][index];
            if (curVal == 0) {
                return 0;
            }
            cur = curVal;
        }
        return this.passArr[cur];
    }

    getPath(ch){
        return ch.charCodeAt() - "a".charCodeAt();
    }
}
