import { FC } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { User } from '../../types/User'
import ExpertCard from '../../components/ExpertCard'
import Pagination from '../../components/Pagination'
import { getExperts } from '../../api/experts'
import styles from './Experts.module.scss'

interface Props {
  experts: User[]
  total: number
  currentPage: number
}

const Experts: FC<Props> = ({ total, experts, currentPage }) => {
  const router = useRouter()

  const handlePagination = (page: number): void => {
    const path = router.pathname
    router.push({
      pathname: path,
      query: { page: String(page) },
    })
  }

  return (
    <div className={classNames('content-container', styles.expertPage)}>
      <h1 className={classNames(styles.title)}>Find your advisor</h1>
      <div className={styles.subtitle}>{total} advisors available</div>
      <ul className={styles.expertsList}>
        {experts.map((expert) => (
          <li key={expert.id} className={styles.expertsListItem}>
            <ExpertCard expert={expert} />
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        <Pagination
          currentPage={currentPage}
          total={total}
          onChangePage={handlePagination}
        />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const currentPage = Number(query.page) || 1

  const limit = 4
  const offset = (currentPage - 1) * limit

  const { data, total } = await getExperts(limit, offset)

  return {
    props: {
      experts: data,
      total,
      currentPage,
    },
  }
}

export default Experts
