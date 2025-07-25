const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.output,
});
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    // Write your code here
    var count = 0;
    var arr = [];
    while ((line = await readline())) {
        if (count == 0) {
            count++
            continue;
        }
        let tokens = line.split(" ");
        arr = tokens.map(Number);
    }
    // console.log(arr)
    atLessEnerge(arr);
})();

function atLessEnerge(arr) {
    var max = 0;
    for (var item of arr) {
        max = Math.max(max, item);
    }
    var res = max;
    // 从0 到 max中寻找符合条件的最小值
    var left = 0,
        right = max;
    while (left <= right) {
        var mid = left + ((right - left) >> 1);
        if (isMidPass(arr, mid, max)) {
            // console.log(left,mid,right)
            res = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    console.log(res);
    return res;
}

function isMidPass(arr, mid, max) {
    var sum = mid;
    // console.log("pass",mid)
    for (var item of arr) {
        if (sum > item) {
            sum += (sum - item);
        } else {
            sum -= (item - sum);
        }
        if (sum >= max) {
            return true;
        }
        if (sum < 0) {
            return false;
        }
    }
    return true;
}

// atLessEnerge([3,4,2,3,4])
