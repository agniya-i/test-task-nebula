import { FC } from 'react'
import Image from 'next/image'
import styles from './UserImage.module.scss'

type Props = {
  src: string
  alt: string
  width: number
  height: number
}

const UserImage: FC<Props> = ({ src, alt, width, height }) => {
  return (
    <div className={styles.imageWrapper}>
      <Image className={styles.image} src={src} alt={alt} fill />
    </div>
  )
}

export default UserImage
