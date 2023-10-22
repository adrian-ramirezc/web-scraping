import requests
from flask import Flask
from flask_restful import Resource, Api, reqparse
from dataclasses import dataclass, asdict
from flask import request 
from flask_cors import CORS
import json


app = Flask(__name__)
CORS(app)
api = Api(app)

api_def_parser = reqparse.RequestParser()
api_def_parser.add_argument('name')
api_def_parser.add_argument('definition_url')
api_def_parser.add_argument('version')


@dataclass
class ApiInfo:
    name: str
    version: str
    definition_url: str

    def to_dict(self):
        return {k: str(v) for k, v in asdict(self).items()}

class Home(Resource):
    def get(self):
        return {"This is home!": "home"}

class ApiList(Resource):
    def get(self, size : str):
        size_str = int(size)
        apis_url = "https://raw.githubusercontent.com/APIs-guru/openapi-directory/gh-pages/v2/list.json"
        apis_raw_data : dict = requests.get(apis_url).json()
        apis_info = [
                        ApiInfo(name= api_name,version= version_name,definition_url=version_data["swaggerUrl"])
                        for api_name, data in apis_raw_data.items() 
                        for version_name, version_data in data["versions"].items()
                    ][:size_str]
        return {"apis_info": [api_info.to_dict() for api_info in apis_info]}

class ApiDefinition(Resource):
    def post(self):
        args = api_def_parser.parse_args()
        api_definition : dict = requests.get(args["definition_url"]).json()
        return {"api_definition": json.dumps(api_definition, indent=4)}

api.add_resource(Home, '/')
api.add_resource(ApiList, '/apis/<size>')
api.add_resource(ApiDefinition, '/api/definition/')

if __name__ == '__main__':
    app.run(debug=True)

    