FILE="/home/ec2-user/UsersApp-jar"

if [ -d "$FILE" ]; then
  echo "La carperta $FILE existe. Eliminando..."
  rm -rf "$FILE"
  echo "Archivo eliminado."
else
  echo "La carperta $FILE no existe."
fi
mkdir "$FILE"
mv /home/ec2-user/tmp/UsersApp-0.0.1-SNAPSHOT.jar /home/ec2-user/UsersApp-jar/UsersApp-0.0.1-SNAPSHOT.jar