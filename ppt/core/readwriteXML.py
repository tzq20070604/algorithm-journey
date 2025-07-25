import re
from lxml import etree
from configuration import Config
import tools
wrapContent = '''
<resources> 
</resources>
'''  

def readXMLFile(filePath, removeComments = False):
    # 处理了文件夹和文件不存在的情况
    if not tools.isFileExist(filePath):
        tools.creatFileIfNotExist(filePath)
        with open(filePath, "w") as file:
          file.write(wrapContent)
    
    # 解析XML文件，保留注释  
    try:
        parser = etree.XMLParser(remove_comments = removeComments)  
        tree = etree.parse(filePath, parser)  
        root = tree.getroot()
        return root
    except Exception as e: 
        print(tools.ANSI.red("★★★★★★★★★★★★★ failure 666 ⛄️⛄️⛄️⛄️⛄️19 ★★★★★★★★★★★★★"))
        print(tools.ANSI.red("{}中发生错误{}".format(__file__,e)))
        return None

def parseXMLFile2ResultDictionary(xmlFilePath):
    root = readXMLFile(xmlFilePath,removeComments = True)
    if root is not None:
        dict = xml2DictByRoot(root)
        return dict
    else:
        return None

# 使用Excel表格更新对应的Strings文件
def updateStringsFile(filePath, excelLanguageArr):
        root = readXMLFile(filePath, removeComments = False)
        if root is None:
            return None
        for item in excelLanguageArr:
            excelKey = item["key"]
            excelValue = item["value"]
            XMLItems = root.findall('string[@name="{}"]'.format(excelKey))
            length = len(XMLItems)
            if length > 1:
                XMLItems[-1].text = excelValue
                parent = XMLItems[-1].getparent()
                for item in XMLItems[:(length - 1)]:
                    parent.remove(item)
            elif length == 1:
                XMLItems[0].text = excelValue
            else:
                # 添加新的子元素  
                newItem = etree.SubElement(root, 'string', name="{}".format(excelKey))  
                newItem.text = excelValue
                newItem.tail = "\n"
        # 或者将 ElementTree 对象写入文件  
        etree.ElementTree(root).write(filePath, pretty_print=True, xml_declaration=True, encoding='utf-8')
      
def removeRecordsWithPath(filePath, keyArr):
    root = readXMLFile(filePath, removeComments=False)
    if root is not None:
        for key in keyArr:
            XMLItems = root.findall('string[@name="{}"]'.format(key))
            length = len(XMLItems)
            if length >= 1:
                parent = XMLItems[-1].getparent()
                for item in XMLItems:
                   parent.remove(item)
        # 或者将 ElementTree 对象写入文件  
        etree.ElementTree(root).write(filePath, pretty_print=True, xml_declaration=True, encoding='utf-8')

def removeRecords():
    stringsFilePathList = Config.getStringsFilePathArr(Config.stringsFolderPath)
    for item in stringsFilePathList:
          removeRecordsWithPath(item["stringFilePath"], Config.removeKeys)

def xml2DictByRoot(root):   
    result = {}  
    index = 0
    # if not child:  # 如果 child 没有子元素，则为 True
    for child in root:  
        # 如果子元素有文本内容，并且没有更多的子元素，则直接赋值  
        if  child is not None and len(list(child)) == 0 and child.text and child.attrib and child.tag == "string" and "name" in child.attrib:
           key =  child.attrib["name"]
           value = child.text
           if key != None:
              result[key] = {"key":key, "value":value, "index":index}
              index = index + 1
    return result  
  