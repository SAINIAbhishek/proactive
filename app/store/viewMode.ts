import { ViewModeEnum, type ViewModeType } from '~/types/viewMode'

export const useViewModeStore = defineStore('viewMode', {
  state: () => ({
    mode: ViewModeEnum.GRID as ViewModeType,
  }),

  actions: {
    setViewMode(newViewMode: ViewModeType) {
      this.mode = newViewMode
    },
  },

  getters: {
    currentMode(state) {
      return state.mode || ViewModeEnum.GRID
    },
  },
})
