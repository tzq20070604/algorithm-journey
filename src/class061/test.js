 const Heap = require('./Heap.js')
 function sort(item1, item2){
    return item1[1] -item2[1]
 }
 let heap = new Heap(Heap.HeapType.BIG, sort)
 let arr = [[1,4],[2,5],[3,1],[4,2],[5,3]]
 for (let i = 0; i < arr.length; i++){
    heap.insert(arr[i])
 }
while(!heap.isEmpty()){
   let item = heap.pop()
   console.log(item)
}

const fs = require('fs');
const path = require('path');

const filePath = './P3366_1.in';

if (!fs.existsSync(filePath)) {
  console.error(`错误：文件 ${filePath} 不存在`);
  // 可选：自动创建文件（若业务允许）
  fs.writeFileSync(filePath, '', 'utf8'); // 创建空文件
} else {
    console.log('文件存在')
}