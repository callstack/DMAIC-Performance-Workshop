const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const urlPath = req.url.substring(1);
    if (urlPath.startsWith('db')) {
      const query = urlPath.split('?')[1];

      let dbSize;
      if (!query.startsWith('size=')) {
        dbSize = 'medium';
      }

      const candidate = query.split('=')[1];
      if (['xsmall', 'small', 'medium', 'large'].includes(candidate)) {
        dbSize = candidate;
      }

      const dbPath = path.join(__dirname, `./data/db-${dbSize}.sqlite`);
      const db = fs.readFileSync(dbPath, 'binary');

      res.writeHead(200, {'Content-Type': 'application/octet-stream'});
      res.end(db, 'binary');
    } else {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({message: 'Resource not found'}));
    }
  } else {
    res.writeHead(405, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Method not allowed'}));
  }
});

module.exports = server;
