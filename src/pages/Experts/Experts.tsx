import { FC } from 'react'
import { GetServerSideProps } from 'next'
import classNames from 'classnames'
import { User } from '@/src/types/User'
import ExpertCard from '@/src/components/ExpertCard'
import styles from './Experts.module.scss'
import Pagination from '@/src/components/Pagination'
import { useRouter } from 'next/router'
import { getExperts } from '@/src/api/experts'
interface Props {
  experts: User[]
  total: number
  currentPage: number
}

const Experts: FC<Props> = ({ total, experts, currentPage }) => {
  const router = useRouter()

  const handlePagination = (page: number): void => {
    const path = router.pathname
    const query = router.query
    query.page = `${page}`
    router.push({
      pathname: path,
      query,
    })
  }

  return (
    <div className={classNames('content-container', styles.main)}>
      <h1 className="h1">Find your Experts</h1>
      <div className={styles.subtitle}>{total} advisors available</div>
      <div>
        <ul>
          {experts.map((expert) => (
            <li key={expert.id}>
              <ExpertCard expert={expert} />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.pagination}>
        <Pagination
          currentPage={+currentPage}
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
  const offset = (currentPage - 1) * (limit + 1)

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
