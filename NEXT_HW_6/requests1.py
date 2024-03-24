from bs4 import BeautifulSoup as bs
import requests
from datetime import datetime
from openpyxl import Workbook

url='https://kream.co.kr/exhibitions/761'

try:
    headers = { 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.3'
    }
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        html_text = response.text
        
        soup = bs(response.text, 'html.parser')
        
        brands=soup.find_all(class_='product_info_brand brand')
        brands = list(map(lambda x: x. text.strip(), brands))
        print(brands)
        
        
        names=soup.find_all(class_='translated_name')
        names = list(map(lambda x: x. text.strip(), names))
        print(names)
        
        
        amounts=soup.find_all(class_='amount')
        amounts = list(map(lambda x: x. text.strip(),amounts))
        print(amounts)
        
        wb = Workbook()
        ws = wb.active
        
        ws.append(["브랜드","상품명","가격"])
        
        for i, (brands, names, amounts) in enumerate(zip (brands, names, amounts), start=1):
            ws.append([brands, names, amounts])   
        
        today = datetime.now().strftime('%Y%m%d')
        
        filename = f'Kream_W_Shoes_{today}.xlsx'
        wb.save(filename)
        print(f"엑셀 저장완료: {filename}")
        
    else: 
        print(f"Error: HTTP 요청 실패. 상태코드; {response.status_code}")
        
except requests.exceptions.RequestException as e:
    print(f"Error: 요청 중 오류 발생. 오류메세지:{e}")
