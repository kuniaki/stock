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

# print([i for i in revenue_q['Date']])
# print([i for i in revenue_q['Date'].dt.date])


def dateFormatter(data): 
    result = []
    for i in data:
        date_str = '%s-%s-%s' % (i.year, i.month, i.day)
        result.append(date_str)
    return result

def getPercentage(data):
    # 2020 - 2019 / 2019 -> stored in 2020
    '''
        a_number = 1 / 3
        percentage = "{:.2%}".format(a_number)
        print(percentage)
        OUTPUT: 33.33%
    '''
    result = []
    index = 0;
    while (index < len(data) - 1):
        print(index)
        percentage = (data[index] - data[index+1])/ data[index]
        result.insert(index, "{:.1%}".format(percentage))
        index += 1
    # test if set as none OR string "undefined"
    result.insert(index, None)
    return result

print("----------Annual Revenue----------")
print(dateFormatter([i for i in revenue_a['Date'].dt.date]))
print(dc_a["total_revenue"])
print(getPercentage(dc_a["total_revenue"]))
print()

print("----------Quarterly Revenue----------")
print(dateFormatter([i for i in revenue_q['Date'].dt.date]))
print(dc_q["total_revenue"])
print(getPercentage(dc_q["total_revenue"]))
print()

