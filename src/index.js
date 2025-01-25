const http = require("http");
const path = require("path");

const CSS_DIR = path.join(__dirname, "../public/css/");

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/css/") ) {
    const filePath = path.join(SRC_DIR, req.url.replace("/css/", ""));
    const ext = path.extname(filePath);
    const contentType = {
      ".js": "text/javascript",
      ".css": "text/css",
    }[ext] || "text/plain";

    res.writeHead(200, { 'Content-Type': contentType });
    return res.end(data);
  } 
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
