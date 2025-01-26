<template>
  <CardList>
    <template #image>
      <div class="bg-slate-100 h-full w-full dark:bg-gray-300 rounded-lg">
        <USkeleton class="h-full w-full" />
      </div>
    </template>
    <template #title>
      <div class="flex-1 space-y-4">
        <div class="h-8 bg-slate-100 dark:bg-gray-300 rounded-lg">
          <USkeleton class="h-full w-full" />
        </div>
        <div class="h-6 bg-slate-100 dark:bg-gray-300 rounded-lg w-3/4">
          <USkeleton class="h-full w-full" />
        </div>
      </div>
    </template>
  </CardList>
</template>
