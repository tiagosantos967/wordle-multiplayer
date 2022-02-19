import express, { Request, Response } from "express";
import next from "next";
import { RouteMethod, routerGenerator } from "./utils/controller";
import { io } from "./utils/io";
import { createGameService, joinGameService, listGamesService } from "./services/game";
import { createPlayerService } from "./services/player";
import { getRandomWordService, listWordsService } from "./services/word";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await app.prepare();
    const server = express();

    server.use(express.json());

    server.use('/api/game', routerGenerator(
      {
        route: '/',
        method: RouteMethod.post,
        service: async (req, res) => {
          const result = await createGameService(req.body);
          res.send(result);
        }
      },
      {
        route: '/',
        method: RouteMethod.get,
        service: async (req, res) => {
          const result = await listGamesService(req.query);
          res.send(result);
        }
      },
      {
        route: '/join/:_id',
        method: RouteMethod.patch,
        service: async (req, res) => {
          const result = await joinGameService({ _id: req.params._id as string }, req.body);
          res.send(result);
        }
      }
    ))

    server.use('/api/player', routerGenerator(
      {
        route: '/',
        method: RouteMethod.post,
        service: async (req, res) => {
          const result = await createPlayerService(req.body)
          res.send(result)
        }
      }
    ))

    server.use('/api/word', routerGenerator(
      {
        route: '/',
        method: RouteMethod.get,
        service: async (req, res) => {
          const result = await listWordsService(req.query);
          res.send(result);
        }
      },
      {
        route: '/random',
        method: RouteMethod.get,
        service: async (req, res) => {
          const result = await getRandomWordService(req.query);
          res.send(result);
        }
      }
    ))

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
