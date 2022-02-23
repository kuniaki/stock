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
  symbol_data = None
  symbol_data = investpy.get_stock_historical_data(stock=code,
                                        country=country,
                                        from_date=fromD,
                                        to_date=toD)
  close_d = makeArray(symbol_data,"Close")

  dates = []
  dd = symbol_data.to_dict()
  keys = dd['Open'].keys()
  for item in keys:
    da = str(item.year) + "-" + str(item.month) + "-" + str(item.day)
    dates.append(da)


###  Nikkei Average
# print('*******Hello world!*****************', file=sys.stderr)
# result = kabuka(1320,5,1)
# diff = list(set(result[2]) - set(dates))
# for rr in diff:
#    result[3].pop(rr)

# n =[]
# for vv in result[3].values():
#     # check if item is NaN
#     # note that nikkei has more entries than asahi
#     if (pd.isna(vv)):
#         n.append(None)
#     else:
#         n.append(vv)
 
  dc = dict(date=dates,close=close_d,nikkei=close_d)
#   dc = dict(date=dates,close=close_d,nikkei=n)
  

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
