const http = require("http");
const path = require("path");
const authorization = require("./controllers/authController");

const PUBLIC_DIR = path.join(__dirname, "../public/");

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith("/public/") ) {
    const filePath = path.join(PUBLIC_DIR, req.url.replace("/public/", ""));
    const ext = path.extname(filePath);
    const contentType = {
      ".js": "text/javascript",
      ".css": "text/css",
    }[ext] || "text/plain";

    res.writeHead(200, { 'Content-Type': contentType });
    return res.end(data);
  }
  
  if (req.url === "/") {
    authorization.checkJWT(req, res);
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
