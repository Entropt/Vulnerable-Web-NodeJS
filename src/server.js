const http = require("http");
const path = require("path");
const { handleHome, handleAuth, handleLogin, handleNotFound } = require("./routes");

const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    handleAuth(req, res);
  }

  if (req.url === "/login") {
    handleLogin(req, res);
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
