const fs = require("fs");
const path = require("path");

async function getLoginPage(req, res) {
  const filePath = path.join(__dirname, "/../../public/views/login.html");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}

module.exports = { getLoginPage };
