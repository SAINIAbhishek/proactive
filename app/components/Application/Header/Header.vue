<script setup lang="ts">
import type { Route } from '~/types/route'
import { headerNavLinks } from '~/constants/routes'

const router = useRouter()

const definedRoutes = computed<Route[]>(() => {
  const routePaths = new Set(router.getRoutes().map(r => r.path))
  return headerNavLinks.filter((route: Route) => routePaths.has(route.to))
})
</script>

<template>
  <header class="bg-zinc-100 border-b border-b-zinc-200 dark:bg-zinc-700 dark:border-b-zinc-600 py-8">
    <UContainer class="flex items-center">
      <nav>
        <ul class="flex gap-2">
          <li>
            <ApplicationHeaderLink to="/" label="Home" />
          </li>
          <li>
            <ApplicationHeaderLink to="/assignment" label="Read the assignment instructions" />
          </li>
          <li v-for="link in definedRoutes" :key="link.to">
            <ApplicationHeaderQueryLink
              :to="link.to"
              :label="link.label"
              :query="link.limit ? { page: link.page, limit: link.limit } : { page: link.page }"
            />
          </li>
        </ul>
      </nav>
      <div class="ml-auto">
        <UButton to="https://github.com/spend-cloud-tom/front-end-boilerplate" icon="mdi:github" color="blue" label="GitHub repository" variant="outline" />
      </div>
    </UContainer>
  </header>
</template>
