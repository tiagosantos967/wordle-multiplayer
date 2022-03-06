import { listGamesService } from ".";
import { Hook } from "../../utils/compose";
import { CreateContextHook, GetContext, UpdateContext, UpdateContextHook } from "../../utils/service";
import { getPlayService } from "../play";
import { Play } from "../play/model";
import { getPlayerService } from "../player";
import { Player } from "../player/model";
import { getRandomWordService } from "../word";
import { Game } from "./model";

export const createGameWithName = (): CreateContextHook<Game> => async (context) => ({
  ...context,
  data: {
      ...context.data,
      name: 'GameName'
  }
})
  
export const addPlayerToGame = (): UpdateContextHook<Game> => async (context) => {
  const existing = (await listGamesService({_id: context.params.query._id}))?.data[0];

  return {
    ...context,
    data: {
      ...existing,
      _players: [
        ...(existing?._players ? existing._players : []),
        ...(context.data._players ? context.data._players  : [])
      ]
    }
  }
}

export const addWordToGame = (): CreateContextHook<Game> => async (context) => ({
  ...context,
  data: {
    ...context.data,
    _currentWord: (await getRandomWordService({}))?.data[0]._id
  }
})

type PopulatePlayersHook = Hook<GetContext<Game> | UpdateContext<Game>>;

export const populatePlayers = (): PopulatePlayersHook => async (context) => {
  if(!context.result || !context.result?._players) {
    return context;
  }

  if(context.type == 'GET' || context.type == 'UPDATE') {
    return {
      ...context,
      result: {
        ...context.result,
        players: await Promise.all(
          context.result._players.map(async (_player) => await getPlayerService({_id: _player}))
        ) as Array<Player>
      }
    }
  }

  return context
}

type PopulatePlaysHook = Hook<GetContext<Game> | UpdateContext<Game>>;

export const populatePlays = (): PopulatePlaysHook => async (context) => {
  if(!context.result || !context.result?._plays) {
    return context;
  }

  if(context.type == 'GET' || context.type == 'UPDATE') {
    return {
      ...context,
      result: {
        ...context.result,
        plays: await Promise.all(
          context.result._plays.map(async (_play) => await getPlayService({_id: _play}))
        ) as Array<Play>
      }
    }
  }

  return context
}