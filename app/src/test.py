import investpy
import json
import pandas as pd

# 直近のデータ
df = investpy.get_stock_recent_data(
    stock='2502',
    country='japan'
)



print(df,"is of type of",type(df))

dj = df.to_json()

print(dj,"is of type of",type(dj))


