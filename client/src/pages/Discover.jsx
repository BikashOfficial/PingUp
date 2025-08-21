import React, { useEffect, useState } from 'react'
import { dummyConnectionsData } from '../assets/assets'
import { Search } from 'lucide-react'
import UserCard from '../components/UserCard'
import Loading from '../components/Loading'
import api from '../api/axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../features/user/userSlice'

const Discover = () => {

  const dispatch = useDispatch()

  const [input, setInput] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const { getToken } = useAuth()

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      try {
        setUsers([])
        setLoading(true)

        const { data } = await api.post('/api/user/discover', { input }, {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        })

        data.success ? setUsers(data.users) : toast.error(data.message)
        setLoading(false)
        setInput('')
      } catch (error) {
        toast.error(error.message)
      }
      setLoading(false)
    }
  }


  useEffect(() => {
    getToken().then((token) => {
      dispatch(fetchUser(token))
    })
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-bg-white'>
      <div className='max-w-6xl mx-auto p-6'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-slate-600'>Discover People</h1>
          <p className='text-slate-400'>Connect with amazing people arround the world and grow your network</p>
        </div>


        {/* search */}

        <div className='mb-8  '>
          <div className='lg:p-6'>
            <div className='relative'>
              <Search className=' absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 size-5' />
              <input type="text" className=' outline-slate-200 bg-white/50 pl-10 sm:pl-12 py-2 w-full border-2 border-gray-200 text-slate-700 rounded-lg max-sm:text-sm' placeholder='Search people by name, username or location...' onChange={(e) => setInput(e.target.value)} value={input} onKeyUp={handleSearch} />
            </div>
          </div>
        </div>



        <div className='flex flex-wrap gap-6'>
          {users.map((user) => (
            <UserCard user={user} key={user._id} />
          ))}
        </div>



        {
          loading && (<Loading height='60vh' />)
        }

      </div>
    </div>
  )
}

export default Discover