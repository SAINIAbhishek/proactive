<script setup lang="ts">
import type { AsyncDataRequestStatus } from '#app'

defineProps<{
  status: AsyncDataRequestStatus | undefined
}>()
</script>

<template>
  <!-- Idle state: No response from API -->
  <div v-if="status === 'idle'" class="text-lg text-slate-700 dark:text-slate-300">
    We are not receiving any response from the API...
  </div>

  <!-- Pending state: Request is in progress -->
  <div v-else-if="status === 'pending'">
    <slot name="pending" />
  </div>

  <!-- Error state: API request failed -->
  <div v-else-if="status === 'error'" class="text-lg text-slate-700 dark:text-slate-300">
    We are facing an issue while connecting to the API at the moment.
  </div>

  <!-- Fallback for undefined or unknown statuses -->
  <div v-else class="text-lg text-slate-700 dark:text-slate-300">
    Unknown status or request not initiated.
  </div>
</template>
