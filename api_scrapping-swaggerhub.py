import requests
import json

LIMIT = 50
url_users = F"https://app.swaggerhub.com/apiproxy/specs?sort=UPDATED&order=DESC&limit={LIMIT}"

r_users = requests.get(url_users)
users_data = r_users.json()
users_list = users_data["apis"]

user_api = {}
for user in users_list:
    url = user["properties"][0]["url"]
    r = requests.get(url = url)
    api_definition = r.json()
    user_api[user["name"]] = api_definition

with open("definitions.json", "w") as outfile: 
    json.dump(user_api, outfile)

print("Done")