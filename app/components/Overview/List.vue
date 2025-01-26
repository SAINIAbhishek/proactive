<script setup lang="ts">
import type { Item } from '~/types/item'

const props = defineProps<{
  items: Item[]
  viewIndex?: string // Optional unique key for view instances
}>()

const items = props.items ?? []
const viewIndex = props.viewIndex ?? 'default'
</script>

<template>
  <!-- Only render if there are items -->
  <div v-if="items.length" class="grid grid-cols-1 gap-4">
    <div
      v-for="(item, index) in items"
      :key="`list-item-${viewIndex}-${index}-${item.id}`"
      class="flex items-center space-x-4"
    >
      <CardList>
        <template #image>
          <NuxtImg
            :src="item.image"
            :alt="item.title"
            class="max-h-full"
            width="100%"
            height="auto"
            loading="lazy"
          />
        </template>

        <template #title>
          <h2 class="text-lg font-bold text-slate-700 dark:text-slate-300">
            {{ item.title }}
          </h2>
        </template>

        <template #actions>
          <ClientOnly>
            <UButton :to="item.url">
              View details
            </UButton>
          </ClientOnly>
        </template>
      </CardList>
    </div>
  </div>

  <!-- If no items, display a fallback message -->
  <div v-else class="text-center text-lg font-bold text-slate-700 dark:text-slate-300">
    No items available.
  </div>
</template>
