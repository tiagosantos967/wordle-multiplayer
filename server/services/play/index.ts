import { createMemoryDao, findMemoryDao } from "../../utils/dao";
import { updateSelectedSockets } from "../../utils/events";
import { generateRandomIdHook } from "../../utils/hooks";
import { createService, getService } from "../../utils/service";
import { listGamesService } from "../game";
import { updateGameWithPlay } from "./hooks";
import { Play } from "./model";

const playsMemoryDatabase: Array<Play> = [];

export const createPlayService = createService(
  [
    generateRandomIdHook(),
    createMemoryDao<Play>(playsMemoryDatabase),
    updateGameWithPlay(),
  ],
  updateSelectedSockets(
    async (result) => (await listGamesService({_id: result._game}))?.data[0]?._players,
    'play created'
  )
)

export const getPlayService = getService(
  [
    findMemoryDao<Play>(playsMemoryDatabase),
  ]
)
