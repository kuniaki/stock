import requests
import json
import pandas as pd

pd.set_option('display.max_rows', 500)
pd.set_option('display.max_columns', 500)

BC_API_ENDPOINT="https://api.buffett-code.com/api/v2/quarter"
APIKEY='sAJGq9JH193KiwnF947v74KnDYkO7z634LWQQfPY'

def fetch(ticker=None, from_q=None, to_q=None):
    if not ticker:
        print('tickerを設定する')
        return
    if not from_q and not to_q:
        print('startとendの設定必須 例: 2017Q1')
        return
    response = requests.get(
            url=BC_API_ENDPOINT,
            params={
                "tickers": ticker,
                "from": from_q,
                "to": to_q,
            },
            headers={
                "x-api-key": APIKEY,
            },
        )
    return response 


res = fetch(2501, '2016Q1', '2018Q4')
print(res.text)

json_data = json.loads(res.text)

df = pd.DataFrame.from_dict(json_data['2501'])

df['fiscal_year'] = df['fiscal_year'].astype(int)
df['fiscal_quarter'] = df['fiscal_quarter'].astype(int)

df['YearQuarter']=df['fiscal_year'].map(str)+ '-' + df['fiscal_quarter'].map(str) + 'Q'

df.sort_values(by='YearQuarter', inplace=True)

df.set_index('YearQuarter', inplace=True)

print(df.T)
