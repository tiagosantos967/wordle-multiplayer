import { Game } from "../../../server/services/game/model";
import { useCookie } from "../../utils/cookies";
import { useCreateService, useListService } from "../../utils/hooks";

export const GAME_COOKIE_NAME = 'game';

export const useCreateGameService = () => useCreateService<Game>('/api/game');
export const useListGameService = () => useListService<Game>('/api/game');

export const useGameCookie = () =>  useCookie(GAME_COOKIE_NAME)
