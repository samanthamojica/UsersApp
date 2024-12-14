if [ -d "/var/www/temp" ]; then
    rm -rf "/var/www/temp"
    echo "Directory deleted."
else
    echo "Directory does not exist."
fi
mkdir /var/www/temp