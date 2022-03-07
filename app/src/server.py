import os, re
import csv
import investpy
import io
from time import sleep
from yahoo_finance_api2 import share
from yahoo_finance_api2.exceptions import YahooFinanceError
from flask import Flask, jsonify, request ,session
from datetime import datetime
import pandas as pd
import sys
import numpy as np
import json
import requests
from bs4 import BeautifulSoup
 

APP_PORT = int(os.environ['PORT'])
DEBUG = os.environ['DEBUG'].lower() == 'true'
#app = Flask(__name__)
app = Flask('app server')
#app.config['CORS_HEADERS'] = 'Content-Type'

"""
@api.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response
"""

@app.route('/')
def root():
    return "Chart Server"

@app.route('/api/v1/company_overview/', methods=['GET'])
def api_overview():
  code  = request.args.get('code')
  dc = grabFromUrl(code)
  return success(dc)


#http://server/api/v1/revenue/
@app.route('/api/v1/revenue/', methods=['GET'])
def api_revenue():
  code  = request.args.get('code')
  country = request.args.get('country')

  annual_revenue = investpy.get_stock_financial_summary(stock=code, country=country, summary_type='income_statement', period='annual')
  revenue_a = annual_revenue.reset_index()

  quarterly_revenue = investpy.get_stock_financial_summary(stock=code, country=country, summary_type='income_statement', period='quarterly')
  revenue_q = quarterly_revenue.reset_index()

  dc_a = dict(date=dateFormatter([i for i in revenue_a['Date'].dt.date]), total_revenue=[i for i in revenue_a['Total Revenue']], gross_profit=[i for i in revenue_a['Gross Profit']], operating_income=[i for i in revenue_a['Operating Income']], net_income=[i for i in revenue_a['Net Income']])
  dc_a['revenue_percentage'] = getPercentage(dc_a['total_revenue'])
  dc_q = dict(date=dateFormatter([i for i in revenue_q['Date'].dt.date]), total_revenue=[i for i in revenue_q['Total Revenue']], gross_profit=[i for i in revenue_q['Gross Profit']], operating_income=[i for i in revenue_q['Operating Income']], net_income=[i for i in revenue_q['Net Income']])
  dc_q['revenue_percentage'] = getPercentage(dc_q['total_revenue'])

  dc_revenue = {'annual': dc_a, 'quarterly': dc_q}

  return success(dc_revenue)


@app.route('/api/v1/rsegment/',methods=['GET'])
def api_rsegment():
  filename  = "./segment_revenue.csv"
  with open(filename, encoding='utf-8-sig', newline='') as f:
    csvreader = csv.DictReader(f)
    content = [row for row in csvreader]

  year = []
  for i in content:
    year.append(i["年度"])

  others = []
  for i in content:
    others.append(i["その他"])

  food = []
  for i in content:
    food.append(i["食品"])

  drink = []
  for i in content:
    drink.append(i["飲料"])

  alcohol = []
  for i in content:
    alcohol.append(i["酒類"])

  international = []
  for i in content:
    international.append(i["国際"])

  dc = dict(year=year,others=others,food=food,drink=drink,alcohol=alcohol,international=international)

  return success(dc)

#http://server/api/v1/stock?code=7494&country=japan&from_date=01/01/2020&to_date=01/01/2021
@app.route('/api/v1/stock/',methods=['GET'])
def api_stock():

  code  = request.args.get('code')
  country = request.args.get('country')
  fromD   = request.args.get('from_date')
  toD     = request.args.get('to_date')

  result0 = kabuka(1320,5,1)
  nik =  array(result0[3].values())

  sleep(0.1)

  result1 = kabuka(code,5,1)
  co =  array(result1[3].values())

  date = result0[2]

  dc = dict(date=date,close=co,nikkei=nik)

  return success(dc)

def kabuka(code,S_year,S_day):
  company_code = str(code) + '.T'
  my_share = share.Share(company_code)
  symbol_data = None

  try:
        symbol_data = my_share.get_historical(share.PERIOD_TYPE_YEAR,
                                              S_year,
                                              share.FREQUENCY_TYPE_DAY,
                                              S_day)
  except YahooFinanceError as e:
        print(e.message)
        sys.exit(1)
  df_base = pd.DataFrame(symbol_data)
  df_base = pd.DataFrame(symbol_data.values(), index=symbol_data.keys()).T
  df_base.timestamp = pd.to_datetime(df_base.timestamp, unit='ms')
  df_base.index = pd.DatetimeIndex(df_base.timestamp, name='timestamp').tz_localize('UTC').tz_convert('Asia/Tokyo')
  df_base = df_base.reset_index(drop=True)

  ccc = []
  for dd in df_base["close"]:
       ccc.append(dd)
   
  ddd = []
  for dd in df_base["timestamp"]:
       x = pd.to_datetime(dd)
       yyy = x.strftime('%Y')
       mmm = x.strftime('%m').lstrip('0')
       da  = x.strftime('%d').lstrip('0')
       ddd.append(yyy+'-'+mmm+'-'+da)

  dc = dict(date=ddd,close=ccc)

  ff = {}
  for index in range(len(ddd)):
#   if isNaN(ccc[index]) == False:
      ff[ddd[index]] = ccc[index]

  return company_code, df_base, ddd ,ff

def array(v):
  n =[]
  for vv in v:
      # check if item is NaN
      # note that nikkei has more entries than asahi
      #if (pd.isna(vv)):
       #   n.append(None)
      #else:
      if pd.isna(vv) == False:
           n.append(vv)
  return n

# take country code as parameter, grab company info from kabutan
def grabFromUrl(code):

  info = {}

  kabutan_overview_url = "https://kabutan.jp/stock/?code=" + code
  kabutan_news_url = "https://kabutan.jp/stock/news?code=" + code + "&nmode=2"
  kabutan_disclosure_url = "https://kabutan.jp/stock/news?code=" + code + "&nmode=3"
  kabutan_capital_url = "https://kabutan.jp/stock/holder?code=" + code
  
  ullet_news_url = "https://www.ullet.com/" + code + ".html#news"


  kabutan_overview_page = requests.get(kabutan_overview_url) # issue an HTTP GET requests to given URL
  kabutan_news_page = requests.get(kabutan_news_url)
  kabutan_disclosure_page = requests.get(kabutan_disclosure_url)
  kabutan_capital_page = requests.get(kabutan_capital_url)

  ullet_news_page = requests.get(ullet_news_url)
  # retrieves HTML data that the server sends back and stores in Python object with type <class 'requests.models.Response'>

  kabutan_overview_soup = BeautifulSoup(kabutan_overview_page.content, "html.parser")
  kabutan_news_soup = BeautifulSoup(kabutan_news_page.content, "html.parser")
  kabutan_disclosure_soup = BeautifulSoup(kabutan_disclosure_page.content, "html.parser")
  kabutan_capital_soup = BeautifulSoup(kabutan_capital_page.content, "html.parser")

  ullet_news_soup = BeautifulSoup(ullet_news_page, "html.parser")

  info['overview'] = grabOverviewSoup(kabutan_overview_soup)
  info['news'] = grabNewsSoup(kabutan_news_soup, 2)
  info['disclosure'] = grabNewsSoup(kabutan_disclosure_soup, 3)
  info['capital'] = grabCapitalSoup(kabutan_capital_soup)
  info['ulletnews'] = grabNewsUlletSoup(ullet_news_soup)
  # test if works fine

  return info

# grab overview info, return in dict form
def grabOverviewSoup(soup):
  company_info = soup.find("div", class_ = "company_block").get_text();

  company_splitted = company_info.strip().split("\n\n\n\n");
  company = company_splitted[0].split("\n")
  splitted = company_splitted[1].split("\n\n\n")
  splitted[-1] = ",".join(splitted[-1].split("\n"))
  splitted[-2] = "\n".join(splitted[-2:])
  splitted.pop(-1)

  result = dict({company[0]: company[1]})
  for item in splitted:
      temp = item.split("\n", maxsplit=1)
      result[temp[0]] = temp[1]
  return result

# grab news info, return in dict form
def grabNewsSoup(soup, index):
  news_table = soup.select('table.s_news_list > tr')

  time = soup.select('table.s_news_list > tr > td.news_time')
  time_list = list(str(i).replace('news_time', 'news-time').replace('\xa0', ' ') for i in time)
  news = {'date': time_list, 'link': list()}

  for date in news_table:
    # news['date'].append(" ".join(date.get_text().strip().split("\n\n")[0].split("\xa0")))
    for link in date.children:
        if "href" in str(link):
          if index == 2:
            news['link'].append(str(link).replace('/stock/news?', 'https://kabutan.jp/stock/news?').replace("&amp;", "&"))
          elif index == 3:
            news['link'].append(str(link).replace('<img alt="pdf" src="/images/cmn/pdf16.gif"/>', '').replace(' target="pdf"', '').replace(' class="td_kaiji"', ''))

  return news

# grab capital info, return in dict form
def grabCapitalSoup(soup):
  capital_table = soup.select('table.stock_holder_1 > tbody > tr')
  result = list(str(c).replace("/holder/lists/?", "https://kabutan.jp/holder/lists/?") for c in capital_table)
  return result

# grab news from ullet, return in dict form
def grabNewsUlletSoup(soup):
  ullet_news = soup.select('div.news_item > h3 > a')
  result = list(str(i).replace('<img alt="link.gif" height="13" src="https://www.ullet.com/img/icon/link.gif?218" width="13"/>', '') for i in ullet_news)
  return result

# Change pd.DataFrame to string
def dateFormatter(data): 
    result = []
    for i in data:
        date_str = '%s-%s-%s' % (i.year, i.month, i.day)
        result.append(date_str)
    return result

# Get percentage change base on given list
def getPercentage(data):
    result = []
    index = 0
    while (index < len(data) - 1):
        percentage = (data[index] - data[index+1])/ data[index]
        result.insert(index, round(percentage, 3))
        index += 1
    result.insert(index, None)
    return result
   
def isalnum(text):
  return re.match(r'^[a-zA-Z0-9]+$', text) is not None

def success(d):
  return (jsonify(d), 200)

def makeArray(df,text):
  dd = []
  for item in df[text]:
    dd.append(item)
  return dd

def error(code):
  message = {
    400.1: "bad request. key must be alnum",
    400.2: "bad request. post/put needs value on body",
    400.3: "bad request. value must be Alnum",
    404: "resource not found",
    409: "resource conflict. resource already exist",
  }
  return (jsonify({'error':message[code], 'code':int(code)}), int(code))

@app.errorhandler(404)
def api_not_found_error(error):
  return (jsonify({'error':"api not found", 'code':404}), 404)

@app.errorhandler(405)
def method_not_allowed_error(error):
  return (jsonify({'error':'method not allowed', 'code':405}), 405)

@app.errorhandler(500)
def internal_server_error(error):
  return (jsonify({'error':'server internal error', 'code':500}), 500)

app.run(debug=DEBUG, host='0.0.0.0', port=APP_PORT,)
