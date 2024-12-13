FILE="/home/ec2-user/tmp"

if [ -d "$FILE" ]; then
  echo "La carperta $FILE existe. Eliminando..."
  rm -rf "$FILE"
  echo "Archivo eliminado."
else
  echo "La carperta $FILE no existe."
fi
mkdir /home/ec2-user/tmp