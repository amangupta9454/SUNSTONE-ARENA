import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import MarketingNavbar from './Navbar'
import MarketingFooter from './Footer'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function MarketingLayout() {
  return (
    <div className="marketing-page min-h-screen flex flex-col">
      <ScrollToTop />
      <MarketingNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  )
}
