import type { Character } from 'rickmortyapi'
import type { Item } from '~/types/item'
import { ViewModeEnum, type ViewModeType } from '~/types/viewMode'

/**
 * Transform Rick and Morty characters list into custom item list for display.
 * @param characters - Array of characters from the API.
 * @param view - The current view mode (List or Grid).
 * @returns A list of `Item` objects.
 */
export function getRickAndMortyItems(
  characters: Character[],
  view: ViewModeType = ViewModeEnum.LIST,
): Item[] {
  return characters.map((character) => {
    const item: Item = {
      url: { name: 'rick-and-morty-id', params: { id: character.id } },
      title: character.name.charAt(0).toUpperCase() + character.name.slice(1),
      id: character.id,
      image: character.image,
    }

    if (view === ViewModeEnum.GRID) {
      item.description = `Status: ${character.status}, Species: ${character.species}, Type: ${character.type || 'N/A'}, Gender: ${character.gender}`
    }

    return item
  })
}
