import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Install } from './pages/Install'
import { HostSetup } from './pages/HostSetup'
import { CloudflareSetup } from './pages/CloudflareSetup'
import { AutheliaSetup } from './pages/AutheliaSetup'
import { AddContainers } from './pages/AddContainers'
import { FAQ } from './pages/FAQ'
import { PrivacyPolicy } from './pages/PrivacyPolicy'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="install" element={<Install />} />
          <Route path="host-setup" element={<HostSetup />} />
          <Route path="cloudflare" element={<CloudflareSetup />} />
          <Route path="authelia" element={<AutheliaSetup />} />
          <Route path="add-containers" element={<AddContainers />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
