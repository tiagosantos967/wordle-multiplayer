import io from "socket.io-client";

const isBrowser = typeof window !== "undefined";

export const socketClient = isBrowser ? io('http://localhost:8080') : null;