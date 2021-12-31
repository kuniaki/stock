import investpy
import pandas as pd

# 直近のデータ
df = investpy.get_stock_recent_data(
    stock='7974',
    country='japan'
)

print(df)
