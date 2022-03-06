import { Play } from "../play/model";
import { Player } from "../player/model";

export interface Game {
  _id: string;
  name: string;
  _players?: Array<string>;
  _currentWord: string;
  _plays?: Array<string>;
  plays?: Array<Play>;
  players?: Array<Player>;
}