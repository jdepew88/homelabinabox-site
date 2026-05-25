import { Outlet } from 'react-router-dom'
import { ImageLightboxProvider } from './image-lightbox'
import { Header } from './Header'
import { Footer } from './Footer'
import './Footer.css'

export function Layout() {
  return (
    <ImageLightboxProvider>
      <Header />
      <main className="page">
        <Outlet />
      </main>
      <Footer />
    </ImageLightboxProvider>
  )
}
