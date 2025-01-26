import type { AsyncDataRequestStatus } from '#app'
import type { PokeAPI } from 'pokeapi-types'
import consola from 'consola'
import { validatePageQueryParam } from '~/helpers/validatePageParams'
import { usePokemonStore } from '~/store/pokemon'

/**
 * Fetch details of multiple pokemon from the API and update the store.
 * @param names - The list of pokemon names to fetch details for.
 * @returns An object containing the status of the request and a refresh function.
 */
export default async (names: Ref<string[]>): Promise<{
  status: Ref<AsyncDataRequestStatus>
  refresh: () => Promise<void>
}> => {
  const route = useRoute()
  const store = usePokemonStore()

  const page = computed<number>(() => validatePageQueryParam(route.query.page as string))

  /**
   * Filter names that need to be fetched from the API (i.e., not already in the store).
   */
  const cacheKey = computed(() => names.value.join('-'))

  /**
   * Fetch pokemon data concurrently and update the store.
   */
  const { status, refresh } = await useAsyncData(`pokemons-${cacheKey.value}`, async () => {
    try {
      /**
       * Filter names that need to be fetched from the API (i.e., not already in the store).
       */
      const fetchPokemonPromises = names.value
        .filter(name => name && !store.hasPokemonWithName(name))
        .map(name => $pokemon<PokeAPI.Pokemon>(`pokemon/${name}`))

      const results = await Promise.all(fetchPokemonPromises)
      const newPokemon: PokeAPI.Pokemon[] = results.filter(result => result !== undefined)

      store.addPokemonList(newPokemon, names.value, page.value)
      return newPokemon
    }
    catch (error) {
      consola.error(`[Pokemon Page Composable] Error fetching pokemon details for ${cacheKey}`, error)
      /**
       * Return an empty array to prevent UI crash due to fetch failure
       */
      return []
    }
  }, {
    getCachedData(key, nuxtApp) {
      return (nuxtApp.payload.data[key] ?? nuxtApp.static.data[key])
    },
    watch: [cacheKey],
  }).then((result) => {
    if (result?.error?.value) {
      consola.error('[Pokemon Page Composable] Error fetching pokemon details', result.error.value)
    }
    return result
  })

  return {
    status,
    refresh,
  }
}
