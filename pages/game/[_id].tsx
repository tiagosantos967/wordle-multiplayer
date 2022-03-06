import React, { useEffect } from "react";
import { useGameCookie, useGetGameService } from "../../client/services/game";
import { composeComponents } from "../../client/utils/composeComponents";
import { withGame, withPlayer, withPlayerInGame, withQueryParamsHydrated, withSocketConnection } from "../../client/utils/hocs";

const GamePage:React.FC = () => {
  const { value: gameCookie } = useGameCookie();
  const { get: getGame, result: getGameResult } = useGetGameService();

  useEffect(() => {
    if(gameCookie){
      getGame(gameCookie)
    }
  }, [gameCookie])

  return (
    <>
      <div>Welcome to game {gameCookie}</div>
      <div>{JSON.stringify(getGameResult)}</div>
    </>
  )
}

export default composeComponents(
  withQueryParamsHydrated(),
  withSocketConnection(),
  withGame(),
  withPlayer(),
  withPlayerInGame(),
)(GamePage);


 