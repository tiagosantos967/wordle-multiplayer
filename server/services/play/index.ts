import { createMemoryDao } from "../../utils/dao";
import { updateSelectedSockets } from "../../utils/events";
import { generateRandomIdHook } from "../../utils/hooks";
import { createService } from "../../utils/service";
import { listGamesService } from "../game";
import { Play } from "./model";

const playsMemoryDatabase: Array<Play> = [];

export const createPlayService = createService(
  [
    generateRandomIdHook(),
    createMemoryDao<Play>(playsMemoryDatabase)
  ],
  updateSelectedSockets(
    async (result) => (await listGamesService({_id: result._game}))?.data[0]?._players,
    'play created'
  )
)