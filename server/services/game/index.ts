import { createMemoryDao, queryMemoryDao, updateMemoryDao } from '../../utils/dao';
import { generateRandomIdHook } from '../../utils/hooks';
import { io } from '../../utils/io';
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
  ],
  (result) => io.emit('game created', result)
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
  (result) => io.emit('game joined', result)
)