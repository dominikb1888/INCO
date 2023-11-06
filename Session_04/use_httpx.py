import json
import os
import webbrowser

import asyncio
import httpx
from dotenv import load_dotenv

load_dotenv()

GHTOKEN = os.environ.get("GHTOKEN")

GH_USER = 'dominikb1888'.encode('utf-8')
GH_URL = "https://api.github.com/orgs/DB-Student-Repos/repos?per_page=2000"


async def main():
    async with httpx.AsyncClient(auth=(GH_USER, GHTOKEN)) as client:
        response = await client.get(GH_URL)
        print(response)
        # load json data as list of dicts
        json_response = json.loads(response.text)
        repo_urls = [repo['url'] for repo in json_response]
        response = await client.get(get_commits(repo_urls))
        return response

async def get_commits(repo_urls):
    async with httpx.AsyncClient(auth=(GH_USER, GHTOKEN)) as client:
        commit_shas = []
        for repo in repo_urls:
            print(repo)
            response = client.get(f"{repo}/commits")
            commits = json.loads(response.text)
            for commit in commits:
                print(commit['sha'])
                commit_shas.append(commit['sha'])
                repo_urls = [repo.get('url') for repo in json_response]

asyncio.run(main())
