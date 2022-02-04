import investpy
import json
import pandas as pd
import datetime

code = '2502' #Asahi
country = 'japan'

annual_revenue = investpy.get_stock_financial_summary(stock=code, country=country, summary_type='income_statement', period='annual')
revenue_a = annual_revenue.reset_index()

quarterly_revenue = investpy.get_stock_financial_summary(stock=code, country=country, summary_type='income_statement', period='quarterly')
revenue_q = quarterly_revenue.reset_index()

dc_a = dict(date=[i for i in revenue_a['Date'].dt.date], total_revenue=[i for i in revenue_a['Total Revenue']], gross_profit=[i for i in revenue_a['Gross Profit']], operating_income=[i for i in revenue_a['Operating Income']], net_income=[i for i in revenue_a['Net Income']])

dc_q = dict(date=[i for i in revenue_q['Date'].dt.date], total_revenue=[i for i in revenue_q['Total Revenue']], gross_profit=[i for i in revenue_q['Gross Profit']], operating_income=[i for i in revenue_q['Operating Income']], net_income=[i for i in revenue_q['Net Income']])
print(revenue_a)
print(revenue_q)
print()

print([i for i in revenue_q['Date']])
print([i for i in revenue_q['Date'].dt.date])



def dateFormatter(data): 
    result = []
    for i in data:
        date_str = '%s-%s-%s' % (i.year, i.month, i.day)
        result.append(date_str)
    return result


dateFormatter([i for i in revenue_q['Date'].dt.date])