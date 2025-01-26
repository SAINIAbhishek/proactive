<template>
  <UCard class="bg-slate-200 dark:bg-slate-800 shadow-slate-100 dark:shadow-slate-900 rounded-lg shadow-md h-full w-full" :ui="{ body: { padding: 'px-2 py-2 sm:p-3' } }">
    <div class="flex items-center justify-stretch space-x-4">
      <div class="w-24 h-24 flex items-center justify-center mr-4">
        <slot name="image" />
      </div>
      <div class="flex-1">
        <slot name="title" />
      </div>
      <div class="text-right">
        <slot name="actions" />
      </div>
    </div>
  </UCard>
</template>
