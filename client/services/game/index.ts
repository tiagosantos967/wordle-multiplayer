import { Game } from "../../../server/services/game/model";
import { useCreateService } from "../../utils/hooks";

export const useCreateGameService = () => useCreateService<Game>('/api/game');
