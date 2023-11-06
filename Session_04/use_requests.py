import json
import os
import webbrowser

from concurrent.futures import ThreadPoolExecutor

import requests
from dotenv import load_dotenv

load_dotenv()

GH_TOKEN = os.environ.get("GHTOKEN")
GH_USER = 'dominikb1888'
# GH_URL = "https://api.github.com/orgs/DB-Student-Repos/repos?per_page=2000"

def get_commits(repo_urls):
    commit_shas = []
    for repo in repo_urls:
        print(repo)
        response = requests.get(f"{repo}/commits", auth=(GH_TOKEN, GH_USER))
        commits = json.loads(response.text)
        for commit in commits:
            print(commit['sha'])
            commit_shas.append(commit['sha'])


# get first page of GH API
# response = requests.get(GH_URL, auth=(GH_TOKEN,GH_USER))
# print(response.text)
# # load json data as list of dicts
# json_response = json.loads(response.text)
with open("repos.json") as f:
    json_response = json.load(f)

repo_urls = [repo.get('url') for repo in json_response]
print(repo_urls, len(repo_urls))

commits = []
with ThreadPoolExecutor() as executor:
    print(repo_urls)
    commits.append(list(executor.map(get_commits, [repo_urls], chunksize=10)))
