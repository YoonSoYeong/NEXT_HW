from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time
from datetime import datetime
import csv

chromedriver_path='"C:/Users/ysy95/Desktop/next세션자료/session6/chromedriver-win64"'

user_data_dir="C:/Users/ysy95/Desktop/NEXT/Session/HW/NEXT_HW_6/ud"

chrome_options = Options()
chrome_options.add_argument(f"user_data_dir={user_data_dir}")
service = Service(excecutable_path=chromedriver_path)

driver = webdriver.Chrome(service=service, options=chrome_options)
driver.get('https://kream.co.kr/')

wmbtn = driver.find_element(By.XPATH,'//*[@id="wrap"]/div[4]/div[3]/div[2]/div[2]/div/a[4]/p')
wmbtn.click()
time.sleep(3)

shbtn = driver.find_element(By.XPATH, '/html/body/div/div/div/div[4]/div[3]/div[2]/div[1]/div/a[4]/p')
shbtn.click()
time.sleep(30)

today = datetime.now().strftime('%Y%m%d')

file = open(f'{today}kream.csv', mode="w", newline='')
writer = csv.writer(file)
writer.writerow(["brand","name","wish"])


for i in range(1,45):
    brands = driver.find_element(By.XPATH, f'//*[@id="ex0"]/div[2]/div[{i}]/a/div[2]/div[1]/p').text
    names = driver.find_element(By.XPATH, f'/html/body/div/div/div/div[4]/div[2]/div[2]/div/div[2]/div[{i}]/a/div[2]/div[1]/div/p[2]').text
    wishes = driver.find_element(By.XPATH, f'//*[@id="ex0"]/div[2]/div[{i}]/div/span[1]/span[2]').text
    
    writer.writerow([brands, names, wishes])
    
file.close()


