import yfinance as yf

ticker_info = yf.Ticker("2504.T")

# News
print(ticker_info.news)

# 4 years yearly financial statement
print("yearly financial statement")
print(ticker_info.financials)

# 4 years quartely financial statement
print("quartely financial statement")
print(ticker_info.quartely_financials)
