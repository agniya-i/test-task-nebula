import { ReactNode } from 'react'
import Header from '../Header'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Header />
      <div className="layout">{children}</div>
    </>
  )
}

export default Layout
