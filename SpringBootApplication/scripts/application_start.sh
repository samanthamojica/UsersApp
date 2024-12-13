#!/bin/bash

# Variables
SERVICE_NAME="UsersApp"
JAR_PATH="/home/ec2-user/UsersApp-jar/UsersApp-0.0.1-SNAPSHOT.jar"
LOG_PATH="/home/ec2-user/UsersApp-jar/application.log"


#GENERICO NO MODIFICAR LO QUE SIGUE
USER="root"  # Adjust if you need a different user
SERVICE_FILE="/etc/systemd/system/$SERVICE_NAME.service"
# Step 1: Check if the service file already exists
if [ -f "$SERVICE_FILE" ]; then
    echo "$SERVICE_FILE already exists. Refreshing the service..."
    # Reload systemd to apply any changes to the service file
    sudo systemctl daemon-reload
    # Restart the service to apply any new changes
    sudo systemctl restart $SERVICE_NAME
else
    echo "$SERVICE_FILE does not exist. Creating a new service..."
    # Create systemd service file
    cat <<EOL | sudo tee $SERVICE_FILE > /dev/null
[Unit]
Description=Gateway Service
After=network.target

[Service]
Type=simple
User=$USER
ExecStart=/usr/bin/java -Dspring.profiles.active=cloud -jar $JAR_PATH *
WorkingDirectory=$(dirname $JAR_PATH)
StandardOutput=append:$LOG_PATH
StandardError=append:$LOG_PATH
TimeoutStartSec=120
TimeoutStopSec=60
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOL

    # Reload systemd to register the new service
    sudo systemctl daemon-reload
    # Enable the service to start on boot
    sudo systemctl enable $SERVICE_NAME
    # Start the service
    sudo systemctl start $SERVICE_NAME
fi

# Step 2: Check the status of the service
echo "Checking the status of $SERVICE_NAME service..."
sudo systemctl status $SERVICE_NAME --no-pager

sleep 20