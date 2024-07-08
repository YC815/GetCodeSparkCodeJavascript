import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os
from dotenv import load_dotenv
from flask import Flask, jsonify

app = Flask(__name__)
load_dotenv()


def get_code():
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')  # 如果你不需要看到瀏覽器，可以使用這個選項
    driver = webdriver.Chrome(options=options)

    driver.get("https://dashboard.codespark.com/dashboard/classroom/RsbJLJpeNC")

    wait = WebDriverWait(driver, 30)  # 增加等待時間到30秒

    # 等待並輸入使用者名稱
    username_input = wait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div/div[2]/div[1]/div[1]/div[2]/div/div[2]/div/form/div[1]/input")))
    username_input.send_keys(os.getenv("USERNAME"))

    # 等待並輸入密碼
    password_input = wait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div/div[2]/div[1]/div[1]/div[2]/div/div[2]/div/form/div[2]/input")))
    password_input.send_keys(os.getenv("PASSWORD"))

    # 等待並點擊登入按鈕
    login_button = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="login-submit"]')))
    login_button.click()

    # 等待並點擊導航欄中的連結
    nav_link = wait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div/div[1]/ul[1]/li[2]/a")))
    nav_link.click()

    # 增加延遲以確保頁面加載完成
    time.sleep(2)

    # 修正錯誤的XPATH，這裡是猜測修正：
    target_element = wait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div/div[2]/ul/li[1]/a/div/h2")))
    target_element.click()

    # 增加延遲以確保頁面加載完成
    time.sleep(2)

    # 等待並點擊目標元素
    button1 = wait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div/div[2]/div[1]/button")))
    button1.click()

    # 增加延遲以確保頁面加載完成
    time.sleep(2)

    # 等待並點擊目標元素
    button2 = wait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div/div[2]/div[1]/div/div/div[2]/div[4]/button")))
    button2.click()

    # 等待並取得文字內容
    code_element = wait.until(EC.presence_of_element_located((By.XPATH, "/html/body/div[1]/div/div[2]/div[1]/div/div/div[2]/div[2]/span")))
    code_text = code_element.text
    driver.quit()
    return jsonify({"code": code_text})
