import { createMemoryDao, findMemoryDao, queryMemoryDao, updateMemoryDao } from '../../utils/dao';
import { updateSelectedSockets } from '../../utils/events';
import { generateRandomIdHook } from '../../utils/hooks';
import { createService, getService, listService, updateService } from '../../utils/service';
import { addPlayerToGame, addWordToGame, createGameWithName } from './hooks';
import { Game } from './model';

const gamesMemoryDatabase: Array<Game> = []; 

export const createGameService = createService(
  [
    generateRandomIdHook(),
    createGameWithName(),
    addWordToGame(),
    createMemoryDao(gamesMemoryDatabase)
  ]
)

export const listGamesService = listService(
  [
    queryMemoryDao(gamesMemoryDatabase)
  ]
);

export const getGameService = getService(
  [
    findMemoryDao(gamesMemoryDatabase)
  ]
);

export const updateGameService = updateService(
  [
    updateMemoryDao(gamesMemoryDatabase)
  ],
  updateSelectedSockets(
    async (result) => result._players,
    'game updated'
  )
)

export const joinGameService = updateService(
  [
    addPlayerToGame(),
    updateMemoryDao(gamesMemoryDatabase)
  ],
  updateSelectedSockets(
    async (result) => result._players,
    'game updated'
  )
)