# Pac-Man Game Deployment Guide

## 🎮 About This Game
This is a Java Swing-based Pac-Man game that runs as a desktop application.

## 🚀 How to Build and Run

### Option 1: Build JAR File (Windows)
1. Run `build.bat` to compile and create a JAR file
2. The JAR file will be created at `bin/PacMan.jar`
3. Run with: `java -jar bin/PacMan.jar`

### Option 2: Compile and Run Directly
1. Compile: `javac -d bin src/*.java`
2. Copy images: `copy src/*.png bin/`
3. Run: `java -cp bin App`

## 📦 Distribution Options

### GitHub Releases
1. Build the JAR file using `build.bat`
2. Create a new release on GitHub
3. Upload `bin/PacMan.jar` as a release asset
4. Users can download and run with `java -jar PacMan.jar`

### itch.io
1. Build the JAR file
2. Create a zip with the JAR and a README
3. Upload to itch.io as a downloadable game

## ⚠️ Why Railway Doesn't Work
- Railway is for server applications (web APIs, backends)
- This game uses Java Swing (JFrame) which requires a desktop environment
- Railway servers don't have GUI/display capabilities

## 🌐 Web Deployment Alternative
To deploy online, you'd need to rewrite the game using:
- HTML5 Canvas + JavaScript
- A web framework like Spring Boot with a web frontend
- WebAssembly (advanced)

## 🎯 Recommended Approach
**For sharing your game**: Use GitHub Releases or itch.io to distribute the JAR file.
**For web deployment**: Consider rewriting as an HTML5/JavaScript game.
