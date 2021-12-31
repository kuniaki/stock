import investpy
import json
import pandas as pd

# 直近のデータ
df = investpy.get_stock_recent_data(
    stock='7974',
    country='japan'
)



print(df,"is of type of",type(df))

dj = df.to_json()

print(dj,"is of type of",type(dj))


