import { createMemoryDao, queryMemoryDao, updateMemoryDao } from '../../utils/dao';
import { generateRandomIdHook } from '../../utils/hooks';
import { CreateContextHook, createService, listService, UpdateContextHook, updateService } from '../../utils/service';

const playersMemoryDatabase: Array<Player> = []; 

interface Player {
  _id: string;
  name: string;
}

const generatePlayerNameIfNone = (): CreateContextHook<Player> => async (context) => ({
  ...context,
  data: {
    ...context.data,
    name: context.data.name || 'random-player-name'
  }
})

export const createPlayerService = createService(
  [
    generateRandomIdHook(),
    generatePlayerNameIfNone(),
    createMemoryDao(playersMemoryDatabase)
  ],
  'player created'
)