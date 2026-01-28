const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

// 小大小的位置 所有栈里面是小到大，遇到比栈顶小的，栈顶弹出结算
void async function () {
    // Write your code here
    var count = 0
    var n = 0
    while(line = await readline()){
        let tokens = line.split(' ');
        if (count == 0){
            count = parseInt(tokens[0])
            count++
            continue
        } 
        var nums = tokens.map(Number)
        getLowHighLowArr1(nums)
    }
}()