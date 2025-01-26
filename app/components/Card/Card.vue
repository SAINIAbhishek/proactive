<template>
  <UCard class="bg-slate-200 dark:bg-slate-800 shadow-slate-100 dark:shadow-slate-900 rounded-lg shadow-md h-full flex flex-col justify-between">
    <div class="flex-grow">
      <div v-if="$slots.title" class="mb-8">
        <slot name="title" />
      </div>
      <slot name="content" />
    </div>
    <template #footer>
      <slot name="footer" />
    </template>
  </UCard>
</template>
