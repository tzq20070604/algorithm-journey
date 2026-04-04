const RedBlackTree = require("./RedBlackTree.js")
const SkipList = require('./SkipList.js')
console.log((3 >> 32))
let s1 = new Set()
let s2 = new Set()

// ==================== 使用示例 ====================
// 1.初始化：按学生分数升序排序
const scoreTree = new RedBlackTree((a, b) => a.score - b.score);

// 2.插入(id唯一，value是对象)
scoreTree.insert("stu01", { name: "小明", score: 82 });
scoreTree.insert("stu02", { name: "小红", score: 95 });
scoreTree.insert("stu03", { name: "小刚", score: 76 });

// 3.获取排序后的完整列表
console.log("排序结果：", scoreTree.getSortedList());

// 4.按id查找
console.log("查找stu02：", scoreTree.findById("stu02"));

// 5.按id删除
scoreTree.deleteById("stu02");
console.log("删除后排序：", scoreTree.getSortedList());

console.log("-----跳表-------")
// 1. 初始化跳表
const skipList = new SkipList((a,b)=>{return a.score - b.score;});

// 插入：唯一id + 对象value
skipList.insert("stu001", { name: "小明", score: 82 });
skipList.insert("stu002", { name: "小红", score: 95 });
skipList.insert("stu003", { name: "小刚", score: 76 });
skipList.insert("stu004", { name: "小丽", score: 88 });

// 自动按分数有序输出
console.log("=== 按分数升序 ===");
console.log(skipList.getSortedList());

// 精准查（靠唯一id）
console.log("\n=== 查stu002 ===");
console.log(skipList.findById("stu002"));

// 精准查（靠唯一id）
console.log("\n=== 查stu004 ===");
console.log(skipList.findById("stu004"));

console.log("\n=== 删除stu002 ===");
skipList.deleteById('stu002')
console.log(skipList.getSortedList());
