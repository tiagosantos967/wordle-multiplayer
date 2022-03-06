import { useRouter } from "next/router";
import React from "react";
import { useGameCookie } from "../../client/services/game";
import { composeComponents } from "../../client/utils/composeComponents";
import { withGame, withPlayer, withPlayerInGame, withQueryParamsHydrated, withSocketConnection } from "../../client/utils/hocs";
import { useSocket } from "../../client/utils/useSocket";

const GamePage:React.FC = () => {
  const { value: gameCookie } = useGameCookie();
  
  useSocket(['game updated', (data) => console.log('game updated event with', data)])

  return (
    <div>Welcome to game {gameCookie}</div>
  )
}

export default composeComponents(
  withQueryParamsHydrated(),
  withSocketConnection(),
  withGame(),
  withPlayer(),
  withPlayerInGame(),
)(GamePage);


 