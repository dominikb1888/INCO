#!/bin/bash

NAME=$(gh codespace create -R "$1" -m basicLinux32gb)
echo "$NAME"

URL=$(gh codespace ports --json browseUrl -c "$NAME" | jq -r '.[] | .browseUrl')
echo "$URL"

DATA=$(curl -X GET "$URL/openapi.json" --header "Authorization: Bearer $(gh auth token)")
echo "$DATA" | head

