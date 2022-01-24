import investpy
import json
import pandas as pd


code = '2502' #トヨタ自動車
annual = investpy.get_stock_financial_summary(stock=code, country='japan', summary_type='income_statement', period='annual')

print(annual)

