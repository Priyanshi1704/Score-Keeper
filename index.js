const express = require("express");
const { param } = require("express/lib/request");
var app = express();
const path = require("path");
var http = require('http').Server(app);
const port = process.env.PORT || 3000;

var io = require('socket.io')(http);

const staticPath = path.join(__dirname, "/public");

app.use(express.static(staticPath));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

http.listen(port, () => {
    console.log("server listening to port ", port);
});

const {User} = require("./utils/users");
const { isRealString } = require("./utils/isRealString");

let users = new User();

io.on("connection", connection => {
    console.log("A user connected");

    connection.on('disconnect', () => {
        let user = users.removeUser(connection.id);

        if(user){
            console.log(`${user.name} get disconnected from ${user.room}`);

            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        }
    });

    connection.on("join", (params, callBack) => {
        if(!isRealString(params.displayName) || !isRealString(params.roomName))
        {
            callBack("Input fields are invalid")
        }
        else if(users.getUserList(params.roomName).length >= 2)
        {
            callBack("Maximum player limit reached");
        }
        else{
            connection.join(params.roomName);

            users.removeUser(connection.id);

            users.addUser(connection.id, params.displayName, params.roomName);

            io.to(params.roomName).emit('updateUserList', users.getUserList(params.roomName));

            callBack();
        }
    })

    connection.on("message", message => {

        const result = JSON.parse(message);
        
        console.log(result);

        if(result.method === "play")
        {
            const payload = {
                "method": "play",
                "player": result.player
            }

           io.to(result.room).emit("message", payload);
        }

        if(result.method === "reset")
        {
            const payload = {
                "method": "reset"
            }

            io.to(result.room).emit("message", payload);

            // for(const c of Object.keys(clients)){
            //     clients[c].connection.emit("message", payload);
            // }
        }

        if(result.method === "changeScore")
        {
            const payload = {
                "method": "changeScore",
                "value": result.value
            }

            io.to(result.room).emit("message", payload);
        }

        if(result.method === "over")
        {
            const payload = {
                "method": "over"
            }

            io.to(result.room).emit("message", payload);
        }

    });

    const payload = {
        "method": "connect",
        "clientId": connection.id
    }

    connection.emit("message", payload);
});


// functions for creating unique id

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function guid() {
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}
