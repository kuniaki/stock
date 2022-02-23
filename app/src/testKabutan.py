import requests
from bs4 import BeautifulSoup

# URL - https://kabutan.jp/stock/?code=2502
# query parameter - ?code=2502
# code=2502 selects info about certain company

URL = "https://kabutan.jp/stock/?code=2501"
page = requests.get(URL) # issue an HTTP GET requests to given URL
# retrieves HTML data that the server sends back and stores in Python object with type <class 'requests.models.Response'>

print("Type of page: ", type(page))


soup = BeautifulSoup(page.content, "html.parser")
print("Type of soup: ", type(soup))

company_info = soup.find("div", class_ = "company_block").get_text();
print(company_info)

company_splitted = company_info.strip().split("\n\n\n\n");
company = company_splitted[0].split("\n")
splitted = company_splitted[1].split("\n\n\n")
splitted[-1] = ",".join(splitted[-1].split("\n"))
splitted[-2] = "\n".join(splitted[-2:])
splitted.pop(-1)
print(splitted)

result = dict({company[0]: company[1]})
for item in splitted:
    temp = item.split("\n", maxsplit=1)
    result[temp[0]] = temp[1]

print(result)

# print(company_info.text.strip())
# print(company_info.text.strip().splitlines(False))
    # print(item.prettify())
    # print(item)
    # print(item.text.strip())
    # print("======================")
    # content = item.text.strip().split("\n")
    # print(content)

# company information: class = "company_block"