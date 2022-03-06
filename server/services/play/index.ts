import { createMemoryDao } from "../../utils/dao";
import { generateRandomIdHook } from "../../utils/hooks";
import { getConnectedSockets, io } from "../../utils/io";
import { createService } from "../../utils/service";
import { listGamesService } from "../game";
import { Play } from "./model";

const playsMemoryDatabase: Array<Play> = [];

export const createPlayService = createService(
  [
    generateRandomIdHook(),
    createMemoryDao<Play>(playsMemoryDatabase)
  ],
  async (result) => {
    (await listGamesService({_id: result._game}))
      ?.data[0]
      ?._players
      ?.map((_player) => getConnectedSockets().find((socket) => socket._whoami == _player))
      .forEach((socket) => socket?.emit('play created', result))
  }
)
