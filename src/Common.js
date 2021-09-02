import io, { Socket } from "socket.io-client";

export const live = "https://personal-chat-be.herokuapp.com/";
export const local = "http://localhost:5000/";
export const socket = io.connect(live);
