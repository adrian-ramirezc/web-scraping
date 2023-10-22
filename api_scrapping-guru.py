import requests
import json

"""
APIs scrapping to retrieve api's definitions

APIs library: https://apis.guru/
"""

outfile_name = "definitions.json"

apis_url = "https://raw.githubusercontent.com/APIs-guru/openapi-directory/gh-pages/v2/list.json"
apis_raw_data : dict = requests.get(apis_url).json()

for api_name, api_data in apis_raw_data.items():
    versions: dict = api_data["versions"]
    for version_name, version in versions.items():
        # TODO: Assert that attribute exists
        api_definition_url = version["swaggerUrl"]
        # TODO: Check if url contains openai - to filter out swagger defs
        r = requests.get(url = api_definition_url)
        api_definition = r.json()
        relevant_data = {"version":version_name, "definition": api_definition} 
        # TODO: Do we need all versions ? 
        break 

    try:
        with open(outfile_name, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        # If the file doesn't exist, initialize data as an empty dictionary
        data = {}
    
    # Avoid writing file in the end as dict size may get large
    data.update({api_name : relevant_data})

    with open(outfile_name, "w") as outfile: 
        json.dump(data, outfile)

print("Done!")