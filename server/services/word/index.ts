import { queryMemoryDao } from "../../utils/dao";
import { listService } from "../../utils/service";
import { Word } from "./model";
import { default as wordsArray } from './db.json';
import { mapJsonToWordArray } from "./utils";

const wordsMemoryDatabase: Array<Word> = mapJsonToWordArray(wordsArray);

export const listWordsService = listService(
  [
    queryMemoryDao(wordsMemoryDatabase)
  ]
);
