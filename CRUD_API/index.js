import http from "http"


const server = http.createServer();

server.on("request", (req, res) => console.log(1));

server.listen(8080);
console.log("listening...")