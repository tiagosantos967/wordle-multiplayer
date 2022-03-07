import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useGameCookie, useGetGameService } from "../../../client/services/game";
import { composeComponents } from "../../../client/utils/composeComponents";
import { withGame, withQueryParamsHydrated, withSocketConnection } from "../../../client/utils/hocs";

const GamePage:React.FC = () => {
  const { value: gameCookie } = useGameCookie();
  const { get: getGame, result: getGameResult } = useGetGameService();
  const router = useRouter();

  useEffect(() => {
    if(gameCookie){
      getGame(gameCookie)
    }
  }, [gameCookie])

  if(!gameCookie) {
    return <p>There was an error. Game or Player cookie not set</p>
  }

  return (
    <>
      <div>You are viewing game {gameCookie}</div>
      <div>{JSON.stringify(getGameResult)}</div>
      <br/>
      <button 
        onClick={() => {
          router.push(`/game/${gameCookie}/play`) // FIX
        }}
      >
        Play
      </button>
    </>
  )
}

export default composeComponents(
  withQueryParamsHydrated(),
  withSocketConnection(),
  withGame(),
)(GamePage);


 