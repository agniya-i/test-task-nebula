import { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import classNames from 'classnames'
import { User } from '../../types/User'
import Button from '../UI/Button'
import UserImage from '../UI/UserImage'
import ExperienceIcon from '../../../public/icons/Experience.svg'
import ConsultsIcon from '../../../public/icons/Consults.svg'
import styles from './ExpertCard.module.scss'

type Props = {
  expert: User
  pageType?: 'default' | 'user'
}

const ExpertCard: FC<Props> = ({ expert, pageType = 'default' }) => {
  const { push } = useRouter()

  return (
    <div
      className={classNames(styles.wrapper, styles[`${pageType}PageCard`])}
      onClick={
        pageType === 'default'
          ? async () => await push(`expert/${expert.id}`)
          : () => {}
      }
    >
      <div className={styles.userMainInfo}>
        <div className={styles.header}>
          <div className={styles.image}>
            <div className={styles.imageWrapper}>
              <UserImage
                alt={`User ${expert.name}`}
                src={expert.image}
                width={100}
                height={100}
              />
              <div className={classNames(styles.status, styles[expert.status])}>
                {expert.status}
              </div>
            </div>
          </div>
          <div className={styles.data}>
            <h3 className={classNames('h3', styles.title)}>{expert.name}</h3>
            <div className={styles.specializations}>
              <ul className={styles.specializationsList}>
                {expert.specializations.map((specialization) => (
                  <li
                    className={styles.specializationsItem}
                    key={specialization.id}
                  >
                    {specialization.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.about}>
          <h5 className={styles.aboutTitle}>About Me</h5>
          <div className={styles.aboutDescription}>
            <p>{expert.description.slice(0, 180)}...</p>
          </div>
        </div>
      </div>
      <div className={styles.userAdditionalInfo}>
        <div className={styles.expirienceWrapper}>
          <div className={styles.expirience}>
            <div className={styles.expirienceIcon}>
              <Image src={ExperienceIcon} alt={'expirience icon'} fill />
            </div>
            <p className={styles.expirienceText}>
              <span>{expert.experience} years </span>of experience
            </p>
          </div>
          <div className={styles.expirience}>
            <div className={styles.expirienceIcon}>
              <Image src={ConsultsIcon} alt={'consultations icon'} fill />
            </div>
            <p className={styles.expirienceText}>
              <span>{expert.total_orders} </span>consultations done
            </p>
          </div>
        </div>
        {pageType !== 'user' && (
          <Button
            label="View full profile"
            style="link"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/promise-function-async
            onClick={() => push(`expert/${expert.id}`)}
          />
        )}
      </div>
    </div>
  )
}

export default ExpertCard
