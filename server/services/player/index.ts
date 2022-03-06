import { createMemoryDao } from '../../utils/dao';
import { generateRandomIdHook } from '../../utils/hooks';
import { io } from '../../utils/io';
import { CreateContextHook, createService } from '../../utils/service';
import { Player } from './model';

const playersMemoryDatabase: Array<Player> = []; 

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
  async (result) => { io.emit('player created', result) }
)