import type { RouteLocationRaw } from 'vue-router'

export interface Item {
  url: RouteLocationRaw
  title: string
  id: number
  image: string
  description?: string
}
