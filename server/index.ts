import express, { Request, Response, Router } from "express";
import next from "next";
import { Server } from "socket.io";
import { createGameService, listGamesService } from "./services/game";

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

    const r = (): Router => {
      const router = express.Router();

      router.post('/', async (req, res) => {
        const result = await createGameService(req.body);
        res.send(result);
      })

      router.get('/', async (req, res) => {
        const result = await listGamesService({});
        res.send(result);
      })

      return router;
    }  

    server.use('/api/game', r())

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
