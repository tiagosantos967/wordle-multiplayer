import { mapJsonToWordArray } from "./utils"

describe('word service utils', () => {
  describe('mapJsonToWordArray', () => {
    it('should map string array into words array', () => {
      const result = mapJsonToWordArray(['word1','word2']);
      expect(result[0]).toEqual(
        expect.objectContaining({word: 'word1', length: 5})
      )
      expect(result[1]).toEqual(
        expect.objectContaining({word: 'word2', length: 5})
      )
    })
  })
})