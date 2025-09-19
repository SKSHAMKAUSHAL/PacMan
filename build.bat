@echo off
echo Building Pac-Man JAR file...

REM Create bin directory if it doesn't exist
if not exist bin mkdir bin

REM Copy image resources to bin directory
copy src\*.png bin\

REM Compile Java files
echo Compiling Java files...
javac -d bin src\*.java

if %errorlevel% neq 0 (
    echo Compilation failed!
    pause
    exit /b 1
)

REM Create JAR file
echo Creating JAR file...
cd bin
jar cfe PacMan.jar App *.class *.png
cd ..

echo.
echo ✅ Build complete! 
echo JAR file created: bin\PacMan.jar
echo.
echo To run the game: java -jar bin\PacMan.jar
pause
