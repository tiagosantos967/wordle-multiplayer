import { Game } from "../../../server/services/game/model";
import { useCookie } from "../../utils/cookies";
import {
  useCreateService,
  useGetService,
  useListService,
  useUpdateService
} from "../../utils/hooks";

export const GAME_COOKIE_NAME = 'game';

export const useCreateGameService = () => useCreateService<Game>('/api/game');
export const useListGameService = () => useListService<Game>('/api/game');
export const useGetGameService = () => useGetService<Game>('/api/game', 'game updated');
export const useUpdateGameService = () => useUpdateService<Game>('/api/game');
export const useJoinGameService = () => useUpdateService<Game>('/api/game/join');

export const useGameCookie = () =>  useCookie(GAME_COOKIE_NAME)
