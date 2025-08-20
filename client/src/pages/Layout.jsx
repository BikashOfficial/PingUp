import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { dummyUserData } from '../assets/assets'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'

const Layout = () => {
  const location = useLocation()
  const user = useSelector((state) => state.user.value)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  //////
  const isChatPage = location.pathname !== '/messages' && location.pathname.startsWith('/messages/')
  //////

  return user ? (
    <div className='w-full flex h-screen'>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Navbar for mobile only */}
      {!isChatPage && (
        <div className='bg-white/60 backdrop-blur border-2 border-gray-200 mx-2 rounded-lg mt-1 lg:hidden md:hidden fixed top-0 left-0 right-0 z-40  shadow-lg shadow-black/20'>
          <Navbar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        </div>
      )}

      {/* <div className='bg-slate-100 flex-1 flex-col overflow-y-auto lg:pt-0 md:pt-0 pt-0' onClick={() => setSidebarOpen(false)}>

        <Outlet />

      </div> */}

      <main
        className='flex-1 overflow-y-auto'
        onClick={() => { if (sidebarOpen) setSidebarOpen(false); }}
      >
        <div className={`bg-slate-50 ${!isChatPage ? 'pt-18 lg:pt-0 md:pt-0' : ''}`}>
          <Outlet context={setSidebarOpen} />
        </div>
      </main>
    </div>
    // </div>
  ) : (
    <Loading />
  )
}

export default Layout