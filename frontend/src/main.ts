import "./style.css";
import { io } from "socket.io-client";

import { Message } from "./types";
import { getMessage } from "./messages/getMessage";
import { alterMessage } from "./messages/alterMessage";
import { postMessage } from "./messages/postMessage";

const socket = io("http://localhost:3000");

// *** Send Message Chat
const form = document.querySelector<HTMLFormElement>(".form");
form?.addEventListener("submit", (event) => postMessage(event, socket));

// *** Get Message Chat
socket.on("get-message", (message: Message) => {
  getMessage(message, socket);
});

// *** Delete Message
socket.on("delete-message", (message: Message) => {
  alterMessage(message, "delete-message", socket);
});

// *** update Message
socket.on("update-message", (message: Message) => {
  alterMessage(message, "update-message", socket);
});
