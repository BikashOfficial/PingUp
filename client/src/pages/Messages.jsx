import React from 'react'
import { dummyConnectionsData } from '../assets/assets'
import { Info, InfoIcon, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Messages = () => {


  const navigate = useNavigate();

  const {connections} = useSelector((state) => state.connections)

  return (
    <div className='min-h-screen relative'>
      <div className='max-w-6xl mx-auto p-6'>
        {/* title */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-slate-600'>Messages</h1>
          <p className='text-slate-400'>talk to your friends and family</p>
        </div>

        {/* Connected Uers */}
        <div className='flex flex-col gap-3'>
          {connections.map((user) => (
            <div key={user._id} className='max-w-xl flex flex-wrap gap-5 p-6 bg-white rounded-lg shadow-xs mx-auto'>
              <img src={user.profile_picture} alt="" className='rounded-full size-12 mx-auto' />
              <div className='flex-1'>
                <p className='font-medium text-slate-700'>{user.full_name}</p>
                <p className='text-slate-400'>@{user.username}</p>
                <p className='text-sm text-gray-600'>{user.bio}</p>
              </div>


              <div className='flex flex-col gap-2 mt-4'>
                <button onClick={() => navigate(`/messages/${user._id}`)} className='size-10 flex items-center justify-center text-sm rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 active:scale-95 transition duration-150 cursor-pointer gap-1'>
                  <MessageSquare />
                </button>

                <button onClick={() => navigate(`/profile/${user._id}`)} className='size-10 flex items-center justify-center text-sm rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 active:scale-95 transition duration-150 cursor-pointer'>
                  <InfoIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Messages