const jwt = require("jsonwebtoken");
const secret = "your-secret-key";

function checkJWT(req, res) {
  const token = req.headers["Authorization"];

  if (!token) {
    return res.writeHead(401).end("No token provided");
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.writeHead(401).end("Invalid token");
    }

    // Do something with the decoded data
    console.log(decoded);
    res.writeHead(200).end("You are logged in");
  });
}

function createJWT(req, res) {}

module.exports = {
  checkJWT,
  createJWT,
};
