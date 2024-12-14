#!/bin/bash
# Check if http-server is running by pinging localhost on the defined port
curl -I http://localhost:80/users-app-ui/users | grep "200 OK"
if [ $? -ne 0 ]; then
    echo "http-server is not running."
    exit 1
else
    echo "http-server is running."
fi
