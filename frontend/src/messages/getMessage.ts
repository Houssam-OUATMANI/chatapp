import { Socket } from "socket.io-client";
import { Message } from "../types";
import { generateHtmlOptions } from "../utils";
import { emitMessageAlteration } from "./alterMessage";

export function getMessage(message: Message, socket: Socket) {
    const chatList = document.querySelector<HTMLUListElement>(".chat-box");
    const chatListItem = document.createElement("li");
    const messageContainer = document.createElement("div");
  
    messageContainer.id = `chat-${message.uuid}`;
    messageContainer.textContent = message.content;
    if (message.id === socket.id) {
      messageContainer.classList.add("sender", "bubble", "chat");
      messageContainer.style.backgroundColor = "#394466";
      chatListItem.style.justifyContent = "flex-end";
      messageContainer.innerHTML += generateHtmlOptions()
    } else {
      messageContainer.classList.add("receiver", "bubble");
    }
  
    chatListItem.append(messageContainer);
    chatList?.appendChild(chatListItem);
    const deleteButtons = document.querySelectorAll<HTMLButtonElement>(".delete-btn");
    const updateButtons = document.querySelectorAll<HTMLButtonElement>(".update-btn");
    emitMessageAlteration(deleteButtons, socket, "delete-message");
    emitMessageAlteration(updateButtons, socket, "update-message");
  }