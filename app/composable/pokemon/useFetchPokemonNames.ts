import type { AsyncDataRequestStatus } from '#app'
import type { PokeAPI } from 'pokeapi-types'
import consola from 'consola'
import { validateLimitQueryParam, validatePageQueryParam } from '~/helpers/validatePageParams'
import { usePokemonStore } from '~/store/pokemon'

/**
 * Fetch pokemon names from the API and update the store.
 * @returns An object containing the name and status of the request.
 */
export default async (): Promise<{
  names: Ref<string[]>
  status: Ref<AsyncDataRequestStatus>
}> => {
  const store = usePokemonStore()
  const route = useRoute()

  const page = computed<number>(() => validatePageQueryParam(route.query.page as string))
  const limit = computed<number>(() => validateLimitQueryParam(route.query.limit as string))
  const offset = computed<number>(() => (page.value - 1) * limit.value)

  const names: Ref<string[]> = ref([])

  const { data, error, status } = await usePokemonData<PokeAPI.NamedAPIResourceList | null>('pokemon', {
    key: () => `pokemon-names-${limit.value}-${offset.value}`,
    query: {
      limit,
      offset,
    },
    getCachedData(key, nuxtApp) {
      return (nuxtApp.payload.data[key]
        ?? nuxtApp.static.data[key])
    },
  })

  watch(data, (newValue) => {
    if (newValue?.count) {
      store.updateTotalPokemons(newValue.count)
    }
    if (newValue?.results) {
      names.value = []
      for (const pokemon of newValue.results) {
        if (pokemon.name) {
          names.value.push(pokemon.name)
        }
      }
    }
  }, { immediate: true })

  watchEffect(() => {
    if (error.value) {
      consola.error(`[Pokemon Names Composable] Failed to fetch data for pokemon names.`, error.value)
      throw createError({
        statusCode: 404,
        statusMessage: `No data found for pokemon.`,
      })
    }

    if (!data?.value?.results?.length) {
      consola.error(`[Pokemon Names Composable] Failed to fetch data for pokemon.`)
      throw createError({
        statusCode: 404,
        statusMessage: `No data found for pokemon.`,
      })
    }
  })

  return {
    names,
    status,
  }
}
