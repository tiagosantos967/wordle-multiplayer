import express, { Request, Response } from "express";
import next from "next";
import { RouteMethod, routerGenerator } from "./utils/controller";
import { server, app as expressApp } from "./utils/io";
import { createGameService, getGameService, joinGameService, listGamesService, updateGameService } from "./services/game";
import { createPlayerService, getPlayerService } from "./services/player";
import { getRandomWordService, listWordsService } from "./services/word";
import { createPlayService } from "./services/play";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await app.prepare();

    expressApp.use(express.json());

    expressApp.use('/api/game', routerGenerator(
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
        route: '/:_id',
        method: RouteMethod.get,
        service: async (req, res) => {
          const result = await getGameService({ _id: req.params._id as string });
          res.send(result);
        }
      },
      {
        route: '/:_id',
        method: RouteMethod.patch,
        service: async (req, res) => {
          const result = await updateGameService({ _id: req.params._id as string }, req.body);
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

    expressApp.use('/api/player', routerGenerator(
      {
        route: '/',
        method: RouteMethod.post,
        service: async (req, res) => {
          const result = await createPlayerService(req.body)
          res.send(result)
        }
      },
      {
        route: '/:_id',
        method: RouteMethod.get,
        service: async (req, res) => {
          const result = await getPlayerService({ _id: req.params._id as string });
          res.send(result);
        }
      },
    ))

    expressApp.use('/api/word', routerGenerator(
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

    expressApp.use('/api/play', routerGenerator(
      {
        route: '/',
        method: RouteMethod.post,
        service: async (req, res) => {
          const result = await createPlayService(req.body)
          res.send(result)
        }
      }
    ))

    expressApp.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
