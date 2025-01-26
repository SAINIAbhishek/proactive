<script setup lang="ts">
import OverviewGrid from '~/components/Overview/Grid.vue'
import OverviewList from '~/components/Overview/List.vue'
import useFetchPokemonByPage from '~/composable/pokemon/useFetchPokemonByPage'
import useFetchPokemonNames from '~/composable/pokemon/useFetchPokemonNames'
import usePagination from '~/composable/usePagination'
import useStatusResolver from '~/composable/useStatusResolver'
import { getPokemonItems } from '~/helpers/pokemon'
import { usePokemonStore } from '~/store/pokemon'
import { useViewModeStore } from '~/store/view-mode'
import { ViewModeEnum } from '~/types/viewMode'

/**
 * Use pagination to track the current page and limit
 */
const { pagination } = usePagination()

/**
 * Stores for accessing global application state related to pokemon and view mode
 */
const pokemonStore = usePokemonStore()
const viewModeStore = useViewModeStore()

/**
 * View mode computed based on store's view mode setting
 */
const viewMode = computed(() => viewModeStore.viewMode)

/**
 * Fetch the pokemon names for the current page and limit
 */
const {
  names: pokemonNames,
  status: statusNames,
} = await useFetchPokemonNames()

/**
 * Fetch the pokemon details based on the names
 */
const {
  status: statusDetails,
} = await useFetchPokemonByPage(pokemonNames)

/**
 * Merge and resolve the statuses
 */
const { status } = await useStatusResolver([statusNames, statusDetails])

/**
 * Compute display items based on the current page's pokemon and the selected view mode
 */
const displayItems = computed(() => {
  const currentPagePokemon = pokemonStore.getPokemonsByPage(pagination.currentPage) || []
  return getPokemonItems(currentPagePokemon, viewMode.value)
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
      <OverviewHeader title="Pokémon" />

      <!-- Show loading state while data is being fetched -->
      <OverviewLoading v-if="status !== 'success'" :status="status" />

      <!-- Render the main content once data is fetched successfully -->
      <template v-else>
        <component
          :is="activeOverview"
          :items="displayItems"
          view-index="pokemon"
        />

        <!-- Render pagination if there are more pokemon than the current page can display -->
        <ClientOnly>
          <UPagination
            v-show="pagination.currentLimit > 0 && pokemonStore.getTotalPokemons > pagination.currentLimit"
            v-model="pagination.currentPage"
            :page-count="pagination.currentLimit"
            :total="pokemonStore.getTotalPokemons"
            class="my-12"
          />
        </ClientOnly>
      </template>
    </UContainer>
  </section>
</template>
