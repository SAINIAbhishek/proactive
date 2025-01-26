<script setup lang="ts">
import type { PokeAPI } from 'pokeapi-types'
import useFetchPokemonByName from '~/composable/pokemon/useFetchPokemonByName'
import { getPokemonImage } from '~/helpers/pokemon'
import { usePokemonStore } from '~/store/pokemon'

const route = useRoute()

const { name } = route.params as { name: string }

/**
 * Store for accessing global application state
 */
const pokemonStore = usePokemonStore()

/**
 * Fetch the pokemon details
 */
const {
  status,
} = await useFetchPokemonByName(name)

/**
 * Get the pokemon from store
 */
const pokemon: ComputedRef<PokeAPI.Pokemon | null> = computed(() =>
  pokemonStore.getPokemonByName(name) ?? null)

const pokemonImage: ComputedRef<string> = computed(() =>
  getPokemonImage(pokemon.value as PokeAPI.Pokemon))
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

      <!-- Pokemon Detail Section -->
      <article v-else-if="pokemon">
        <DetailInfo>
          <template #title>
            {{ pokemon.name ?? 'Pokemon' }} (Order: {{ pokemon.order }})
          </template>
          <template #image>
            <NuxtImg
              :src="pokemonImage"
              alt="image"
              class="w-full h-auto rounded-lg shadow-md mb-4"
              width="100%"
              height="auto"
              loading="lazy"
            />
          </template>
          <template #description>
            <div class="text-md text-slate-700 dark:text-slate-300 mt-8">
              <p class="mb-4">
                <strong>Base Experience:</strong> {{ pokemon.base_experience ?? 'Unknown' }}
              </p>
              <p class="mb-4">
                <strong>Height:</strong> {{ pokemon.height ?? 'Unknown' }}
                <strong class="ml-6">Weight:</strong> {{ pokemon.weight ?? 'Unknown' }}
              </p>
              <div class="mb-4">
                <strong>Abilities: </strong>
                <span v-for="(ability, index) in pokemon.abilities" :key="`abilities-${index}`" class="mb-2">
                  {{ ability.ability.name }}{{ index !== (pokemon.abilities.length - 1) ? ', ' : '' }}
                </span>
              </div>
              <div class="mb-4">
                <strong>Types: </strong>
                <span v-for="(type, index) in pokemon.types" :key="`types-${index}`" class="mb-2">
                  {{ type.type.name }}{{ index !== (pokemon.types.length - 1) ? ', ' : '' }}
                </span>
              </div>
              <div class="mb-4">
                <strong>Moves: </strong>
                <span v-for="(move, index) in pokemon.moves" :key="`moves-${index}`" class="mb-2">
                  {{ move.move.name }}{{ index !== (pokemon.moves.length - 1) ? ', ' : '' }}
                </span>
              </div>
            </div>
          </template>
        </DetailInfo>
      </article>

      <!-- Error State -->
      <article v-else>
        <div class="text-lg text-red-600">
          We could not fetch the pokemon details. Please try again later.
        </div>
      </article>
    </UContainer>
  </section>
</template>
