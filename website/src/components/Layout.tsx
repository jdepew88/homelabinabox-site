import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import './Footer.css'

export function Layout() {
  return (
    <>
      <Header />
      <main className="page">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
