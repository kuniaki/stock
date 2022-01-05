From python:3.7.5-slim
RUN pip install flask==1.1.1
RUN pip install investpy
WORKDIR /src
COPY ./src/server.py /src/
COPY ./src/test.py /src/
COPY ./src/test1.py /src/
COPY ./src/test2.py /src/
COPY ./src/test3.py /src/

RUN pip install --upgrade pip && \
    pip install --upgrade setuptools && \
    pip install --upgrade Flask flask_cors mplfinance

ENV PORT 3000
ENV DEBUG false
ENTRYPOINT ["python", "-u", "server.py"]
