if [ -d "/var/www/html/users-app-ui" ]; then
    rm -rf "/var/www/html/users-app-ui"
    echo "Directory deleted."
else
    echo "Directory does not exist."
fi
mv /var/www/temp /var/www/html/users-app-ui/