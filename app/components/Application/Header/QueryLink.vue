<script setup lang="ts">
defineProps<{
  to: string
  label: string
  query: Record<string, number>
}>()
</script>

<template>
  <RouterLink :to="{ path: to, query }">
    <UButton :label="label" variant="ghost" color="gray" />
  </RouterLink>
</template>
