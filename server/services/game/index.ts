import { createMemoryDao, queryMemoryDao, updateMemoryDao } from '../../utils/dao';
import { generateRandomIdHook } from '../../utils/hooks';
import { getConnectedSockets } from '../../utils/io';
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
  (result) => {
    getConnectedSockets()
      .filter((socket) => socket._whoami && result._players.includes(socket._whoami))
      .forEach((socket) => socket.emit('game joined', result))
  }
)