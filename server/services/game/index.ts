import { createMemoryDao, queryMemoryDao, updateMemoryDao } from '../../utils/dao';
import { updateSelectedSockets } from '../../utils/events';
import { generateRandomIdHook } from '../../utils/hooks';
import { createService, listService, updateService } from '../../utils/service';
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

export const joinGameService = updateService(
  [
    addPlayerToGame(),
    updateMemoryDao(gamesMemoryDatabase)
  ],
  updateSelectedSockets(
    async (result) => result._players,
    'game joined'
  )
)