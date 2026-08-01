#!/bin/sh
set -e

# If a links.json is mounted at /config/links.json (e.g. via ConfigMap),
# copy it over the built-in default at startup.
if [ -f /config/links.json ]; then
    echo "Using external links.json from /config/links.json"
    cp /config/links.json /usr/share/nginx/html/links.json
else
    echo "Using built-in links.json"
fi

exec "$@"