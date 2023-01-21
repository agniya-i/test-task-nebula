import { FC, useState } from 'react'
import { GetServerSideProps } from 'next'
import classNames from 'classnames'
import { User } from '@/src/types/User'
import ExpertCard from '@/src/components/ExpertCard'
import styles from './Experts.module.scss'
import Pagination from '@/src/components/Pagination'

interface Props {
  experts: User[]
  total: number
}

const Experts: FC<Props> = ({ total, experts }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const handleChangePage = (page: number): void => {
    setCurrentPage(page)
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
          currentPage={currentPage}
          total={total}
          onChangePage={handleChangePage}
        />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await import('../../../experts.json')

  return {
    props: {
      experts: data.slice(0, 4),
      total: data.length,
    },
  }
}

export default Experts
