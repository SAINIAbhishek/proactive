import { ViewModeEnum, type ViewModeType } from '~/types/viewMode'

export const useViewModeStore = defineStore('viewMode', {
  state: () => ({
    mode: ViewModeEnum.GRID as ViewModeType,
  }),

  actions: {
    initialize(storageKey: string) {
      if (import.meta.client) {
        const savedMode = localStorage.getItem(storageKey)
        if (savedMode && Object.values(ViewModeEnum).includes(savedMode as ViewModeEnum)) {
          this.mode = savedMode as ViewModeEnum
        }
      }
    },
    setViewMode(storageKey: ViewModeType) {
      this.mode = this.mode === ViewModeEnum.GRID ? ViewModeEnum.LIST : ViewModeEnum.GRID
      if (import.meta.client) {
        localStorage.setItem(storageKey, this.mode)
      }
    },
  },

  getters: {
    currentMode(state) {
      return state.mode || ViewModeEnum.GRID
    },
  },
})
