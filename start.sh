#!/bin/bash

echo "🎂 Birthday Collection Dashboard"
echo "==============================="
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo
    echo "Please install Node.js from: https://nodejs.org/"
    echo "Or use one of these alternatives:"
    echo
    echo "1. Open index.html directly in your browser"
    echo "2. Use Python: python -m http.server 8000"
    echo "3. Use Python 3: python3 -m http.server 8000"
    echo
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🚀 Starting the server..."
echo
echo "The dashboard will open at: http://localhost:3001"
echo
echo "Press Ctrl+C to stop the server when you're done."
echo

npm start