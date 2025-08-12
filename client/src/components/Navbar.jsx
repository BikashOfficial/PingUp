import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { Menu, Search, X } from 'lucide-react'

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {

    const navigate = useNavigate()
    return (
        <div className='flex items-center justify-between '>
            <div className=''>
                <img onClick={() => navigate('/')} src={assets.logo} className='w-28 ml-7 my-2 cursor-pointer' />
            </div>

            <div className='flex items-center gap-2 text-white pl-6 rounded-xl bg-indigo-500 mr-2'>

                <div>
                    <Search onClick={() => navigate('/discover')} />
                </div>

                {
                    sidebarOpen ?
                        <X className=' p-2 z-100  text-white rounded-md mr-4 w-10 h-10 sm:hidden transition-all' onClick={() => setSidebarOpen(false)} />
                        :
                        <Menu className='p-2 z-100 rounded-md mr-4 w-10 h-10 text-white sm:hidden transition-all' onClick={() => setSidebarOpen(true)} />
                }

            </div>
        </div>
    )
}

export default Navbar