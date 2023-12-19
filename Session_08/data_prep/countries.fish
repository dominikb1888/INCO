jq '.features .[] .properties | .country ' nobel-prize-laureates.geojson | sort | uniq -c | awk '{print "{\"value\": "$1", \"key\": \""$2"\"}"}' | sed 's/""/"/g' | jq -s > out.json
