<script setup lang="ts">
import OverviewGrid from '~/components/Overview/Grid.vue'
import OverviewList from '~/components/Overview/List.vue'
import useFetchRMCharactersByPage from '~/composable/rickAndMorty/useFetchRMCharactersByPage'
import usePagination from '~/composable/usePagination'
import { getRickAndMortyItems } from '~/helpers/rickAndMorty'
import { useRickAndMortyStore } from '~/store/rick-and-morty'
import { useViewModeStore } from '~/store/view-mode'
import { ViewModeEnum } from '~/types/viewMode'

/**
 * Use pagination to track the current page
 */
const { pagination } = usePagination()

/**
 * Stores for accessing global application state related to Rick and Morty and view mode
 */
const rickAndMortyStore = useRickAndMortyStore()
const viewModeStore = useViewModeStore()

/**
 * View mode computed based on store's view mode setting
 */
const viewMode = computed(() => viewModeStore.viewMode)

/**
 * Fetch the characters for the current page, and handle loading status
 */
const { status } = await useFetchRMCharactersByPage()

/**
 * Compute display items based on the current page's characters and the selected view mode
 */
const displayItems = computed(() => {
  const characters = rickAndMortyStore.getCharactersByPage(pagination.currentPage) || []
  return getRickAndMortyItems(characters, viewMode.value)
})

/**
 * Determine the active overview component based on the selected view mode
 */
const activeOverview = computed(() =>
  viewMode.value === ViewModeEnum.GRID ? OverviewGrid : OverviewList,
)
</script>

<template>
  <section class="py-8">
    <UContainer>
      <OverviewHeader title="Rick and Morty Characters" />

      <!-- Show loading state while data is being fetched -->
      <OverviewLoading v-if="status !== 'success'" :status="status" />

      <!-- Render the main content once data is fetched successfully -->
      <template v-else>
        <component
          :is="activeOverview"
          :items="displayItems"
          view-index="rick-and-morty"
        />

        <!-- Render pagination if there are more characters than the current page can display -->
        <ClientOnly>
          <UPagination
            v-show="rickAndMortyStore.getTotalCharacters
              && rickAndMortyStore.getTotalCharacters > rickAndMortyStore.getCharactersPerPage"
            v-model="pagination.currentPage"
            :page-count="rickAndMortyStore.getCharactersPerPage"
            :total="rickAndMortyStore.getTotalCharacters"
            class="my-12"
          />
        </ClientOnly>
      </template>
    </UContainer>
  </section>
</template>
