import PyPDF2
import os
 
#create file object variable from pdf; we need to pass pdf file here
def convertToTXT(pdf):

    pdffileobj=open(pdf,'rb') # read binary
    
    pdfreader=PyPDF2.PdfReader(pdffileobj)
    
    x=len(pdfreader.pages)
    
    for i in range(x):
        pageobj=pdfreader.pages[i]
        
        text=pageobj.extract_text()
    
        file1=open("./temp/contract.txt","a") # a is for append
        file1.writelines(text)

def cleanUp(file_path):
    os.remove(file_path)