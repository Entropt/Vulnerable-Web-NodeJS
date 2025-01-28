const path = require("path");
const fs = require("fs");

const homeController = require("../controllers/homeController");
const authController = require("../controllers/authController");

// Handler for the Home route
function handleHome(req, res) {
  homeController.getHomePage(req, res);
}

function handleAuth(req, res) {
  authController.checkJWT(req, res);
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
  handleAuth,
  handleNotFound
};
