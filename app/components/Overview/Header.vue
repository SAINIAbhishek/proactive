<script setup lang="ts">
import { useViewModeStore } from '~/store/view-mode'

defineProps<{
  title: string
}>()

const viewModeStore = useViewModeStore()
</script>

<template>
  <header class="border-b mb-8 py-2">
    <div class="flex my-2 align-middle items-center justify-between">
      <h1 class="text-xl font-bold tracking-wide text-slate-700 dark:text-slate-300">
        {{ title }}
      </h1>
      <OverviewMode v-model="viewModeStore.viewMode" />
    </div>
  </header>
</template>
