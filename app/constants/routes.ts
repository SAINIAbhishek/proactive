import type { Route } from '~/types/route'
import { pokemonsPageLimit } from '.'

export const headerNavLinks: Route[] = [
  { to: '/rick-and-morty', label: 'Rick and Morty', page: 1 },
  { to: '/pokemon', label: 'Pokémon', page: 1, limit: pokemonsPageLimit },
]
