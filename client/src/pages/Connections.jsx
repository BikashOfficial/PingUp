import React, { useState } from 'react'
import {
  dummyConnectionsData as connections,
  dummyFollowersData as followers,
  dummyFollowingData as following,
  dummyPendingConnectionsData as pending
} from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { MessageSquare, UserCheck, UserPlus, UserRoundPen, Users } from 'lucide-react';


const Connections = () => {
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState('Followers')

  const dataArray = [
    { label: 'Followers', value: followers, icon: Users },
    { label: 'Following', value: following, icon: UserCheck },
    { label: 'Connections', value: connections, icon: UserRoundPen },
    { label: 'Pending', value: pending, icon: UserPlus }
  ]
  return (
    <div className='min-h-screen'>
      <div className='max-w-6xl mx-auto p-6'>
        {/* title */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-slate-600'>Connections</h1>
          <p className='text-slate-400'>manage your network and discover new connection</p>
        </div>

        {/* Counts */}
        <div className='mb-8 flex flex-wrap ml-4 gap-6'>
          {dataArray.map((item, i) => (
            <div key={i} className='flex flex-col items-center justify-center gap-1 border h-16 lg:h-20 md:h-20 w-40 shadow-xs active:scale-95 transition duration-300 border-gray-200 bg-white rounded-lg px-4'>
              <b>{item?.value.length}</b>
              <p className='text-slate-500'>{item?.label}</p>
            </div>
          ))}
        </div>


        {/* tabs */}
        <div className='inline-flex flex-wrap items-center border border-gray-200 rounded-lg p-1 bg-white shadow-xs'>
          {dataArray.map((tab) => (
            <button onClick={() => setCurrentTab(tab.label)} key={tab.label} className={` flex items-center cursor-pointer px-3 py-1 text-sm rounded-lg transition-colors ${currentTab === tab.label ? 'bg-white font-medium text-black' : 'text-gray-500 hover:text-black'}`}>
              <tab.icon className='size-4' />
              <span className='ml-1'>{tab.label}</span>
              {tab.count !== undefined && (
                <span className=''>{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* connections */}

        <div className='flex flex-wrap gap-6 mt-6 lg:bg-slate-50 bg-slate-200 pl-3 py-3 rounded-lg '>
          {dataArray.find((item) => item.label === currentTab).value.map((user) => (
            <div key={user._id} className='w-full max-w-88 flex  gap-3 p-4 bg-white shadow rounded-lg'>
              <img src={user.profile_picture} className='rounded-full w-12 h-12 shadow-md mx-auto' />
              <div className='flex-1'>
                <p className='font-medium text-slate-700'>{user.full_name}</p>
                <p className='text-sm text-slate-500'>@{user.username}</p>
                <p className='text-sm text-gray-600'>{user.bio.slice(0, 30)}...</p>
                <div className='flex  gap-2 mt-4'>

                  {/* max-sm:flex-col */}
                  {
                    <button onClick={() => navigate(`/profile/${user._id}`)}
                      className='w-full p-2 text-sm rounded-lg bg-indigo-500 text-white hover:bg-indigo-700 active:scale-95 transition cursor-pointer' >
                      View Profile
                    </button>
                  }
                  {
                    currentTab === 'Following' && (
                      <button className='w-full p-2 text-sm rounded-lg bg-slate-100 hover:bg-slate-200 text-black active:scale-95 transition cursor-pointer'>
                        Unfollow
                      </button>
                    )
                  }

                  {
                    currentTab === 'Pending' && (
                      <button className='w-full p-2 text-sm rounded-lg bg-green-100 hover:bg-green-200 text-black active:scale-95 transition cursor-pointer'>
                        Accept
                      </button>
                    )
                  }

                  {
                    currentTab === 'Connections' && (
                      <button onClick={() => navigate(`/messages/${user._id}`)} className='w-full p-2 text-sm rounded-lg bg-indigo-100  hover:bg-indigo-200 text-black active:scale-95 transition cursor-pointer flex items-center justify-center gap-1'>
                        <MessageSquare className='size-4' />
                        Message
                      </button>
                    )
                  }
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Connections