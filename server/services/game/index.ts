import { createMemoryDao, queryMemoryDao } from '../../utils/dao';
import { generateRandomIdHook } from '../../utils/hooks';
import { CreateContextHook, createService, listService } from '../../utils/service';

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

export const createGameService = createService([
  generateRandomIdHook(),
  createGameWithName(),
  createMemoryDao(gamesMemoryDatabase)
])

export const listGamesService = listService([
  queryMemoryDao(gamesMemoryDatabase)
]);