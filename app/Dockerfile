From python:3.7.5-slim
RUN pip install flask==1.1.1 redis==3.3.8
RUN pip install investpy
WORKDIR /src
COPY ./src/server.py /src/
ENV PORT 80
ENV DEBUG false
ENTRYPOINT ["python", "-u", "server.py"]
