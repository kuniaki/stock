import yfinance as yf
msft = yf.Ticker("2502.T")
t = msft.financials
print(t)
