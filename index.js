import http from "http";

const server = http.createServer((req, res) => {
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});