import { createMemoryDao, queryMemoryDao, updateMemoryDao } from '../../utils/dao';
import { generateRandomIdHook } from '../../utils/hooks';
import { CreateContextHook, createService, listService, UpdateContextHook, updateService } from '../../utils/service';

const gamesMemoryDatabase: Array<Game> = []; 

interface Game {
  _id: string;
  name: string;
  _players: Array<string>;
}

const createGameWithName = (): CreateContextHook<Game> => async (context) => ({
  ...context,
  data: {
    ...context.data,
    name: 'GameName'
  }
})

const addPlayerToGame = (): UpdateContextHook<Game> => async (context) => {
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

export const createGameService = createService(
  [
    generateRandomIdHook(),
    createGameWithName(),
    createMemoryDao(gamesMemoryDatabase)
  ],
  'game created'
)

export const listGamesService = listService(
  [
    queryMemoryDao(gamesMemoryDatabase)
  ]
);

export const joinGameService = updateService(
  [
    addPlayerToGame(),
    updateMemoryDao(gamesMemoryDatabase)
  ],
  'game joined'
)