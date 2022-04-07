const express = require("express");
const socket = require("socket.io");
const cors = require("cors");
const app = express();
const path = require("path");
app.use(express.static("public"));
app.use(
  cors({
    origin: "*",
  })
);
app.use("/", express.static(path.join(__dirname, "public")));

const server = app.listen(process.env.PORT || 8080, function () {
  console.log("Listening on port 8080");
});

const io = socket(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("made socket connection", socket.id);

  socket.on("message", (data) => {
    io.sockets.emit("message", data);
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });

  socket.on("disconnect", (socket) => {
    console.log("disconnected", socket.id);
  });
});
