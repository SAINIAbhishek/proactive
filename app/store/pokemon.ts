import type { PokeAPI } from 'pokeapi-types'
import type { PokemonState } from '~/types/pokemon'
import consola from 'consola'
import { defaultPageNumber } from '~/constants'

/**
 * Store for managing Pokemon data.
 */
export const usePokemonStore = defineStore('pokemon', {
  state: (): PokemonState => ({
    pokemonByName: new Map<string, PokeAPI.Pokemon>(),
    pokemonByPage: new Map<number, PokeAPI.Pokemon[]>(),
    totalPokemons: 0,
  }),

  getters: {

    /**
     * Checks if a pokemon exists in the store by their unique name.
     * @param state - The current store state.
     * @returns True if the pokemon exists, false otherwise.
     */
    hasPokemonWithName: state => (name: string): boolean => {
      return state.pokemonByName.has(name)
    },

    /**
     * Checks if a specific page of pokemons is cached in the store.
     * @param state - The current store state.
     * @returns True if pokemon for the page exist, false otherwise.
     */
    hasPage: state => (page: number): boolean => {
      return state.pokemonByPage.has(page)
    },

    /**
     * Retrieves all pokemons for a given page from the cache.
     * @param state - The current store state.
     * @returns An array of pokemons or undefined if the page doesn't exist.
     */
    getPokemonsByPage: state => (page: number): PokeAPI.Pokemon[] | undefined => {
      return state.pokemonByPage.get(page)
    },

    /**
     * Retrieves a pokemon by their unique name.
     * @param state - The current store state.
     * @returns A pokemon object or undefined if the pokemon doesn't exist.
     */
    getPokemonByName: state => (name: string): PokeAPI.Pokemon | undefined => {
      return state.pokemonByName.get(name)
    },

    /**
     * Retrieves the total number of pokemons available.
     * @param state - The current store state.
     * @returns The total pokemon count.
     */
    getTotalPokemons: (state): number => {
      return state.totalPokemons
    },
  },

  actions: {

    /**
     * Adds or updates a pokemon in the store.
     * @param pokemon - The pokemon object to add or update.
     */
    addPokemon(pokemon: PokeAPI.Pokemon) {
      if (!pokemon?.name) {
        consola.warn('[Pokemon Store] Invalid pokemon object passed to addPokemon.')
        return
      }
      this.pokemonByName.set(pokemon.name, pokemon)
    },

    /**
     * Add a list of pokemon to the store, grouped by page.
     * @param pokemonList - The list of pokemon to add.
     * @param namesOnPage - The list of pokemon names for the page.
     * @param page - The page number to group the pokemon under (default: defaultPageNumber).
     */
    addPokemonList(pokemonList: PokeAPI.Pokemon[], namesOnPage: string[], page = defaultPageNumber) {
      if (page < defaultPageNumber) {
        consola.error('[Pokemon Store] Invalid page number: ', page)
        return
      }

      if (!pokemonList?.length) {
        consola.warn('[Pokemon Store] Empty pokemon list passed to addPokemonList.')
        return
      }

      if (this.pokemonByPage.has(page)) {
        consola.warn(`[Pokemon Store] Page ${page} already exists.`)
        return
      }

      /**
       * Add characters to the store
       */
      pokemonList.forEach(pokemon => this.addPokemon(pokemon))

      /**
       * Add pokemon list to the page map
       */
      this.pokemonByPage.set(page, pokemonList)
    },

    /**
     * Update the total number of characters.
     * @param totalPokemons - The new total character count.
     */
    updateTotalPokemons(totalPokemons: number) {
      if (totalPokemons > 0) {
        this.totalPokemons = totalPokemons
      }
      else {
        consola.warn('[Pokemon Store] Invalid totalPokemons value passed.')
      }
    },

    /**
     * Clear all pokemon and page data from the store
     */
    clearStore() {
      this.pokemonByName.clear()
      this.pokemonByPage.clear()
      this.totalPokemons = 0
    },
  },
})
