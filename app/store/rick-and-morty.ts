import type { Character } from 'rickmortyapi'
import type { RickAndMortyState } from '~/types/rickAndMorty'
import { consola } from 'consola'
import { defaultPageNumber } from '~/constants'

/**
 * Store for managing Rick and Morty character data.
 */
export const useRickAndMortyStore = defineStore('rick-and-morty', {
  state: (): RickAndMortyState => ({
    characterById: new Map<number, Character>(),
    charactersByPage: new Map<number, Character[]>(),
    totalCharacters: 0,
    charactersPerPage: 0,
  }),

  getters: {
    /**
     * Checks if a character exists in the store by their unique id.
     * @param state - The current store state.
     * @returns True if the character exists, false otherwise.
     */
    hasCharacterWithId: state => (id: number): boolean => {
      return state.characterById.has(id)
    },

    /**
     * Checks if a specific page of characters is cached in the store.
     * @param state - The current store state.
     * @returns True if characters for the page exist, false otherwise.
     */
    hasPage: state => (page: number): boolean => {
      return state.charactersByPage.has(page)
    },

    /**
     * Retrieves all characters for a given page from the cache.
     * @param state - The current store state.
     * @returns An array of characters or undefined if the page doesn't exist.
     */
    getCharactersByPage: state => (page: number): Character[] | undefined => {
      return state.charactersByPage.get(page)
    },

    /**
     * Retrieves a character by their unique id.
     * @param state - The current store state.
     * @returns A character object or undefined if the character doesn't exist.
     */
    getCharacterById: state => (id: number): Character | undefined => {
      return state.characterById.get(id)
    },

    /**
     * Retrieves the total number of characters available.
     * @param state - The current store state.
     * @returns The total character count.
     */
    getTotalCharacters: (state): number => {
      return state.totalCharacters
    },

    /**
     * Retrieves the number of characters available per page.
     * @param state - The current store state.
     * @returns The total characters per page.
     */
    getCharactersPerPage: (state): number => {
      return state.charactersPerPage
    },
  },

  actions: {

    /**
     * Add or update a character in the store.
     * @param character - The character object to add or update.
     */
    addCharacter(character: Character) {
      if (!character?.id) {
        consola.warn('[Rick and Morty Store] Invalid character object passed to addCharacter.')
        return
      }
      this.characterById.set(character.id, character)
    },

    /**
     * Add a list of characters to the store, grouped by page.
     * @param characterList - The list of characters to add.
     * @param page - The page number to group the characters under (default: defaultPageNumber).
     */
    addCharacterList(characterList: Character[], page = defaultPageNumber) {
      if (page < defaultPageNumber) {
        consola.error('[Rick and Morty Store] Invalid page number: ', page)
        return
      }

      if (!characterList?.length) {
        consola.warn('[Rick and Morty Store] Empty character list passed to addCharacterList.')
        return
      }

      if (this.charactersByPage.has(page)) {
        consola.warn(`[Rick and Morty Store] Page ${page} already exists.`)
        return
      }

      /**
       * Add characters to the store
       */
      characterList.forEach(character => this.addCharacter(character))

      /**
       * Add character list to the page map
       */
      this.charactersByPage.set(page, characterList)
    },

    /**
     * Update the total number of characters and per page characters.
     * @param totalCharacters - The new total character count.
     * @param pages - The new total character count.
     */
    updateCharactersStats(totalCharacters: number, pages: number) {
      if (totalCharacters > 0 && pages > 0) {
        this.totalCharacters = totalCharacters
        this.charactersPerPage = Math.ceil(totalCharacters / pages)
      }
      else {
        consola.warn('[Rick and Morty Store] Invalid totalCharacters or pages value passed.')
      }
    },

    /**
     * Clear all character and page data from the store
     */
    clearStore() {
      this.characterById.clear()
      this.charactersByPage.clear()
      this.totalCharacters = 0
    },
  },
})
