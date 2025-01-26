<script setup lang="ts">
import type { Character } from 'rickmortyapi'
import useFetchRMCharacterById from '~/composable/rickAndMorty/useFetchRMCharacterById'
import { useRickAndMortyStore } from '~/store/rick-and-morty'

const route = useRoute()

const { id } = route.params as { id: string }

/**
 * Store for accessing global application state
 */
const rickAndMortyStore = useRickAndMortyStore()

/**
 * Fetch the character details
 */
const {
  status,
} = await useFetchRMCharacterById(id)

/**
 * Get the character from store
 */
const character: ComputedRef<Character | null> = computed(() =>
  rickAndMortyStore.getCharacterById(Number(id)) ?? null)
</script>

<template>
  <section class="py-8">
    <UContainer>
      <!-- Loading and error handling -->
      <ApplicationRequestStatus v-if="status !== 'success'" :status="status">
        <template #pending>
          <SpinnerWithText />
        </template>
      </ApplicationRequestStatus>

      <!-- Character Detail Section -->
      <article v-else-if="character">
        <DetailInfo>
          <template #title>
            {{ character.name ?? 'Character' }} (Status: {{ character.status }})
          </template>

          <template #image>
            <NuxtImg
              :src="character.image"
              alt="image"
              class="w-full h-auto rounded-lg shadow-md mb-4"
              width="100%"
              height="auto"
              loading="lazy"
            />
          </template>

          <template #description>
            <div class="text-md text-slate-700 dark:text-slate-300 mt-8">
              <p class="mb-2">
                Gender: {{ character.gender ?? 'Unknown' }}
              </p>
              <p class="mb-2">
                Species: {{ character.species ?? 'Unknown' }}
              </p>
              <p class="mb-2">
                Origin: {{ character.origin.name ?? 'Unknown' }}
              </p>
              <p class="mb-2">
                Type: {{ character.type || 'N/A' }}
              </p>
              <p class="mb-2">
                Location: {{ character.location.name ?? 'Unknown' }}
              </p>
            </div>
          </template>
        </DetailInfo>
      </article>

      <!-- Error State -->
      <article v-else>
        <div class="text-lg text-red-600">
          We could not fetch the character details. Please try again later.
        </div>
      </article>
    </UContainer>
  </section>
</template>
