import requests
import codecs
from bs4 import BeautifulSoup
import re
from collections import deque

# URL - https://kabutan.jp/stock/?code=2502
# query parameter - ?code=2502
# code=2502 selects info about certain company

'''

URL = "https://kabutan.jp/stock/?code=2501"
page = requests.get(URL) # issue an HTTP GET requests to given URL
# retrieves HTML data that the server sends back and stores in Python object with type <class 'requests.models.Response'>

print("Type of page: ", type(page))


soup = BeautifulSoup(page.content, "html.parser")
print("Type of soup: ", type(soup))

company_info = soup.find("div", class_ = "company_block").get_text();
print(company_info)

company_splitted = company_info.strip().split("\n\n\n\n");
company = company_splitted[0].split("\n")
splitted = company_splitted[1].split("\n\n\n")
splitted[-1] = ",".join(splitted[-1].split("\n"))
splitted[-2] = "\n".join(splitted[-2:])
splitted.pop(-1)
print(splitted)

result = dict({company[0]: company[1]})
for item in splitted:
    temp = item.split("\n", maxsplit=1)
    result[temp[0]] = temp[1]

print(result)

# print(company_info.text.strip())
# print(company_info.text.strip().splitlines(False))
    # print(item.prettify())
    # print(item)
    # print(item.text.strip())
    # print("======================")
    # content = item.text.strip().split("\n")
    # print(content)

# company information: class = "company_block"
print("\n\n=======================\n\n")
# test grabbing kabutan news 決算速報
newsURL = "https://kabutan.jp/stock/news?code=2502&nmode=3"
newsPage = requests.get(newsURL)
# div id="new_contents"
# table class="s_news_list"

soupNews = BeautifulSoup(newsPage.content, "html.parser")
newsRaw = soupNews.find("table", class_ = "s_news_list")
# linkRaw = soupNews.find_all("td", class_ = "ctg3_kk")
timeRaw = soupNews.find_all("td", class_ = "news_time")
aRaw = soupNews.select('table.s_news_list > tr')
time = soupNews.select('table.s_news_list > tr > td.news_time')
timeList = list(str(i).replace('news_time', 'news-time').replace('\xa0', ' ') for i in time)
news = {'date': timeList, 'link': list()}
print(aRaw)

for a in aRaw:
    # print("\n")
    # print(a.get_text().strip().split("\n\n"))
    # news['date'].append(" ".join(a.get_text().strip().split("\n\n")[0].split("\xa0")))
    
    for i in a.children:
        if "href" in str(i):
            # news['link'].append(str(i).replace('/stock/news?', 'https://kabutan.jp/stock/news?').replace("&amp;", "&"))
            news['link'].append(str(i).replace('<img alt="pdf" src="/images/cmn/pdf16.gif"/>', '').replace(' target="pdf"', '').replace(' class="td_kaiji"', ''))
        
print(news)

# newsRaw.replace('/stock/news', 'https://kabutan.jp/stock/news')
# print(newsRaw)

'''

capitalURL = "https://kabutan.jp/stock/holder?code=2502"
capital_page = requests.get(capitalURL)
print(type(capital_page))
capital_soup = BeautifulSoup(capital_page.content, "html.parser")

capital_table = capital_soup.select('table.stock_holder_1 > tbody > tr')

for i in capital_table:
    print()
    print(i)

print(list(str(c).replace("/holder/lists/?", "https://kabutan.jp/holder/lists/?") for c in capital_table))