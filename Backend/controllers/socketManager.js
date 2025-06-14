const { Server } = require("socket.io");

let connections = {};
let message = {};
let timeOnline = {};

const connectToSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["*"],
      credentials: true,
    },
  });
  io.on("connection", (Socket) => {
    Socket.on("join-call", (path) => {
      if (connections[path] === undefined) {
        connections[path] = [];
      }
      connections[path].push(Socket.id);
      timeOnline[Socket.id] = new Date();

      for (let a = 0; a < connections[path].length; a++) {
        io.to(connections[path][a]).emit(
          "user-joined",
          Socket.id,
          connections[path]
        );
      }

      if (message[path] !== undefined) {
        for (let i = 0; i < message[path].length; ++i) {
          io.to(Socket.id).emit(
            "chat-message",
            message[path][i]["data"],
            message[path][i]["sender"],
            message[path][i]["socket-id-sender"]
          );
        }
      }
    });

    Socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", Socket.id, message);
    });

    Socket.on("chat-message", (data, sender) => {
      const [matchingRoom, found] = Object.entries(connections).reduce(
        ([room, isFound], [roomKey, roomValue]) => {
          if (!isFound && roomValue.includes(Socket.id)) {
            return [roomKey, true];
          }

          return [room, isFound];
        },
        ["", false]
      );
      if (found === true) {
        if (message[matchingRoom] === undefined) {
          message[matchingRoom] = [];
        }
        message[matchingRoom].push({
          sender: sender,
          data: data,
          "socket-id-sender": Socket.id,
        });
        console.log("message:", key, ":", sender, data);
        connections[matchingRoom].forEach((element) => {
          io.to(element).emit("chat-message", data, sender, Socket.id);
        });
      }
    });

    Socket.on("disconnect", () => {
      let diffTime = Math.abs(timeOnline[Socket.id] - new Date());

      let key;
      for (const [k, v] of JSON.parse(
        JSON.stringify(Object.entries(connections))
      )) {
        for (let a = 0; a < v.length; a++) {
          if (v[a] === Socket.id) {
            key = k;

            for (let a = 0; a < connections[key].length; ++a) {
              io.to(connections[key][a]).emit("user-left", Socket.id);
            }

            let index = connections[key].indexOf(Socket.id);

            connections[key].splice(index, 1);

            if (connections[key].length === 0) {
              delete connections[key];
            }
          }
        }
      }
    });
  });
  return io;
};

module.exports = connectToSocket;
