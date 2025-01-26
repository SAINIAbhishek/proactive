<script setup lang="ts">
import { ViewModeEnum, type ViewModeOption, type ViewModeType } from '~/types/viewMode'

const props = defineProps({
  modelValue: {
    type: String as PropType<ViewModeType>,
    default: ViewModeEnum.GRID,
  },
})

const emit = defineEmits(['update:modelValue'])

const viewModes: ViewModeOption[] = [
  { mode: ViewModeEnum.GRID, icon: 'i-heroicons-squares-2x2', label: 'Grid' },
  { mode: ViewModeEnum.LIST, icon: 'i-heroicons-list-bullet', label: 'List' },
]

function setLayout(newViewMode: ViewModeType) {
  if (props.modelValue !== newViewMode) {
    emit('update:modelValue', newViewMode)
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
        :disabled="props.modelValue === mode.mode"
        :aria-label="`Switch to ${mode.label} view`"
        @click="setLayout(mode.mode)"
      >
        {{ mode.label }}
      </UButton>
    </div>
  </div>
</template>
