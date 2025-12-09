
⏳ ​​1. 使用 readline模块（推荐）​​
readline是 Node.js 内置模块，专为逐行读取流设计（如 process.stdin）。

​​基础用法：rl.question()​​
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('请输入内容：', (answer) => {
  console.log(`用户输入：${answer}`);
  rl.close(); // 必须关闭接口，否则进程不会退出[1,7](@ref)
});
​​特点​​：
阻塞事件循环直到用户输入完成（通过回调函数处理结果）。
适合单次输入场景（如命令行问答工具）。
​​连续监听：line事件​​
rl.on('line', (input) => {
  if (input === 'exit') rl.close();
  else console.log(`收到：${input}`);
});
rl.on('close', () => process.exit(0)); // 关闭时退出进程
​​特点​​：
持续监听多行输入，按回车触发事件。
适合构建交互式命令行（如 REPL 环境）。
⚡ ​​2. 异步封装：async/await+ Promise​​
解决回调嵌套问题，使代码更线性：

function questionAsync(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  const name = await questionAsync('姓名：');
  const age = await questionAsync('年龄：');
  console.log(`${name}, ${age}岁`);
  rl.close();
}
main();
​​特点​​：
通过 Promise封装 rl.question，支持 await顺序等待输入。
避免回调地狱，逻辑更清晰。
🌊 ​​3. 直接操作 process.stdin（原始流处理）​​
适合需要精细控制流的场景：

process.stdin.setEncoding('utf8');
let input = '';

process.stdin.on('data', (chunk) => {
  input += chunk;
  if (chunk.includes('\n')) { // 检测换行符表示输入结束
    console.log(`完整输入：${input.trim()}`);
    process.stdin.pause(); // 暂停流
  }
});

process.stdin.resume(); // 启动流读取[4,5](@ref)
​​特点​​：
手动拼接数据块，需自行处理输入结束条件（如换行符）。
适用于大文件管道输入（如 cat file.txt | node script.js）。
⚠️ ​​注意事项​​
​​流阻塞问题​​：
readline或 process.stdin会阻塞进程直到输入完成，长时间无输入会导致程序挂起。
解决方案：设置超时机制或提供退出命令（如输入 exit）。
​​编码设置​​：
默认输入为 Buffer对象，需调用 setEncoding('utf8')避免乱码。
​​资源释放​​：
使用 rl.close()或 process.stdin.destroy()主动释放流资源，防止内存泄漏。
💎 ​​总结：方法选择建议​​
​​场景​​

​​推荐方法​​

​​示例​​

单次问答（如配置初始化）

rl.question()+ 回调

用户名/密码输入

连续交互（如命令行工具）

line事件监听

自定义命令解析

避免回调嵌套

async/await+ Promise

多步骤表单输入

管道传输/大文件处理

process.stdin流事件

日志过滤脚本

