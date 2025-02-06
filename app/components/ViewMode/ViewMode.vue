<script setup lang="ts">
import { useViewModeStore } from '~/store/viewMode'
import { ViewModeEnum, type ViewModeOption, type ViewModeType } from '~/types/viewMode'

const viewModeStore = useViewModeStore()

const viewModes: ViewModeOption[] = [
  { mode: ViewModeEnum.GRID, icon: 'i-heroicons-squares-2x2', label: 'Grid' },
  { mode: ViewModeEnum.LIST, icon: 'i-heroicons-list-bullet', label: 'List' },
]

function setLayout(newViewMode: ViewModeType) {
  if (viewModeStore.currentMode !== newViewMode) {
    viewModeStore.setViewMode(newViewMode)
  }
}
</script>

<template>
  <div class="flex items-center space-x-4">
    <div class="pr-6">
      Display:
    </div>
    <div v-for="mode in viewModes" :key="mode.mode">
      <UButton
        :icon="mode.icon"
        :disabled="viewModeStore.currentMode === mode.mode"
        @click="setLayout(mode.mode)"
      >
        {{ mode.label }}
      </UButton>
    </div>
  </div>
</template>
