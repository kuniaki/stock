import sys
from yahoo_finance_api2 import share
from yahoo_finance_api2.exceptions import YahooFinanceError
import pandas as pd
import datetime 
 
my_share = share.Share('7203.T')
symbol_data = None
 
try:
    symbol_data = my_share.get_historical(
        share.PERIOD_TYPE_DAY, 30,
        share.FREQUENCY_TYPE_MINUTE, 60)
except YahooFinanceError as e:
    print(e.message)
    sys.exit(1)
 
df = pd.DataFrame(symbol_data)
df["datetime"] = pd.to_datetime(df.timestamp, unit="ms")
 
#日本時間へ変換
df["datetime_JST"] = df["datetime"] + datetime.timedelta(hours=9)
