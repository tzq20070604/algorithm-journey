import re
from configuration import Config
import tools

# 正确的前缀
correctPrefixPattern = r'(^\s*(//|/\*|"))|(^\s+$)'

#key=value 包含前后空格
keyValuePattern = r'^(?P<prefix>\s*"(?P<key>.*?[^\\](\\\\)*|(\\\\)*)"\s*=\s*")(?P<value>.*?[^\\](\\\\)*|(\\\\)*)(?P<suffix>"\s*;\s*)'

#单行注释
singleCommentPatter=r'^\s*//[^\n]*?\n'

#多行注释
mutiCommentPatter=r'^\s*/\*.*?\*/\s*'

#未转义的引号
quotationPatter = r'((^(\\\\)*)|[^\\](\\\\)*)"'

def search(pattern,string):
    result = re.search(pattern, string, re.DOTALL)
    return result

# 将一个.strings文件转换成字典 
def parseStringsFile2ResultDictionary(filePath):  
    # 初始化一个空字典来存储键值对  
    stringsDict = {}  
    successNum = 0
    keyValueIndex = 0 
    lineNum = 0 
    try:  
        with open(filePath, 'r', encoding='utf-8') as file:
            # 未匹配的文件
            toParseStr = ""
            for lineStr in file:
                lineNum = lineNum + 1 
                toParseStr = toParseStr + lineStr
                while True:
                    flag = False
                    if len(toParseStr) == 0:
                        break;
                    matchCorrectPrefix = search(correctPrefixPattern, toParseStr)
                    if matchCorrectPrefix is None:
                       print(tools.ANSI.red("★★★★★★★★★★★★★ failure ⛄️⛄️⛄️⛄️⛄️15 ★★★★★★★★★★★★★"))
                       info = ("from line " + str(lineNum) + " has problems in file {}:\n").format(filePath) + lineStr
                       print(tools.ANSI.red(info))
                       return None 
                    keyValueStr = search(keyValuePattern, toParseStr)
                    if keyValueStr is not None:
                       flag = True
                       key,value,prefix,suffix = keyValueStr.group("key"),keyValueStr.group('value'),keyValueStr.group("prefix"),keyValueStr.group("suffix")
                       stringsDict[key] = {"key":key, "value":value, "index":successNum, "prefix":prefix, "suffix":suffix}
                       toParseStr = toParseStr[keyValueStr.end():]
                       # 如果key或者value包含非转义的"则报错
                       matchedKey = re.search(quotationPatter, key, re.DOTALL)
                       matchedValue = re.search(quotationPatter, value, re.DOTALL)
                       if matchedKey is not None or matchedValue is not None:
                           print(tools.ANSI.red("★★★★★★★★★★★★★ failure ⛄️⛄️⛄️⛄️⛄️16 ★★★★★★★★★★★★★"))
                           info = ("from line " + str(lineNum) + " has an unexpected character \"  in file {}:\n").format(filePath) + lineStr
                           print(tools.ANSI.red(info))
                           return None 
                       else:
                           successNum += 1
                           keyValueIndex += 1

                    singleComment = search(singleCommentPatter, toParseStr)
                    if singleComment is not None:
                       flag = True
                       key = Config.stringsCommentPre + str(successNum)
                       value = singleComment.group(0)
                       stringsDict[key] = {"key":key, "value":value, "index":successNum, "prefix":"", "suffix":""}
                       toParseStr = toParseStr[singleComment.end():]
                       successNum += 1
                    

                    mitiComment = search(mutiCommentPatter, toParseStr)
                    if mitiComment is not None:
                       flag = True
                       key = Config.stringsCommentPre + str(successNum)
                       value = mitiComment.group(0)
                       stringsDict[key] = {"key":key, "value":value, "index":successNum, "prefix":"", "suffix":""}
                       toParseStr = toParseStr[mitiComment.end():]
                       successNum += 1
                    if flag == False or len(toParseStr.strip()) == 0:
                        break;
            if len(toParseStr.strip()) == 0:
                 print(tools.ANSI.green("★★★★★★★★★★★★★ 读取{} {}条 🍺🍺🍺🍺🍺🍺 ★★★★★★★★★★★★★".format(filePath, str(keyValueIndex))))
            else:
                 print(tools.ANSI.red("★★★★★★★★★★★★★ failure ⛄️⛄️⛄️⛄️⛄️17 ★★★★★★★★★★★★★"))
                 info = ("from line " + str(lineNum) + " has problems in file {}:\n").format(filePath) + lineStr
                 print(tools.ANSI.red(info))
                 return None 
    except Exception as e: 
        print(tools.ANSI.red("★★★★★★★★★★★★★ failure ⛄️⛄️⛄️⛄️⛄️18 ★★★★★★★★★★★★★1"))
        print(tools.ANSI.red("{}中发生错误{}".format(__file__,e)))   
        return None
    return {"dict":stringsDict, "index":successNum}  

# 将字符串数组读到一个文件中
def writeStringArrayToPath(filePath, sortedValues):   
    with open(filePath, "w") as file: 
        len = 0
        for item in sortedValues: 
            key = item["key"]
            if not key.startswith(Config.stringsCommentPre):  
                len = len + 1  
            file.write(item["prefix"] + item["value"] + item["suffix"]) 
    print(tools.ANSI.green("★★★★★★★★★★★★★ 写入{} {}条 🍺🍺🍺🍺🍺🍺 ★★★★★★★★★★★★★".format(filePath,len)))

# 将resultDictionary以覆盖的形式写入到一个filePath中
def writeResultDictionary2StringsFile(filePath, resultDictionary):
    dictValues = resultDictionary.values() 
    sortedValues = sorted(dictValues,key=lambda item:item["index"], reverse=False)
    writeStringArrayToPath(filePath,sortedValues)


# 使用Excel表格更新对应的Strings文件
def updateStringsFile(filePath, excelLanguageArr):
    # 处理了文件夹和文件不存在的情况
    tools.creatFileIfNotExist(filePath)
    print(tools.ANSI.green(filePath))
    result = parseStringsFile2ResultDictionary(filePath)
    if result is None: 
        return None;
    resultDict, index = result["dict"], result["index"]
    for item in excelLanguageArr:
       excelKey = item["key"]
       excelValue = item["value"]
       if excelKey in resultDict:
           stringsItem = resultDict[excelKey]
           stringsItem["value"] = excelValue
       else:
           index = index + 1
           resultDict[excelKey] = {"key":excelKey, "value":excelValue, "index":index, "prefix":"\"{}\" = \"".format(excelKey), "suffix":"\";\n"}
    writeResultDictionary2StringsFile(filePath, resultDict)

def removeRecordsWithPath(filePath, keyArr):
    result = parseStringsFile2ResultDictionary(filePath)
    if result is None: 
        return None;
    resultDict = result["dict"]
    for key in keyArr:
          if key in resultDict:
              resultDict.pop(key)
    writeResultDictionary2StringsFile(filePath, resultDict)

def removeRecords():
    stringsFilePathList = Config.getStringsFilePathArr(Config.stringsFolderPath)
    for item in stringsFilePathList:
        removeRecordsWithPath(item["stringFilePath"],Config.removeKeys)

    