@echo off
echo 🎂 Birthday Collection Dashboard
echo ===============================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Or use one of these alternatives:
    echo.
    echo 1. Double-click index.html to open directly in browser
    echo 2. Use Python: python -m http.server 8000
    echo.
    pause
    exit /b 1
)

REM Check if dependencies are installed
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies!
        pause
        exit /b 1
    )
)

echo 🚀 Starting the server...
echo.
echo The dashboard will open at: http://localhost:3001
echo.
echo Press Ctrl+C to stop the server when you're done.
echo.

npm start