import { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from './Header.module.scss'
import logo from '../../../public/Logo.png'

const Header: FC = () => {
  const { push } = useRouter()

  return (
    <header className={styles.header}>
      <a
        className={styles.logoWrapper}
        onClick={async () => await push('/experts')}
      >
        <Image className={styles.logo} src={logo} alt="logo" />
      </a>
    </header>
  )
}

export default Header
