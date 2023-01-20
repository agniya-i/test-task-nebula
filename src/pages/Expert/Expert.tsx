import { FC } from 'react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { User } from '@/src/types/User'
import ExpertCard from '@/src/components/ExpertCard'
import styles from './Expert.module.scss'
import ExpertIcon from '../../../public/ExpertIcon.png'
import classNames from 'classnames'

type Props = {
  expert: User
}
const Expert: FC<Props> = ({ expert }) => {
  return (
    <div className={styles.wrapper}>
      <div className="content-container">
        <ExpertCard expert={expert} pageType={'user'} />
      </div>
      <div className={styles.about}>
        <div className="content-container">
          <h3 className={styles.aboutTitle}>About</h3>
          <div className={styles.aboutWrapper}>
            <div className={styles.bio}>
              <h4 className={styles.bioTitle}>Bio</h4>
              <p className={styles.bioText}>{expert.description}</p>
            </div>
            <div className={styles.imageWrapper}>
              <Image src={ExpertIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Expert

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data } = await import('../../../experts.json')

  const currentUser = data.find((user) => user.id === query.id)

  return {
    props: {
      expert: currentUser,
    },
  }
}
