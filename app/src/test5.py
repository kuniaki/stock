import csv
filename  = "./segment_revenue.csv"
with open(filename, encoding='utf-8-sig', newline='') as f:
    csvreader = csv.DictReader(f)
    content = [row for row in csvreader]

"""
print(content)
dict_keys(['年度', 'その他', '食品', '飲料', '酒類', '国際'])
dict_keys(['年度', 'その他', '食品', '飲料', '酒類', '国際'])
dict_keys(['年度', 'その他', '食品', '飲料', '酒類', '国際'])
dict_keys(['年度', 'その他', '食品', '飲料', '酒類', '国際'])
dict_keys(['年度', 'その他', '食品', '飲料', '酒類', '国際'])
"""

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
print(dc)

"""
print(year)
print(others)
print(food)
print(drink)
print(alcohol)
print(international)
"""
