<script setup lang="ts">
import type { AsyncDataRequestStatus } from '#app'
import { defaultItemsPerPage } from '~/constants'
import { useViewModeStore } from '~/store/view-mode'
import { ViewModeEnum } from '~/types/viewMode'

defineProps<{
  status: AsyncDataRequestStatus | undefined
}>()

const viewModeStore = useViewModeStore()
const viewMode = computed(() => viewModeStore.viewMode)
const skeletonCount = computed(() => defaultItemsPerPage)
</script>

<template>
  <!-- Idle state: No response from API -->
  <div v-if="status === 'idle'" class="text-lg text-slate-700 dark:text-slate-300">
    We are not receiving any response from the API...
  </div>

  <!-- Pending state: Request is in progress -->
  <div v-else-if="status === 'pending'">
    <div v-if="viewMode === ViewModeEnum.GRID" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="i in skeletonCount" :key="i">
          <SkeletonCard />
        </div>
      </div>

      <div v-else class="grid grid-cols-1 gap-4">
        <div v-for="i in skeletonCount" :key="i">
          <SkeletonList />
        </div>
      </div>
  </div>

  <!-- Error state: API request failed -->
  <div v-else-if="status === 'error'" class="text-lg text-slate-700 dark:text-slate-300">
    We are facing an issue while connecting to the API at the moment.
  </div>
  
</template>
