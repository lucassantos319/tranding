# Some comments about this algorithm
# +++++++++++++++++++++++++++++++++++++++++++
# Datetime = set dates for begin and end of
#            interesting intevals
# 
# plt = basic graphs 
# 
# pandas = data analysis library
# pandas_datareader = get yahoo finance api's datas 

import datetime as dt
import matplotlib.pyplot as plt
from matplotlib import style
import pandas as pd
import pandas_datareader.data as web

style.use('ggplot')

start = dt.datetime(2000,1,1)
end = dt.datetime(2020,3,27)

# df = data frame 
# DataReader(ticker=symbol for the company,) 
df = web.DataReader('TSLA','yahoo',start,end)

print(df.tail(4))