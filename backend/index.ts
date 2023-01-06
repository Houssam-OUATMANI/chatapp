import { createServer } from "http";
import { Server } from "socket.io";
import { Message, MessageDeletion } from "./types";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "*", methods: "*" },
});

io.on("connection", (socket) => {
  socket.on("add-message", (message: Message) => {
    io.emit("get-message", message);
  });

  socket.on("delete-message", (messageDeletion: MessageDeletion) => {
    io.emit("delete-message", {
      id: messageDeletion.id,
      content: "Message supprimé 😥",
      uuid: messageDeletion.uuid,
    });
  });

  socket.on("update-message", (message: Message) => {
    io.emit("update-message", {
      id: message.id,
      content: message.content,
      uuid: message.uuid,
    });
  });
});

httpServer.listen(3000, () => console.log("Server Port 3000"));
