From python:3.7.5-slim
RUN pip install flask==1.1.1 redis==3.3.8
RUN pip install investpy
WORKDIR /src
COPY ./src/server.py /src/

RUN pip install --upgrade pip && \
    pip install --upgrade setuptools && \
    pip install --upgrade Flask flask_cors mplfinance

ENV PORT 80
ENV DEBUG false
ENV REDIS_HOST 127.0.0.1
ENV REDIS_PORT 6379
ENV REDIS_DB 0
ENTRYPOINT ["python", "-u", "server.py"]
