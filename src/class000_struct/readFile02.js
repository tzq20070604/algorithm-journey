function readFile01(){
    const fs = require('fs');
    const input = ''; // 无需拼接字符串

    fs.readFile('input.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('文件读取失败:', err);
            return;
        }
        const lines = data.trim().split('\n');
        console.log(lines); // 输出处理后的行数组
    });
}

function readFile02(){
    const fs = require('fs');
    try {
    const data = fs.readFileSync('input.txt', 'utf8');
    const lines = data.trim().split('\n');
    console.log(lines); // 输出行数组
    } catch (err) {
    console.error('文件读取失败:', err);
    }
}

function readFile03(){
    const fs = require('fs');
let input = '';

const readStream = fs.createReadStream('input.txt', 'utf8');
    readStream.on('data', (chunk) => {
    input += chunk; // 拼接数据块
    });
    readStream.on('end', () => {
    const lines = input.trim().split('\n');
    console.log(lines); // 输出行数组
    });
    readStream.on('error', (err) => {
    console.error('文件读取错误:', err);
    });
}