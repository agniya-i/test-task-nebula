import { FC } from 'react'
import Image from 'next/image'
import styles from './Pagination.module.scss'
import classNames from 'classnames'
import PaginateArror from '../../../public/icons/Arrow.svg'

type Props = {
  perPage?: number
  currentPage: number
  total: number
  onChangePage: (pageToNavigate: number) => void
}

const Pagination: FC<Props> = ({
  perPage = 4,
  currentPage,
  total,
  onChangePage,
}) => {
  const DOTS_MIN_LIMIT = 2
  const MIN_PAGES_FOR_PAGINATION = 1
  const DOTS_PAGE_OFFSET = 2
  const totalPages = Math.ceil(total / perPage)
  const startPage = 1
  const left = 'left'
  const right = 'right'
  const hasLeftHidden = currentPage > DOTS_MIN_LIMIT
  const hasRightHidden = totalPages - currentPage >= DOTS_MIN_LIMIT

  // let pages: Array<string|number> =[]
  let pages: any[] = []

  const generateRange = (from: number, to: number): number[] => {
    const pagesRange = []

    let current = from

    while (current <= to) {
      pagesRange.push(current)
      current++
    }

    return pagesRange
  }

  if (totalPages < MIN_PAGES_FOR_PAGINATION) {
    return null
  }

  if (hasLeftHidden && hasRightHidden) {
    pages = [
      startPage,
      left,
      ...generateRange(currentPage - 1, currentPage + 1),
      right,
      totalPages,
    ]
  }

  if (hasRightHidden && !hasLeftHidden && pages.length === 0) {
    pages = [...generateRange(startPage, DOTS_MIN_LIMIT + 1), right, totalPages]
  }

  if (!hasRightHidden && hasLeftHidden && pages.length === 0) {
    pages = [
      startPage,
      left,
      ...generateRange(totalPages - DOTS_MIN_LIMIT, totalPages),
    ]
  }

  if (pages.length === 0) {
    pages = generateRange(startPage, totalPages)
  }

  return (
    <ul className={styles.paginationList}>
      {currentPage > 1 && (
        <li className={styles.paginationItem}>
          <button
            className={classNames(
              styles.paginationItemButton,
              styles.arrowLeft,
            )}
            onClick={() => {
              onChangePage(currentPage - 1)
            }}
          >
            <Image src={PaginateArror} alt="arrow" width={15} height={15} />
          </button>
        </li>
      )}
      {pages.map((item) => {
        let pageToNavigate = item
        let element = item
        const itemClass = classNames([styles.paginationItem], {
          [styles.activeItem]: currentPage === item,
        })

        if (item === 'left') {
          element = '...'
          pageToNavigate = currentPage - DOTS_PAGE_OFFSET
        }

        if (item === 'right') {
          element = '...'
          pageToNavigate = currentPage + DOTS_PAGE_OFFSET
        }

        return (
          <li className={itemClass} key={item}>
            <button
              onClick={() => {
                onChangePage(pageToNavigate)
              }}
              className={styles.paginationItemButton}
              disabled={currentPage === item}
              data-qa={pageToNavigate}
            >
              {!isNaN(element) ? parseInt(element) : element}
            </button>
          </li>
        )
      })}
      {currentPage !== totalPages && (
        <li className={styles.paginationItem}>
          <button
            className={styles.paginationItemButton}
            onClick={() => {
              onChangePage(currentPage + 1)
            }}
          >
            <Image src={PaginateArror} alt="arrow" width={15} height={15} />
          </button>
        </li>
      )}
    </ul>
  )
}

export default Pagination
