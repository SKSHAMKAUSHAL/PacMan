#!/bin/bash

# Create bin directory if it doesn't exist
mkdir -p bin

# Copy image resources to bin directory
cp src/*.png bin/

# Compile Java files
echo "Compiling Java files..."
javac -d bin src/*.java

# Check if compilation was successful
if [ $? -eq 0 ]; then
    echo "Compilation successful. Starting Pac-Man game..."
    # Run the main App class
    java -cp bin App
else
    echo "Compilation failed!"
    exit 1
fi
