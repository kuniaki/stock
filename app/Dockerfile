From python:3.7.5-slim
RUN pip install flask==1.1.1
RUN pip install investpy
RUN pip install yahoo_finance_api2
RUN pip install requests
RUN pip install beautifulsoup4
WORKDIR /src
COPY ./src/server.py /src/
COPY ./src/segment_revenue.csv /src/
COPY ./src/test.py /src/
COPY ./src/test1.py /src/
COPY ./src/test2.py /src/
COPY ./src/test3.py /src/

RUN pip install --upgrade pip && \
    pip install --upgrade setuptools && \
    pip install --upgrade Flask flask_cors mplfinance

ENV PORT 80
ENV DEBUG false
ENTRYPOINT ["python", "-u", "server.py"]
