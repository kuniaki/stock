import os, re
import investpy
import io
from flask import Flask, jsonify, request ,session
from datetime import datetime
import pandas as pd
import sys
import numpy as np
import json
 

APP_PORT = int(os.environ['PORT'])
DEBUG = os.environ['DEBUG'].lower() == 'true'
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

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
  open_d = makeArray(symbol_data,"Open")
  high_d = makeArray(symbol_data,"High")
  low_d = makeArray(symbol_data,"Low")
  volume_d = makeArray(symbol_data,"Volume")

  dates = []
  dd = symbol_data.to_dict()
  keys = dd['Open'].keys()
  for item in keys:
    da = str(item.year) + "-" + str(item.month) + "-" + str(item.day)
    dates.append(da)
  dc = dict(date=dates,open=open_d,high=high_d,low=low_d,close=close_d,volume=volume_d)
  return success(dc)


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
