import type { PaginationState } from '~/types/pagination'
import { validateLimitQueryParam, validatePageQueryParam } from '~/helpers/validatePageParams'

/**
 * Composable for managing pagination with synchronized query parameters.
 */
export default (): {
  pagination: PaginationState
} => {
  const route = useRoute()
  const router = useRouter()

  const pagination = reactive({
    currentPage: validatePageQueryParam(route.query.page as string),
    currentLimit: validateLimitQueryParam(route.query.limit as string),
  })

  /**
   * Watch for changes in the route query and update the pagination state
   */
  watch(
    () => [route.query.page, route.query.limit],
    ([page, limit]) => {
      const validatedPage = validatePageQueryParam(page as string)
      const validatedLimit = validateLimitQueryParam(limit as string)

      if (pagination.currentPage !== validatedPage) {
        pagination.currentPage = validatedPage
      }

      if (pagination.currentLimit !== validatedLimit) {
        pagination.currentLimit = validatedLimit
      }
    },
    { immediate: true },
  )

  /**
   * Watch for changes in the pagination state and update the route query
   */
  watch(
    () => ({ page: pagination.currentPage, limit: pagination.currentLimit }),
    ({ page, limit }) => {
      const updatedQuery: Record<string, string> = {
        ...route.query,
        page: page.toString(),
      }

      /**
       * Include limit only if it exists in the query parameters
       */
      if (limit !== validateLimitQueryParam('')) {
        updatedQuery.limit = limit.toString()
      }

      /**
       * Update the router query if the values have changed
       */
      if (
        route.query.page !== page.toString()
        || route.query.limit !== updatedQuery.limit
      ) {
        router.push({ query: updatedQuery })
      }
    },
  )

  return { pagination }
}
