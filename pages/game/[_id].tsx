import { useRouter } from "next/router";
import { composeComponents } from "../../client/utils/composeComponents";
import { withPlayer, withSocketConnection } from "../../client/utils/hocs";

const GamePage:React.FC = () => {
  const router = useRouter();
  const { _id } = router.query;

  return (
    <div>Welcome to game {_id}</div>
  )
}

export default composeComponents(
  withSocketConnection(),
  withPlayer(),
  //withPlayerInGame(),
)(GamePage);