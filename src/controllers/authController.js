const jwt = require("jsonwebtoken");
const secret = "your-secret-key";

function checkJWT(req, res) {
  const token = req.headers["Authorization"];

  if (!token) {
    return 0;
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return 0;
    }

    return 1;
  });
}

function createJWT(req, res) {}

module.exports = {
  checkJWT,
  createJWT,
};
