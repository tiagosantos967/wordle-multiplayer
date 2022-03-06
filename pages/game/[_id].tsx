import { useRouter } from "next/router";
import React from "react";
import { composeComponents } from "../../client/utils/composeComponents";
import { withGame, withPlayer, withQueryParamsHydrated, withSocketConnection } from "../../client/utils/hocs";

const GamePage:React.FC = () => {
  const router = useRouter();
  const { _id } = router.query;

  return (
    <div>Welcome to game {_id}</div>
  )
}

export default composeComponents(
  withQueryParamsHydrated(),
  withSocketConnection(),
  withGame(),
  withPlayer(),
  //withPlayerInGame()
)(GamePage);


 