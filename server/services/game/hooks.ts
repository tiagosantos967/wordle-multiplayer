import { listGamesService } from ".";
import { CreateContextHook, UpdateContextHook } from "../../utils/service";
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