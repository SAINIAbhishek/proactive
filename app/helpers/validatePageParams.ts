import { defaultPageNumber } from '~/constants'

/**
 * Validates the page query parameter and falls back to the default page number if invalid.
 * @param page - The page query parameter from the route
 * @returns The validated page number
 */
export function validatePageQueryParam(page: string | undefined): number {
  const parsedPage = Number.parseInt(page || defaultPageNumber.toString(), 10)
  return Number.isNaN(parsedPage) || parsedPage < 1 ? defaultPageNumber : parsedPage
}
