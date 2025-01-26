import type { Character } from 'rickmortyapi'

export interface RickAndMortyState {
  characterById: Map<number, Character>
  charactersByPage: Map<number, Character[]>
  totalCharacters: number
  charactersPerPage: number
}
