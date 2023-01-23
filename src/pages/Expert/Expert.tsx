import { FC } from 'react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { User } from '../../types/User'
import { getExpertById } from '../../api/experts'
import ExpertCard from '../../components/ExpertCard'
import ExpertIllustration from '../../../public/ExpertIllustration.png'
import styles from './Expert.module.scss'

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
          <h3 className={styles.aboutTitle}>About me</h3>
          <div className={styles.aboutWrapper}>
            <div className={styles.bio}>
              <h4 className={styles.bioTitle}>Bio</h4>
              <p className={styles.bioText}>{expert.description}</p>
            </div>
            <div className={styles.imageWrapper}>
              <Image src={ExpertIllustration} alt="Expert Illustation" fill />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const userId = Array.isArray(query.id) ? query.id[0] : query.id

  const expert = await getExpertById(userId ?? '')

  return {
    props: {
      expert: expert.data,
    },
  }
}

export default Expert
