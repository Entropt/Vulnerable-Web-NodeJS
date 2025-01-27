const path = require("path");
const fs = require("fs");

const homeController = require("../controllers/homeController");
const aboutController = require("../controllers/aboutController");

// Handler for the Home route
function handleHome(req, res) {
  homeController.getHomePage(req, res);
}

// Handler for 404 Not Found
function handleNotFound(req, res) {
  const filePath = path.join(__dirname, "/public/views/404.html");

  fs.readFileSync(filePath, "utf8", (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    }

    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(data);
  });
}

module.exports = {
  handleHome,
  handleNotFound
};
