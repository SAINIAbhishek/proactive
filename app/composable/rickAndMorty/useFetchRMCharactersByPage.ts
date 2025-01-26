import type { AsyncDataRequestStatus } from '#app'
import type { Character, Info } from 'rickmortyapi'
import { consola } from 'consola'
import { validatePageQueryParam } from '~/helpers/validatePageParams'
import { useRickAndMortyStore } from '~/store/rick-and-morty'

/**
 * Composable to fetch and manage Rick and Morty character data.
 * @returns An object containing the status of the request.
 */
export default async (): Promise<{
  status: Ref<AsyncDataRequestStatus>
}> => {
  const route = useRoute()
  const store = useRickAndMortyStore()

  const page = computed<number>(() => validatePageQueryParam(route.query.page as string))

  const { data, error, status } = await useRickAndMortyData<Info<Character[]>>('character', {
    key: () => `character-page-${page.value}`,
    query: {
      page,
    },
    getCachedData(key, nuxtApp) {
      return (
        nuxtApp.payload.data[key]
        ?? nuxtApp.static.data[key]
        ?? store.getCharactersByPage(page.value)
        ?? undefined
      )
    },
  })

  watch(
    data,
    (newValue) => {
      if (newValue?.results) {
        store.addCharacterList(newValue.results, page.value)
      }

      if (newValue?.info?.count !== undefined && newValue?.info?.pages !== undefined) {
        store.updateCharactersStats(newValue.info.count, newValue?.info?.pages)
      }
    },
    { immediate: true },
  )

  watchEffect(() => {
    if (error.value) {
      consola.error(`[Rick and Morty Page Composable] Failed to fetch data for page ${page.value}.`, error.value)
      throw createError({
        statusCode: 404,
        statusMessage: `No data found for page ${page.value}.`,
      })
    }

    if (!data.value?.results?.length) {
      consola.error(`[Rick and Morty Page Composable] No characters found for page ${page.value}.`)
      throw createError({
        statusCode: 404,
        statusMessage: `No characters found for page ${page.value}.`,
      })
    }
  })

  return {
    status,
  }
}
