import re
import json
import subprocess

def regwith(pattern,line):
    result = re.search(pattern, line,re.DOTALL)
    return result

def test():
  with open("./test.strings", 'r', encoding='utf-8') as file:
    for line in file: 
        print(line)
        keyValuePattern = r'^(?P<prefix>\s*"(?P<key>.*?[^\\](\\\\)*|(\\\\)*)"\s*=\s*")(?P<value>.*?[^\\](\\\\)*|(\\\\)*)(?P<suffix>"\s*;\s*)'
        res1 = re.search(keyValuePattern, line, re.DOTALL)
        if res1 is not None:
            str = res1.group(0)
            key = res1.group("key")
            value = res1.group("value")
            # 单数引号
            matched = re.search(r'((^(\\\\)*)|[^\\](\\\\)*)"',key, re.DOTALL)
            matched2= re.search(r'((^(\\\\)*)|[^\\](\\\\)*)"',value, re.DOTALL)
            if matched is None:
                print(f"key={key}正确")
            else:
                print(f"key={key}错误")
                print(matched.group(0))

            if matched2 is None:
                print(f"value={value}正确")
            else:
                print(f"value={value}错误")
                print(matched2.group(0))
            
        else:
            print("res1 is None")
        
        print("------------------1")
        if res2 is not None:
            print(res2.group(0))
            print(res2.group("key"))
            print(res2.group("value"))
        else:
            print("res2 is None")
        
        print("------------------2")
        pattern4 = r'^(?P<prefix>((\s*//[^\n]*?\n)|(\s*/\*.*?\*/\s*))*\s*)(?P<key>"[^"\\]*(?:\\.[^"\\]*)*")\s*=\s*(?P<value>"[^"\\]*(?:\\.[^"\\]*)*")(?P<suffix>\s*;?)'
        res4 = regwith(pattern4, line)
        if res4 is not None:
            print(res4.group(0))
        else:
            print("res4 is None")
            
def test2():
    jjj=""
    print(len(jjj))
    # 正确的前缀
    correctPrefixPattern = r'(^\s*(//|/\*|"))|(^\s+$)'
    toParseStr=";"
    matchCorrectPrefix = regwith(correctPrefixPattern, toParseStr)
    print(matchCorrectPrefix)

def test3():
    filePath = "aaa.json"
    # 捕获命令的输出  
    result =  subprocess.run(['plutil', '-convert', 'json', '-s', '-o', filePath,'test.strings'], capture_output=True, text=True,check=True)  
    
    #打印命令的输出  
    print('Output:', result.stdout)  

    # 检查命令是否成功执行  
    if result.returncode == 0:  
        # print("Command succeeded.") 
        with open(filePath, 'r', encoding='utf-8') as file:  
            # 读取文件内容并转换成JSON对象（在Python中是字典或列表）  
            data = json.load(file)
            if isinstance(data, dict):    
                for key in data:
                   print(key)
            else:  
                print("json 解析失败")
    else:  
        print("Command failed with return code", result.returncode) 

def test4():
    filePath = "aaa.json"
    # 创建一个Popen对象  
    p = subprocess.Popen(['plutil', '-convert', 'json', '-s','-r', '-o', filePath, 'test.strings'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=False)  
    
    # 等待命令执行完成并获取输出  
    stdout, stderr = p.communicate()  
    
    print('Stdout:', stdout)  
    if stderr:  
        print('Stderr:', stderr)  
    
    # 检查退出状态  
    if p.returncode == 0:  
        print("Command succeeded.")
    else:  
        print("Command failed with return code", p.returncode)

        "key1" = "value1";