import React, { useEffect, useState } from 'react'
import { dummyRecentMessagesData } from '../assets/assets'
import { Link } from 'react-router-dom'
import moment from 'moment'

const RecentMessages = () => {

  const [messages, setMessages] = useState([])

  const fetchRecentMessages = async () => {
    setMessages(dummyRecentMessagesData)
  }

  useEffect(() => {
    fetchRecentMessages()
  }, [])

  return (
    <div className='bg-white shadow max-w-xs mt-4 p-4 min-h-20 rounded-lg text-xs text-slate-800'>
      <h3 className='font-semibold text-slate-800 text-xs mb-4'>Recent Messages</h3>
      <div className='flex flex-col max-h-56 overflow-y-scroll no-scrollbar '>
        {

          messages.map((message, i) => (
            <Link to={`/messages/${message.from_user_id._id}`} key={i} className='flex items-start  py-2 px-2 gap-2 hover:bg-slate-100 hover:rounded-lg' >
              <img src={message.from_user_id?.profile_picture} className='size-8 rounded-full' />
              <div className='w-full'>
                <div className='flex justify-between'>
                  <p className='font-medium'>{message.from_user_id?.full_name}</p>
                  <p className='text-[10px] text-slate-400'>{moment(message.createdAt).fromNow()}</p>
                </div>


                <div className='flex justify-between'>
                  <p className='text-gray-500'>{message.text ? message.text : 'Media'}</p>
                  {!message.seen &&
                    <p className='bg-indigo-500 text-white size-4 flex items-center justify-center rounded-full text-[10px]'
                    >1</p>
                  }
                </div>


              </div>
            </Link>
          ))

        }
      </div>
    </div>
  )
}

export default RecentMessages