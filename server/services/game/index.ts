import { createMemoryDao, findMemoryDao, queryMemoryDao, updateMemoryDao } from '../../utils/dao';
import { updateSelectedSockets } from '../../utils/events';
import { generateRandomIdHook } from '../../utils/hooks';
import { createService, GetContextHook, getService, listService, UpdateContextHook, updateService } from '../../utils/service';
import { addPlayerToGame, addWordToGame, createGameWithName, populatePlayers, populatePlays } from './hooks';
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
    findMemoryDao(gamesMemoryDatabase),
    populatePlayers() as GetContextHook<Game>,
    populatePlays() as GetContextHook<Game>,
  ]
);

export const updateGameService = updateService(
  [
    updateMemoryDao(gamesMemoryDatabase),
    populatePlayers() as UpdateContextHook<Game>,
    populatePlays() as UpdateContextHook<Game>,
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