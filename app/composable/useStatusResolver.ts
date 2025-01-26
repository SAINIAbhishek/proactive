import type { AsyncDataRequestStatus } from '#app'
import { requestStatusPriorityOrder } from '~/constants/status'

/**
 * Resolves and merges multiple statuses into a single status based on priority.
 *
 * @param statuses - An array of statuses.
 * @returns An object containing a computed reference (`status`) representing the resolved status.
 */
export default (statuses: (Ref<AsyncDataRequestStatus>)[]): {
  status: ComputedRef<AsyncDataRequestStatus>
} => {
  const status = computed<AsyncDataRequestStatus>(() => {
    return (
      statuses
        .map(status => status.value)
        .find(status => requestStatusPriorityOrder.includes(status)) || 'success'
    )
  })

  return {
    status,
  }
}
