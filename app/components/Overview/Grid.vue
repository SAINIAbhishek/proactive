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
  <div v-if="items.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    <div
      v-for="(item, index) in items"
      :key="`grid-item-${viewIndex}-${index}-${item.id}`"
      class="h-full"
    >
      <Card>
        <template #title>
          <h2 class="text-lg font-bold text-slate-700 dark:text-slate-300">
            {{ item.title }}
          </h2>
        </template>

        <template #content>
          <div class="h-36 flex justify-center items-center mb-8">
            <NuxtImg
              :src="item.image"
              :alt="item.title"
              class="max-h-full"
              width="100%"
              height="auto"
              loading="lazy"
            />
          </div>
          <div class="text-md text-slate-700 dark:text-slate-300">
            {{ item.description }}
          </div>
        </template>

        <template #actions>
          <ClientOnly>
            <div class="text-right">
              <UButton :to="item.url">
                View details
              </UButton>
            </div>
          </ClientOnly>
        </template>
      </Card>
    </div>
  </div>

  <!-- If no items, display a fallback message -->
  <div v-else class="text-center text-lg font-bold text-slate-700 dark:text-slate-300">
    No items available.
  </div>
</template>
