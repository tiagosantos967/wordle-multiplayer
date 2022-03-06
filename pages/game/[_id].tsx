import React, { useEffect } from "react";
import { useGameCookie, useGetGameService } from "../../client/services/game";
import { useCreatePlayService } from "../../client/services/play";
import { usePlayerCookie } from "../../client/services/player";
import { composeComponents } from "../../client/utils/composeComponents";
import { withGame, withPlayer, withPlayerInGame, withQueryParamsHydrated, withSocketConnection } from "../../client/utils/hocs";

const GamePage:React.FC = () => {
  const { value: gameCookie } = useGameCookie();
  const { value: playerCookie } = usePlayerCookie();
  const { get: getGame, result: getGameResult } = useGetGameService();
  const { data: createPlay } = useCreatePlayService();

  useEffect(() => {
    if(gameCookie){
      getGame(gameCookie)
    }
  }, [gameCookie])

  if(!gameCookie || !playerCookie) {
    return <p>There was an error. Game or Player cookie not set</p>
  }

  return (
    <>
      <div>Welcome to game {gameCookie}</div>
      <div>{JSON.stringify(getGameResult)}</div>
      <br/>
      <button 
        onClick={() => createPlay({
          _game: gameCookie,
          _player: playerCookie,
          text: 'random-text'
        })}
      >
        Create Play
      </button>
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


 