let input = ''
process.stdin.on('data',(data)=>{
    input += data
})
process.stdin.on('end',()=>{
   let lines = input.trim().split('\n')
    // 计算结果
   console.log(lines)
})

/**
 * 
行脚本后手动输入数据，按 Ctrl+D结束输入
以下是针对你提供的代码示例，详细解析 process.stdin输入流的工作原理及具体使用方法，结合多个搜索结果中的技术要点：

⚙️ ​​一、process.stdin输入流的基本原理​​
​​流模式与事件驱动​​
process.stdin是 Node.js 提供的​​可读流（Readable Stream）​​，默认处于​​暂停模式​​，需通过事件监听或显式调用 resume()启动数据流动。
在流动模式下，数据通过 data事件分块（chunk）传递，结束时触发 end事件。
​​编码设置​​
默认返回 Buffer对象，可通过 setEncoding('utf8')转换为字符串，避免手动处理编码。
🔄 ​​二、代码工作流程解析​​
你的代码通过事件监听实现输入流处理：

let input = '';
process.stdin.on('data', (data) => { 
    input += data; // 拼接数据块
});
process.stdin.on('end', () => {
    const lines = input.trim().split('\n'); // 按行分割
    console.log(lines); // 输出结果
});
流程说明：
​​data事件​​：
每次输入流接收到新数据时触发，数据可能是单行或多行文本的分块。
例如：输入 "Hello\nWorld"可能分两次触发 data事件（"Hello\n"和 "World"）。
​​end事件​​：
当输入流关闭（如用户按下 Ctrl+D或管道传输结束）时触发。
此时 input包含完整输入，通过 trim().split('\n')转换为行数组。
🖥️ ​​三、使用场景与操作示例​​
1. ​​命令行交互式输入​​
运行脚本后手动输入数据，按 Ctrl+D结束输入：

node your_script.js
Line 1
Line 2
[Ctrl+D]
​​输出​​： ['Line 1', 'Line 2']

2. ​​管道传输输入（推荐）​​
通过管道将文件内容传递给脚本：

cat input.txt | node your_script.js
文件内容会通过 data事件分块传递，最终在 end事件中处理。
3. ​​重定向文件输入​​
直接重定向文件到标准输入：

node your_script.js < input.txt
效果与管道相同，但由操作系统直接处理重定向
 */