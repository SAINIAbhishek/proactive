import type { PokeAPI } from 'pokeapi-types'
import type { Item } from '~/types/item'
import { ViewModeEnum, type ViewModeType } from '~/types/viewMode'

/**
 * Transform Pokemons list into custom item list for display.
 * @param pokemons - Array of pokemons from the API.
 * @param view - The current view mode (List or Grid).
 * @returns A list of `Item` objects.
 */
export function getPokemonItems(
  pokemons: PokeAPI.Pokemon[],
  view: ViewModeType = ViewModeEnum.LIST,
): Item[] {
  return pokemons.map((pokemon) => {
    const item: Item = {
      url: { name: 'pokemon-name', params: { name: pokemon.name } },
      title: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
      id: pokemon.id,
      image: getPokemonImage(pokemon) ?? '',
    }

    if (view === ViewModeEnum.GRID) {
      item.description = `Types: ${pokemon.types.map(type => type.type.name).join(', ')}`
    }

    return item
  })
}

/**
 * Get the image URL for a given pokemon.
 * @param pokemon - the pokemon object
 * @returns A string representing the URL of the pokemon image.
 */
export function getPokemonImage(pokemon: PokeAPI.Pokemon): string {
  return pokemon.sprites.other?.dream_world?.front_default
    ?? pokemon.sprites.other?.home?.front_default
    ?? pokemon.sprites.front_default
}
