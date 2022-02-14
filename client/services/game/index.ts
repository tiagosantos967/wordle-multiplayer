import { Game } from "../../../server/services/game/model";
import { useCookie } from "../../utils/cookies";
import { useCreateService } from "../../utils/hooks";

export const GAME_COOKIE_NAME = 'game';

export const useCreateGameService = () => useCreateService<Game>('/api/game');

export const useGameCookie = () =>  useCookie(GAME_COOKIE_NAME)
