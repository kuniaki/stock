import os, re, redis
import investpy
import io
from flask import Flask, jsonify, request ,session
from flask_cors import CORS
from yahoo_finance_api2 import share
from yahoo_finance_api2.exceptions import YahooFinanceError
from datetime import datetime
import pandas as pd
import sys
import numpy as np
import json
 

REDIS_HOST = os.environ['REDIS_HOST']
REDIS_PORT = int(os.environ['REDIS_PORT'])
REDIS_DB = int(os.environ['REDIS_DB'])
REDIS = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB)
APP_PORT = int(os.environ['PORT'])
DEBUG = os.environ['DEBUG'].lower() == 'true'
app = Flask(__name__)

 

CORS(app)

# http://server:5000/
@app.route('/')
def root():
    return "Chart Server"

#http://server:5000/api/v1/stock?code=7494&country=japan&from_date=01/01/2020&to_date=01/01/2021
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
  opens = makeArray(symbol_data,"Close")

  dates = []
  dd = symbol_data.to_dict()
  keys = dd['Open'].keys()
  for item in keys:
    da = str(item.year) + "-" + str(item.month) + "-" + str(item.day)
    dates.append(da)
  dc = dict(date=dates,close=opens)
  return success(dc)

@app.route('/api/v1/keys/', methods=['GET'])
def api_keys():
  data = {}
  cursor = '0'
  while cursor != 0:
    cursor, keys = REDIS.scan(cursor=cursor, count=1000000)
    if len(keys) == 0:
      break
    keys = [key.decode() for key in keys]
    values = [value.decode() for value in REDIS.mget(*keys)]
    data.update(dict(zip(keys, values)))
  return success(data)

@app.route('/api/v1/keys/<key>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def api_key(key):
  if not isalnum(key):
    return error(400.1)
  body = request.get_data().decode().strip()
  if request.method in ['POST', 'PUT']:
    if body == '':
      return error(400.2)
    if not isalnum(body):
      return error(400.3)
  def get():
    value = REDIS.get(key)
    if value is not None:
      return success({key:value.decode()})
    return error(404)
  def post():
    if REDIS.get(key) is not None:
      return error(409)
    REDIS.set(key, body)
    return success({key:body})
  def put():
    REDIS.set(key, body)
    return success({key:body})
  def delete():
    if REDIS.delete(key) == 0:
      return error(404)
    return success({})
  fdict = {'GET':get, 'POST':post, 'PUT':put, 'DELETE':delete}
  return fdict[request.method]()

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

app.run(debug=DEBUG, host='0.0.0.0', port=APP_PORT)
