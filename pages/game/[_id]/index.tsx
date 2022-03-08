import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useGameCookie, useGetGameService } from "../../../client/services/game";
import { composeComponents } from "../../../client/utils/composeComponents";
import { withGame, withQueryParamsHydrated, withSocketConnection } from "../../../client/utils/hocs";
import { ServiceCallStatus } from "../../../client/utils/hooks";
import { GameViewPageTemplate } from "../../../components/templates/GameViewPageTemplate";

const GamePage:React.FC = () => {
  const { value: gameCookie } = useGameCookie();
  const { get: getGame, result: getGameResult, callStatus } = useGetGameService();
  const router = useRouter();

  useEffect(() => {
    if(gameCookie){
      getGame(gameCookie)
    }
  }, [gameCookie])

  if([ServiceCallStatus.init, ServiceCallStatus.inProgress].includes(callStatus)){
    return <p>Fetching your game</p>
  }

  if(!gameCookie) {
    return <p>There was an error. Game or Player cookie not set</p>
  }

  if(!getGameResult) {
    return <p>Error fetching your game</p>
  }

  return (
    <GameViewPageTemplate
      qrCodeUrl={`${window.location.origin}/game/${gameCookie}/play`}
      players={getGameResult.players?.map((player) => player.name) || []}
    />
  )
}

export default composeComponents(
  withQueryParamsHydrated(),
  withSocketConnection(),
  withGame(),
)(GamePage);


 