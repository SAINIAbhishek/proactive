import type { ViewModeType } from '~/types/viewMode'

export const useViewModeStore = defineStore('view-mode', {
  state: () => ({
    viewMode: 'grid' as ViewModeType,
  }),

  actions: {
    setViewMode(newViewMode: ViewModeType) {
      this.viewMode = newViewMode
    },
  },
})
