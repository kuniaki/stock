import investpy
import pandas as pd


df = investpy.get_stock_historical_data(stock='7974',
                                        country='japan',
                                        from_date='01/01/2020',
                                        to_date='01/01/2021')
print(df)
