<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-wrap -mx-4">
      <div class="w-full md:w-1/2 px-4 mb-8">
        <slot name="image" />
      </div>
      <div class="w-full md:w-1/2 px-4">
        <h2 class="text-3xl font-bold text-slate-700 dark:text-slate-300">
          <slot name="title" />
        </h2>
        <slot name="description" />
      </div>
    </div>
  </div>
</template>
