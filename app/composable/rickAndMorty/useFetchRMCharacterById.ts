import type { AsyncDataRequestStatus } from '#app'
import type { Character } from 'rickmortyapi'
import consola from 'consola'
import { useRickAndMortyStore } from '~/store/rick-and-morty'

/**
 * Composable to fetch and manage a single Rick and Morty character by ID.
 * @param id - The ID of the character
 * @returns An object containing status of the request.
 */
export default async (id: string): Promise<{
  status: Ref<AsyncDataRequestStatus>
}> => {
  const store = useRickAndMortyStore()

  const { data, error, status } = await useRickAndMortyData<Character>(`/character/${id}`, {
    key: () => `character-${id}`,
    getCachedData(key, nuxtApp) {
      return (
        nuxtApp.payload.data[key]
        ?? nuxtApp.static.data[key]
        ?? store.getCharacterById(Number(id))
        ?? undefined
      )
    },
  })

  watch(data, (newValue) => {
    if (newValue) {
      store.addCharacter(newValue)
    }
  }, { immediate: true })

  watchEffect(() => {
    if (error.value) {
      consola.error(`[Rick and Morty Id Composable] Failed to fetch data for character ID ${id}.`, error.value)
      throw createError({
        statusCode: 404,
        statusMessage: `No data found for character ID ${id}.`,
      })
    }

    if (!data?.value?.id) {
      consola.error(`[Rick and Morty Id Composable] Failed to fetch data for character ID ${id}.`)
      throw createError({
        statusCode: 404,
        statusMessage: `No data found for character ID ${id}.`,
      })
    }
  })

  return {
    status,
  }
}
