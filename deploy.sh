#!/bin/bash

# Define source and destination
SOURCE="./backend"
DEST="/c/xampp/htdocs"

# 1. Check if the source folder exists
if [ -d "$SOURCE" ]; then
    echo "Copying $SOURCE to $DEST..."
    
    cp -r "$SOURCE" "$DEST"
    
    echo "Done! Your backend is now at $DEST/backend"
else
    echo "Error: $SOURCE folder not found!"
    exit 1
fi