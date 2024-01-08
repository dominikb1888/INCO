set NAME (gh codespace create  -R $argv[1] -m basicLinux32gb)
echo $NAME
set URL (gh codespace ports --json browseUrl -c $NAME | jq -r '.[] | .browseUrl')
echo $URL
set DATA (curl -V $URL/openapi.json --header "X-Github-Token: $(gh auth token)")
head $DATA
