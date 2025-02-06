<script setup lang="ts">
import type { RouteItem } from '~/types/route'

const routes: RouteItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'Rick & Morty',
    to: '/rick-and-morty',
  },
  {
    label: 'Pokémon',
    to: '/pokemon',
  },
]
</script>

<template>
  <header class="bg-zinc-100 border-b border-b-zinc-200 dark:bg-zinc-700 dark:border-b-zinc-600 py-8">
    <UContainer class="flex items-center">
      <nav>
        <ul class="flex gap-2">
          <li v-for="route in routes" :key="route.to">
            <NuxtLink
              :to="route.to"
              class="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
              active-class="bg-zinc-200 dark:bg-zinc-600"
            >
              {{ route.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </UContainer>
  </header>
</template>
