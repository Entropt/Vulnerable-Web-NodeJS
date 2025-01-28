const http = require("http");
const path = require("path");
const { handleHome, handleAuth, handleNotFound } = require("./routes");

const PUBLIC_DIR = path.join(__dirname, "../public/");

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith("/public/")) {
    const filePath = path.join(PUBLIC_DIR, req.url.replace("/public/", ""));
    const ext = path.extname(filePath);
    try {
      const data = await fs.readFile(filePath); // fs.readFile is not defined
      const contentType =
        {
          ".js": "text/javascript",
          ".css": "text/css",
        }[ext] || "text/plain";

      res.writeHead(200, { "Content-Type": contentType });
      return res.end(data);
    } catch (err) {
      handleNotFound(req, res);
    }
  }

  if (req.url === "/") {
    handleAuth(req, res);
  }

  if (req.url === "/login") {
    const filePath = path.join(PUBLIC_DIR, "views/login.html");
    const data = await fs.readFile(filePath);

    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end(data);
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
