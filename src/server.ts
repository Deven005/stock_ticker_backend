import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

// main file | entry level file

const app = express();
const server = createServer(app);
const io = new Server(server, {});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Greetings of the day!");
});

// this will be called after socket.io client connection with server
io.on("connection", (socket) => {
  console.log("A user connected");

  // Generate and send a random number to the client Flutter with socket.io client every 2 second
  setInterval(() => {
    const randomNumber = Math.floor(Math.random() * 10000) + 1;
    socket.emit("randomNumber", randomNumber);
  }, 2000);

  // called when user is disconnected
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;

// server is running and waiting for api call with specific port
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
