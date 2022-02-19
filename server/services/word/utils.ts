import { Word } from "./model"

export const mapJsonToWordArray = (wordsArray: Array<string>): Array<Word> => (
  wordsArray.map((word) => ({
    _id: `word_${word}`,
    word,
    length: word.length,
  }))
)
