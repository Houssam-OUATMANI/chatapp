import { Socket } from "socket.io-client";
import { Message } from "../types";
import { generateHtmlOptions } from "../utils";

export function alterMessage(
  message: Message,
  emitType: string,
  socket: Socket
) {
  const messageContainer = document.querySelector<HTMLDivElement>(
    `#${message.uuid}`
  )!;
  messageContainer.textContent = message.content;
  if (emitType === "update-message") {
  
    socket.id === message.id && (messageContainer.innerHTML += generateHtmlOptions());
    const updateButtons =
      document.querySelectorAll<HTMLButtonElement>(".update-btn");
    const deleteButtons =
      document.querySelectorAll<HTMLButtonElement>(".delete-btn");
    emitMessageAlteration(updateButtons, socket, emitType);
    emitMessageAlteration(deleteButtons, socket, "delete-message");
  }
}

export function emitMessageAlteration(
  buttons: NodeListOf<HTMLButtonElement>,
  socket: Socket,
  emitType: string
) {
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const uuid = (<HTMLButtonElement>event.target).closest(".bubble")?.id;
      if (emitType === "delete-message") {
        socket.emit(emitType, {uuid, id: socket.id});
      } else {
        const content = prompt("Modifier le message");
        content?.trim() && socket.emit(emitType, { id : socket.id ,uuid, content });
      }
    });
  });
}
