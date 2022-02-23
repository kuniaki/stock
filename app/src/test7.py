import os, re
from time import sleep
import csv
import investpy
import io
from yahoo_finance_api2 import share
from yahoo_finance_api2.exceptions import YahooFinanceError
from flask import Flask, jsonify, request ,session
from datetime import datetime
import pandas as pd
import sys
import numpy as np
import json

def isNaN(num):
    return num != num


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
#     print(ccc[index])
#   print(type(ccc[index]))
      ff[ddd[index]] = ccc[index]

  return company_code, df_base, ddd ,ff

# Change pd.DataFrame to string
def dateFormatter(data):
    result = []
    for i in data:
        date_str = '%s-%s-%s' % (i.year, i.month, i.day)
        result.append(date_str)
    return result


result0 = kabuka(1320,5,1)
nik = result0[3].values()

sleep(0.15)

result1 = kabuka(2502,5,1)
co = result1[3].values()

date = result0[3].keys()

#dc = dict(date=date,close=co,nikkei=nik)

#print(result0[2])

#print(list(co))

#print(dc)
