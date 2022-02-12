import express, { Request, Response, Router } from "express";
import next from "next";
import { createGameService, joinGameService, listGamesService } from "./services/game";
import { io } from "./utils/io";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await app.prepare();
    const server = express();

    server.use(express.json());

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

      router.patch('/join/:_id', async (req, res) => {
        const result = await joinGameService({ _id: req.params._id as string }, req.body);
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
