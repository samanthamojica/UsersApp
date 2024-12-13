#!/bin/bash

SERVICE_NAME="UsersApp"
SERVICE_FILE="/etc/systemd/system/$SERVICE_NAME.service"
LOG_PATH="/home/ec2-user/UsersApp-jar/application.log"

# Step 1: Check if the service exists
if [ -f "$LOG_PATH" ]; then
	rm -f $LOG_PATH
fi

if [ -f "$SERVICE_FILE" ]; then
	echo "$(date '+%Y-%m-%d %H:%M:%S') - $SERVICE_FILE exist. stopping"
    sudo systemctl stop $SERVICE_NAME
    sudo systemctl disable $SERVICE_NAME
    sudo rm -f $SERVICE_FILE
    sudo systemctl daemon-reload
else
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $SERVICE_FILE does not exist. No service to stop."
fi

sleep 5
