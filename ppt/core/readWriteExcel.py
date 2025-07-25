import pandas as pd  
import re 
import tools
from configuration import Config
import readwriteStrings
import readwriteXML

# 将Excel表格词条导入到strings文件中
def doImport():
    if not tools.isFileExist(Config.excelPath):
        print(tools.ANSI.red("★★★★★★★★★★★★★ failure ⛄️⛄️⛄️⛄️⛄️9 ★★★★★★★★★★★★★"))
        print(tools.ANSI.red("{}导入excel路径{}有误".format(__file__, Config.excelPath))) 
        return None
             
    try:
        df = pd.read_excel(Config.excelPath, Config.excelSheetNum, header=None)
        languageRowArr =  df.iloc[Config.excelLanguageRow, :]
        languageArr = []
        for index, title in enumerate(languageRowArr):
            notCorrect = isNaOrAllSpace(pd, title)
            if notCorrect:
                continue
            text = str(title).strip()
            stringsFilePath = Config.getStringsFilePathByExcelLanguage(text, Config.stringsFolderPath)
            if stringsFilePath and text:
                languageArr.append({"index":index, "stringsFilePath":stringsFilePath})
            else:
                print(tools.ANSI.yellow("Excel表中{}行标题{}被忽略".format(index + 1, title)))
        keyColArr = df.iloc[:, Config.excelKeyCol]
        for languageItem in languageArr:
            languageColIndex = languageItem["index"]
            excelLanguageValues = df.iloc[:, languageColIndex]
            stringFilePath = languageItem["stringsFilePath"]
            excelLanguageArr = []
            for row in range(Config.excelKeyRowStart, min(Config.excelKeyRowEnd, len(keyColArr))):
                excelKey = keyColArr[row]
                excelValue = excelLanguageValues[row]
                keyNotCorrect = isNaOrAllSpace(pd, excelKey)
                valueyNotCorrect = isNaOrAllSpace(pd, excelValue)
                if keyNotCorrect or valueyNotCorrect:
                   continue
                filterRusult = re.search(r'{}'.format(Config.excelKeyPattern), excelKey, re.DOTALL)
                if filterRusult:
                    if Config.platform.upper() == "IOS":
                        stripExcelKey = escapeUnescapedQuotes(filterRusult.group("key").strip())
                        stripExcelValue =  escapeUnescapedQuotes(str(excelValue).strip())
                        excelLanguageArr.append({"key":stripExcelKey, "value":stripExcelValue}) 
                    elif Config.platform.upper() == "ANDROID": 
                        stripExcelKey = escapeUnescapedSingleQuotes(filterRusult.group("key").strip())
                        stripExcelValue = escapeUnescapedSingleQuotes(str(excelValue).strip())
                        excelLanguageArr.append({"key":stripExcelKey, "value":stripExcelValue}) 
                    else:
                        print(tools.ANSI.red("★★★★★★★★★★★★★ failure ⛄️⛄️⛄️⛄️⛄️20 ★★★★★★★★★★★★★"))
                        print(tools.ANSI.red("平台参数指定有误，请选择'iOS'或'Android'"))
                else:
                    pass
            if Config.platform.upper() == "IOS":
                readwriteStrings.updateStringsFile(stringFilePath, excelLanguageArr)
            elif Config.platform.upper() == "ANDROID": 
                readwriteXML.updateStringsFile(stringFilePath,excelLanguageArr)
            else:
                print(tools.ANSI.red("★★★★★★★★★★★★★ failure ⛄️⛄️⛄️⛄️⛄️10 ★★★★★★★★★★★★★"))
                print(tools.ANSI.red("平台参数指定有误，请选择'iOS'或'Android'"))
    except Exception as e: 
        print(tools.ANSI.red("★★★★★★★★★★★★★ failure ⛄️⛄️⛄️⛄️⛄️11 ★★★★★★★★★★★★★"))
        print(tools.ANSI.red("{}中发生错误{}".format(__file__,e)))  

def dealwithQuotes(matched):
    value = matched.group('value')
    if (value is None):
       return '"'
    else:
        if len(value) % 2 == 0:
           return "\\" + value + '"'
        else:
           return value + '"'

def dealwithSingleQuotes(matched):
    value = matched.group('value')
    if (value is None):
       return "'"
    else:
        if len(value) % 2 == 0:
           return "\\" + value + "'"
        else:
           return value + "'"

def escapeUnescapedQuotes(s):  
    return re.sub(r'(?P<value>(\\)*)"',dealwithQuotes, s) 

def escapeUnescapedSingleQuotes(s):
    return re.sub(r"(?P<value>(\\)*)'",dealwithSingleQuotes, s) 

# 将strings内容写入到excel中
def writeContent2Execl():
    try:
        # 准备数据
        stringsFilePathList = Config.getStringsFilePathArr(Config.stringsFolderPath)
        keyArr = []
        langauageColArr = []
        resultDict = {}
        for item in stringsFilePathList:
            languageTitle = item["languageTitle"]
            stringFilePath = item["stringFilePath"]
            if Config.platform.upper() == "IOS":
                result = readwriteStrings.parseStringsFile2ResultDictionary(stringFilePath)
                if result is None:
                   return None
                resultDict = result["dict"]
            elif Config.platform.upper() == "ANDROID": 
                resultDict = readwriteXML.parseXMLFile2ResultDictionary(stringFilePath)
            else:
                print(tools.ANSI.red("★★★★★★★★★★★★★ failure ⛄️⛄️⛄️⛄️⛄️12 ★★★★★★★★★★★★★"))
                print(tools.ANSI.red("平台参数指定有误，请选择'iOS'或'Android'"))
                return None
            
            langauageColArr.append({"languageTitle": languageTitle,"resultDict": resultDict})
            dictValues = resultDict.values() 
            sortedValues = sorted(dictValues,key=lambda item:item["index"], reverse=False)
            for value in sortedValues:
                key = value["key"]
                if len(key) > 0 and not key.startswith(Config.stringsCommentPre):
                    if key not in keyArr: 
                        keyArr.append(key)
        data = {}
        data['Key'] = keyArr
        for item in langauageColArr:
            langauageCol = []
            resultDict = item["resultDict"]
            languageTitle = item["languageTitle"]
            for key in keyArr:
                if key in resultDict:
                    langauageCol.append(resultDict[key]['value'])
                else:
                    langauageCol.append(pd.NA)
            data[languageTitle] = langauageCol
        data['Key'] = [Config.exportExcelKeyFormat.format(item) for item in data['Key']]
        df = pd.DataFrame(data)  
        # 将DataFrame写入Excel文件  
        if tools.isValidPathFormat(Config.exportExcelPath):
           tools.creatFileIfNotExist(Config.exportExcelPath)
           df.to_excel(Config.exportExcelPath, sheet_name='localization', index=False)  # sheet_name指定工作表名称，index=False表示不将行索引写入文件
        else:
            print(tools.ANSI.red("★★★★★★★★★★★★★ failure ⛄️⛄️⛄️⛄️⛄️13 ★★★★★★★★★★★★★"))
            print(tools.ANSI.red("{}导出的excel路径{}有误".format(__file__,Config.exportExcelPath)))
    except Exception as e: 
        print(tools.ANSI.red("★★★★★★★★★★★★★ failure ⛄️⛄️⛄️⛄️⛄️14 ★★★★★★★★★★★★★"))
        print(tools.ANSI.red("{}中发生错误{}".format(__file__,e))) 

def isNaOrAllSpace(pd,item):
    if pd.isna(item):
       return True
    return len(str(item).strip()) == 0

