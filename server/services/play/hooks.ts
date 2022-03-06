import { CreateContextHook } from "../../utils/service";
import { getGameService, updateGameService } from "../game";
import { Play } from "./model";

export const updateGameWithPlay = (): CreateContextHook<Play> => async (context) => {
  const game = await getGameService({ _id: context.result?._game })

  if(!game || !context.result) {
    // FIX
    console.log('no game or result', game, context.result)
    return context;
  }

  const updatedGame = await updateGameService(
    { _id: context.result?._game },
    {
      ...game,
      _plays: !game._plays 
        ? [ context.result._id ]
        : [ ...game._plays, context.result._id ]
    }
  )

  if(!updatedGame) {
    // FIX
    console.log('could not update game')
    return context;
  }

  return context;
}