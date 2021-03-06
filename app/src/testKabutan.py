import requests
import codecs
from bs4 import BeautifulSoup
import re
from collections import deque

# URL - https://kabutan.jp/stock/?code=2502
# query parameter - ?code=2502
# code=2502 selects info about certain company


'''
URL = "https://kabutan.jp/stock/?code=2502"
page = requests.get(URL) # issue an HTTP GET requests to given URL
# retrieves HTML data that the server sends back and stores in Python object with type <class 'requests.models.Response'>

soup = BeautifulSoup(page.content, "html.parser")
# print("Type of soup: ", type(soup))
company_info = soup.find("div", class_ = "company_block").get_text();
# print(company_info)
company_per = soup.select('div#stockinfo_i3 > table > tbody > tr > td')[0].get_text()
company_marketvalue = soup.select('div#stockinfo_i3 > table > tbody > tr > td.v_zika2')[0].get_text()
print(company_marketvalue)
'''

'''
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

# test kabutan capital scrapping
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
'''

'''
ulletNewsUrl = "https://www.ullet.com/2502.html#news"
ulletNewsPage = requests.get(ulletNewsUrl)
ulletNewsSoup = BeautifulSoup(ulletNewsPage.content, "html.parser")

ulletNews = ulletNewsSoup.select('div.news_item > h3')
# ulletNews = ulletNewsSoup.findAll("div", class_ = "news_item")


result = {'date': list(), 'link': list()}
for i in ulletNews:
    temp = str(i).replace('<img alt="link.gif" height="13" src="https://www.ullet.com/img/icon/link.gif?218" width="13"/>', '').replace('<h3>', '').replace('･</h3>', '').split('</a> ')
    result['link'].append('<td>' + temp[0] + '</a></td>')
    result['date'].append('<td class="ullet-news-time">' + temp[1] + '</td>')
    print(temp)
    print()

print(len(ulletNews))
print(result)
'''
'''
<td class="news-time"><time datetime="2022-02-24T08:00:00+09:00">22/02/24 08:00</time></td>
<td><a href="https://kabutan.jp/disclosures/pdf/20220224/140120220222594407/">CONVOCATION NOTICE OF THE 98th ANNUAL GENERAL MEETING OF SHAREHOLDERS</a></td>
'''
kabutan_capital_url = "https://kabutan.jp/stock/holder?code=2502"
kabutan_capital_page = requests.get(kabutan_capital_url)
kabutan_capital_soup = BeautifulSoup(kabutan_capital_page.content, "html.parser")
capital_table = kabutan_capital_soup.select('table.stock_holder_1 > tbody > tr')
result = []
count = 0
for c in capital_table:
    if (count == len(capital_table)-1):
        result.append(str(c).replace(str(c.select('td')[0]), '').replace(str(c.select('td')[-1]), '').replace(str(c.select('td')[1]), '').replace('\n</tr></tr>', '').replace('<tr><tr>\n', '').replace("\n\n", "\n"))
    else:
        print(c)
        result.append(str(c).replace("/holder/lists/?", "https://kabutan.jp/holder/lists/?").replace(str(c.select('td')[-1]), '').replace(str(c.select('td')[0]), ''))
    count += 1
# result = list(str(c).replace("/holder/lists/?", "https://kabutan.jp/holder/lists/?").replace(str(c.select('td')[-1]), '').replace(str(c.select('td')[0]), '') for c in capital_table)
# print(result)
# for i in result:
#     print()
#     print(i)