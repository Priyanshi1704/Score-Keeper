const http = require("http");
const express = require("express");
const path = require("path");
const app = express();

const websocketServer = require("websocket").server

const staticPath = path.join(__dirname, "../public");

app.use(express.static(staticPath));

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/public/index.html");
});

app.listen(8080, ()=>console.log("listening to port 8080"));


const httpServer = http.createServer();
httpServer.listen(9090, () => {
    console.log("server listening to port 9090");
});

const wsServer = new websocketServer({
    "httpServer": httpServer
});
