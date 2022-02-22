import { createMemoryDao, queryMemoryDao, updateMemoryDao } from '../../utils/dao';
import { generateRandomIdHook } from '../../utils/hooks';
import { CreateContextHook, createService, listService, UpdateContextHook, updateService } from '../../utils/service';
import { getRandomWordService } from '../word';
import { Game } from './model';

const gamesMemoryDatabase: Array<Game> = []; 

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

export const addWordToGame = (): CreateContextHook<Game> => async (context) => ({
  ...context,
  data: {
    ...context.data,
    _currentWord: (await getRandomWordService({}))?.data[0]._id
  }
})

export const createGameService = createService(
  [
    generateRandomIdHook(),
    createGameWithName(),
    addWordToGame(),
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