import { createServer } from "http";
import { Server } from "socket.io";
import { Message } from "./types";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "*", methods: "*" },
});

io.on("connection", (socket) => {
  socket.on("add-message", (message: Message) => {
    io.emit("get-message", message);
  });

  socket.on("delete-message", (id: string) => {
    io.emit("delete-message", { id: id, content: "Message supprimé 😥" });
  });
  socket.on("update-message", (message: any) => {
    io.emit("update-message", { id: message.id, content: message.content });
  });
});

httpServer.listen(3000, () => console.log("Server Port 3000"));
