const express = require("express");
const { createServer } = require("node:http");

const { Server } = require("socket.io");
const connectToSocket = require("./controllers/socketManager");

const mongoose = require("mongoose");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.set("Port", process.env.PORT || 3000);
const server = createServer(app);
const io = connectToSocket(server);

const ConnectionWithDb = async () => {
  await mongoose
    .connect(
      "mongodb+srv://zoomclone2025:zoomclone2025@yogeshpote.k7nqd1s.mongodb.net/?retryWrites=true&w=majority&appName=YogeshPote"
    )
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};

//Connecting to MongoDB
ConnectionWithDb();

server.listen(app.get("Port"), () => {
  console.log(`Server is running on port ${app.get("Port")}`);
});
