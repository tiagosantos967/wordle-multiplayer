import { Player } from "../../../server/services/player/model";
import { useCookie } from "../../utils/cookies";
import { useCreateService } from "../../utils/hooks";

export const PLAYER_COOKIE_NAME = 'player';

export const useCreatePlayerService = () => useCreateService<Player>('/api/player');

export const usePlayerCookie = () =>  useCookie(PLAYER_COOKIE_NAME)
