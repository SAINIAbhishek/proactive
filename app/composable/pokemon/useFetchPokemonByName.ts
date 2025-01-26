import type { AsyncDataRequestStatus } from '#app'
import type { PokeAPI } from 'pokeapi-types'
import consola from 'consola'
import { usePokemonStore } from '~/store/pokemon'

/**
 * Composable to fetch and manage a single pokemon by name.
 * @returns An object containing status of the request.
 */
export default async (name: string): Promise<{
  status: Ref<AsyncDataRequestStatus>
}> => {
  const store = usePokemonStore()

  const { data, error, status } = await usePokemonData<PokeAPI.Pokemon>(`pokemon/${name}`, {
    key: () => `pokemon-${name}`,
    getCachedData(key, nuxtApp) {
      return (nuxtApp.payload.data[key]
        ?? nuxtApp.static.data[key]
        ?? store.getPokemonByName(name)
        ?? undefined)
    },
  })

  watch(data, (newValue) => {
    if (newValue) {
      store.addPokemon(newValue)
    }
  }, { immediate: true })

  watchEffect(() => {
    if (error.value) {
      consola.error(`[Pokemon Name Composable] Failed to fetch data for pokemon name ${name}.`, error.value)
      throw createError({
        statusCode: 404,
        statusMessage: `No data found for pokemon name ${name}.`,
      })
    }

    if (!data?.value?.name) {
      consola.error(`[Pokemon Name Composable] Failed to fetch data for pokemon name ${name}.`)
      throw createError({
        statusCode: 404,
        statusMessage: `No data found for pokemon name ${name}.`,
      })
    }
  })

  return {
    status,
  }
}
