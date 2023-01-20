import { FC } from 'react'
import classNames from 'classnames'
import styles from './Button.module.scss'

type Props = {
  label: string
  style: 'link' | 'button'
  onClick: () => void
}
const Button: FC<Props> = ({ label, style = 'button', onClick }) => {
  const buttonStyles = classNames(styles.button, {
    [styles.buttonLink]: style === 'link',
    [styles.buttonDefault]: style === 'button',
  })

  return (
    <button className={buttonStyles} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button
