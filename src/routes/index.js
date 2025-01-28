const path = require("path");
const fs = require("fs");

const homeController = require("../controllers/homeController");
const authController = require("../controllers/authController");
const loginController = require("../controllers/loginController");
const PUBLIC_DIR = path.join(__dirname, "../public/");


async function handlePublic(req, res) {
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
}

// Handler for the Home route
function handleHome(req, res) {
  homeController.getHomePage(req, res);
}

function handleAuth(req, res) {
  if (authController.checkJWT(req, res) === 0) {
    res.writeHead(301, { 'Location': '/login' });
    res.end();
  }
}

function handleLogin(req, res) {
  loginController.getLoginPage(req, res);
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
  handleLogin,
  handleNotFound
};
