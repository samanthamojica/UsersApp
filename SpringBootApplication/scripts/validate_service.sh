#!/bin/bash
# Check if http-server is running by pinging localhost on the defined port
curl -Ik https://localhost:4431/users-app-services/actuator/health | grep "200"
if [ $? -ne 0 ]; then
    echo "http-server is not running."
    exit 1
else
    echo "http-server is running."
fi
