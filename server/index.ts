import express, { Request, Response } from "express";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await app.prepare();
    const server = express();

    const httpServer = require('http').createServer(server)
    const io = new Server(httpServer, { cors: { origin: '*' }});

    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
    io.listen(8080);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
