import os
import json
import tools

# 获取当前文件的完整路径  
currentFilePath = __file__  
# 如果你需要获取目录路径（即去掉文件名）  
dirPath = os.path.dirname(currentFilePath)

class Config: 
     #平台 iOS、Android 大小写都可以,可以通过配置json文件修改
     platform = "iOS"
     # 需要翻译的excel路径
     excelPath = ""
     # 需翻译导入Excel那张表的索引，0表示第一张表
     excelSheetNum = 0
     # Excel语言种类标题行，0表示第1行
     excelLanguageRow = 0  
     # key 在Excel中第几列，0表示第1列
     excelKeyCol = 0
     # key从Excel中第几行开始，0表示第一行 
     excelKeyRowStart = 1
     # key在Excel中第几行结束 ，不包括这一行
     excelKeyRowEnd = 1000000
     # 使用命名分组对key进行正则提取 
     excelKeyPattern = r'^\s*(?P<key>.*?)\s*$',
     # Excel表中语言的标题和stringsFileName的映射关系
     excelLanguage2StringsFileName: [] # type: ignore

     # strings文件所在的文件夹
     stringsFolderPath = ""
     # stringsFileName 
     stringsFileName = ""
     # 将strings文件导出到Excel的路径
     exportExcelPath = "",
     # 导出时，对strings的key是否进行处理{}代表key的占位符
     exportExcelKeyFormat = "{}"
     # 要删除key的列表 eg. ["th_lable_password", "th_lable_username"] 跟strings file里面的key一致
     removeKeys = []
      # 注释key的前缀，开发使用
     stringsCommentPre = "comment_juhdfaruehg789ffuahgjahbtrt4rgre_"
     # 默认配置的路径
     defaultConfigurationPath = os.path.join(dirPath, "configuration.json")  
     # 如果不满足情况，请自行修改这个函数。
     @staticmethod
     def getStringsFilePathByExcelLanguage(excelLanguage, stringsFolder):
         for item in Config.excelLanguage2StringsFileName:
               if excelLanguage == item[0].strip():
                    stringsFileName = Config.stringsFileName.format(item[1])
                    stringFilePath = os.path.join(stringsFolder, stringsFileName)
                    if tools.isValidPathFormat(stringFilePath):  
                         return stringFilePath
                    else:
                         print(tools.ANSI.red("{}路径存在错误".format(stringFilePath)))
                         return None
         return None
     
     # 如果不满足情况，请自行修改这个函数。
     @staticmethod
     def getStringsFilePathArr(stringsFolder): 
          stringsFilePathArr = []
          for item in Config.excelLanguage2StringsFileName:
               if not isinstance(item, list) and len(item) != 2:
                    print(tools.ANSI.red("excelLanguage2StringsFileName存在错误"))
                    continue
               stringsFileName = Config.stringsFileName.format(item[1])
               stringFilePath = os.path.join(stringsFolder, stringsFileName)
               if tools.isValidPathFormat(stringFilePath):  
                  stringsFilePathArr.append({"stringFilePath":stringFilePath, "languageTitle":item[0]})
               else:
                  print(tools.ANSI.red("{}路径存在错误".format(stringFilePath)))
          return stringsFilePathArr
     
     @staticmethod 
     def loadConfigWithJsonFile(cofigFilePath):
         resdict = Config.jsonObjectWithJsonFile(cofigFilePath)
         if resdict:
               #切换工作目录
               # 获取当前工作目录  
               currentWorkingDirectory = os.getcwd()
               flag = False
               if currentWorkingDirectory != dirPath:
                  flag = True
                  os.chdir(dirPath)

               if "excelPath" in resdict:
                  Config.excelPath = os.path.abspath(resdict["excelPath"])
               if "excelSheetNum" in resdict:
                  Config.excelSheetNum = resdict["excelSheetNum"]
               if "excelLanguageRow" in resdict:
                  Config.excelLanguageRow = resdict["excelLanguageRow"]
               if "excelKeyCol" in resdict:
                  Config.excelKeyCol = resdict["excelKeyCol"]
               if "excelKeyRowStart" in resdict:
                  Config.excelKeyRowStart = resdict["excelKeyRowStart"]
               if "excelKeyRowEnd" in resdict:
                  Config.excelKeyRowEnd = resdict["excelKeyRowEnd"]
               if "excelKeyPattern" in resdict:
                  Config.excelKeyPattern = resdict["excelKeyPattern"]
               if "excelLanguage2StringsFileName" in resdict:
                  Config.excelLanguage2StringsFileName = resdict["excelLanguage2StringsFileName"]
               if "stringsFolderPath" in resdict:
                  Config.stringsFolderPath = os.path.abspath(resdict["stringsFolderPath"])
               if "stringsFileName" in resdict:
                  Config.stringsFileName = resdict["stringsFileName"] 
               if "exportExcelPath" in resdict:
                  Config.exportExcelPath = os.path.abspath(resdict["exportExcelPath"])
               if "exportExcelKeyFormat" in resdict:
                  Config.exportExcelKeyFormat = resdict["exportExcelKeyFormat"] 
               if "removeKeys" in resdict:
                  Config.removeKeys = resdict["removeKeys"] 
               if "platform" in resdict:
                   Config.platform = resdict["platform"]
               if flag:
                   os.chdir(currentWorkingDirectory)
               return True
         else:
               return False
     
     @staticmethod 
     def jsonObjectWithJsonFile(cofigFilePath):
          try:
               with open(cofigFilePath, 'r', encoding='utf-8') as file:  
                      # 读取文件内容并转换成JSON对象（在Python中是字典或列表）  
                    data = json.load(file)
                    if isinstance(data, dict):  
                        return data  
                    else:  
                        print(tools.ANSI.red("★★★★★★★★★★★★★ failure ⛄️⛄️⛄️⛄️⛄️1 ★★★★★★★★★★★★★"))
                        return None
          except Exception as e: 
                 print(tools.ANSI.red("★★★★★★★★★★★★★ failure ⛄️⛄️⛄️⛄️⛄️2 ★★★★★★★★★★★★★"))
                 print(tools.ANSI.red("{}中发生错误{}".format(__file__,e)))
                 return None
          

          
          

