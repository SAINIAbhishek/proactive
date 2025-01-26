import type { PaginationState } from '~/types/pagination'
import { validatePageQueryParam } from '~/helpers/validatePageParams'

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
  })

  /**
   * Watch for changes in the route query and update the pagination state
   */
  watch(
    () => [route.query.page],
    ([page]) => {
      const validatedPage = validatePageQueryParam(page as string)

      if (pagination.currentPage !== validatedPage) {
        pagination.currentPage = validatedPage
      }
    },
    { immediate: true },
  )

  /**
   * Watch for changes in the pagination state and update the route query
   */
  watch(
    () => ({ page: pagination.currentPage }),
    ({ page }) => {
      const updatedQuery: Record<string, string> = {
        ...route.query,
        page: page.toString(),
      }

      /**
       * Update the router query if the values have changed
       */
      if (
        route.query.page !== page.toString()
      ) {
        router.push({ query: updatedQuery })
      }
    },
  )

  return { pagination }
}
