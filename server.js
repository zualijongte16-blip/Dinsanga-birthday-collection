const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = process.env.PORT || 3001;

process.title = 'birthday-server'; // Set process title for easier management

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.m4a': 'audio/mp4'
};

const server = http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname;
  
  // Default to index.html for root path
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  // Decode the URL to handle spaces and special characters in filenames
  pathname = decodeURIComponent(pathname);
  
  const filePath = path.join(__dirname, pathname);
  const ext = path.extname(filePath).toLowerCase();
  const mimeType = mimeTypes[ext] || 'application/octet-stream';
  
  // Security check - only allow files from current directory
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*'
    });
    res.end('403 Forbidden');
    return;
  }
  
  // Handle pre-flight CORS requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Range',
      'Access-Control-Max-Age': '86400'
    });
    res.end();
    return;
  }
  
  // Check if file exists and get its size
  fs.stat(filePath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404, { 
          'Content-Type': 'text/html',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>404 - Not Found</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  text-align: center;
                  padding: 50px;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white;
                }
                .error-container {
                  background: rgba(255, 255, 255, 0.1);
                  padding: 40px;
                  border-radius: 20px;
                  display: inline-block;
                }
              </style>
            </head>
            <body>
              <div class="error-container">
                <h1>404 - Page Not Found</h1>
                <p>The requested file could not be found.</p>
                <p><a href="/index.html" style="color: #ff6b9d;">← Back to Birthday Collection</a></p>
              </div>
            </body>
          </html>
        `);
        return;
      }
      
      // Server error
      res.writeHead(500, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
      });
      res.end('500 Internal Server Error');
      return;
    }
    
    const fileSize = stats.size;
    const range = req.headers.range;
    
    if (range) {
      // Handle range requests (streaming)
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = (end - start) + 1;
      
      const stream = fs.createReadStream(filePath, { start, end });
      
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': mimeType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      });
      
      stream.pipe(res);
    } else {
      // Handle normal requests
      const stream = fs.createReadStream(filePath);
      
      res.writeHead(200, {
        'Content-Type': mimeType,
        'Content-Length': fileSize,
        'Accept-Ranges': 'bytes',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache'
      });
      
      stream.pipe(res);
    }
  });
});

server.listen(port, () => {
  console.log(`🎂 Birthday Collection Dashboard is running!`);
  console.log(`📱 Open your browser and go to: http://localhost:${port}`);
  console.log(`💖 Happy Birthday to your loved one!`);
});

// Handle server shutdown gracefully
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down the server...');
  server.close(() => {
    console.log('✅ Server closed successfully!');
    process.exit(0);
  });
});