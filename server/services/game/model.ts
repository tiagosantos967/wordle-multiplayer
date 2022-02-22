
export interface Game {
  _id: string;
  name: string;
  _players: Array<string>;
  _currentWord: string;
}