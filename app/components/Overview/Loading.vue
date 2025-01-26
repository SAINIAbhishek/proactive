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
  <ApplicationRequestStatus :status="status">
    <template #pending>
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
    </template>
  </ApplicationRequestStatus>
</template>
