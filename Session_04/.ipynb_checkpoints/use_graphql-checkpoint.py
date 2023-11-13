import json
import os
import webbrowser

from concurrent.futures import ThreadPoolExecutor

import requests
from dotenv import load_dotenv

load_dotenv()

GH_TOKEN = os.environ.get("GHTOKEN")
GH_USER = 'dominikb1888'
GH_URL = "https://api.github.com/graphql"

with open('query.graphql', 'r') as query_file:
    query = query_file.read()

headers = { 'Content-Type': 'application/json', }
data = { 'query': query }
credentials = (GH_USER, GH_TOKEN)
# Send the POST request to the GraphQL endpoint
response = requests.post(GH_URL, json=data, headers=headers, auth=credentials)

# Check for errors
if response.status_code == 200:
    # If the request was successful, print the JSON response
    print(response.json())
else:
    # If there was an error, print the error message
    print(f"Request failed with status code {response.status_code}:")
    print(response.text)
