import { Socket } from "socket.io-client";
import { v4 } from "uuid";
import { Message } from "../types";

export function postMessage(event: SubmitEvent, socket: Socket) {
    event.preventDefault();
    const input = document.querySelector<HTMLInputElement>(".form input")!;
    const message: Message = { id: socket.id, content: input.value, uuid: v4() };
    socket.emit("add-message", message);
    (<HTMLFormElement>event.target).reset();
  }