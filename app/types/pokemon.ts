import type { PokeAPI } from 'pokeapi-types'

export interface PokemonState {
  pokemonByName: Map<string, PokeAPI.Pokemon>
  pokemonByPage: Map<number, PokeAPI.Pokemon[]>
  totalPokemons: number
}
