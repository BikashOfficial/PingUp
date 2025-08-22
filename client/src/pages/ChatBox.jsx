import React, { useEffect, useId, useRef, useState } from 'react'
import { dummyMessagesData, dummyUserData } from '../assets/assets'
import { ArrowLeftIcon, ImageIcon, InfoIcon, SendHorizonal } from 'lucide-react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '@clerk/clerk-react'
import api from '../api/axios'
import { addMessage, fetchMessages, resetMessages } from '../features/messages/messagesSlice'
import toast from 'react-hot-toast'

const ChatBox = () => {
  const setSidebarOpen = useOutletContext()
  const navigate = useNavigate()

  useEffect(() => {
    setSidebarOpen(false)
  }, [])

  const {messages} = useSelector((state) => state.messages)
  const { userId } = useParams()
  const { getToken } = useAuth()
  const dispatch = useDispatch()

  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const [user, setUser] = useState(null)

  const messageEndRef = useRef(null)


  const connections = useSelector((state) => state.connections.connections)

  const fetchUserMessages = async () => {
    try {
      const token = getToken()
      dispatch(fetchMessages({ token, userId }))
    } catch (error) {
      toast.error(error.message)
    }
  }

  const sendMessage = async () => {
    try {
      if (!text && !image) return

      const token = await getToken()
      const formData = new FormData();

      formData.append('to_user_id', userId)
      formData.append('text', text)
      image && formData.append('image', image)

      const { data } = await api.post('/api/message/send', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (data.success) {
        setText('')
        setImage(null)
        dispatch(addMessage(data.message))
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchUserMessages()
    return () => {
      dispatch(resetMessages())
    }
  }, [userId])

  useEffect(() => {
    if (connections.length > 0) {
      const user = connections.find(connection => connection._id === userId)
      setUser(user)
    }
  }, [connections, userId])

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])


  return user && (
    <div className='flex flex-col h-screen'>

      {/* message top info bar */}
      <div className='flex justify-between items-center md:px-10 xl:px-42 py-2 lg:rounded-none md:rounded-none sticky  shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-lg bg-white backdrop-blur-2xl border-gray-300'>
        <div className='flex items-center gap-2 p-2  '>
          <ArrowLeftIcon onClick={() => navigate(-1)} size={28} className=' ml-1 lg:hidden md:hidden text-slate-500 ' />
          <img src={user.profile_picture} className='ml-1 size-8 rounded-full' />
          <div className=''>
            <p className='font-medium'>{user.full_name}</p>
            <p className='text-sm text-gray-500 -mt-1.5'>@{user.username}</p>
          </div>
        </div>
        <InfoIcon onClick={() => navigate(`/profile/${user._id}`)} size={30} className='mr-4' />
      </div>


      {/* message area */}
      <div className='p-5 md:px-10 h-full overflow-y-scroll'>
        <div className='space-y-4 max-w-4xl mx-auto'>
          {messages.toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((message, i) => (
            <div key={i} className={`flex flex-col ${message.to_user_id !== user._id ? 'items-start' : 'items-end'}`} >
              <div className={`p-2 text-sm max-w-sm  text-slate-700 rounded-lg shadow ${message.to_user_id !== user._id ? 'rounded-bl-none bg-white' : 'rounded-br-none bg-indigo-50 '} `}>
                {
                  message.message_type === 'image' && <img src={message.media_url} className='w-full max-w-sm rounded-lg mb-1' />
                }
                <p>{message.text}</p>
              </div>
            </div>
          ))}

          <div ref={messageEndRef}></div>

        </div>
      </div>

      {/* input area */}

      <div className='px-4'>
        <div className='flex items-center gap-3 pl-5 p-1.5 bg-white w-full max-w-xl mx-auto border border-gray-200 shadow rounded-full mb-5' >
          <input
            type="text"
            className='flex-1 outline-none text-slate-700'
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder='type a mesaage...' />

          <label htmlFor="image"  >
            {
              image ?
                <img src={URL.createObjectURL(image)} className='h-8 rounded' /> :
                <ImageIcon size={30} className='text-gray-400 cursor-pointer' />
            }
            <input type="file" accept='image/*' hidden onChange={(e) => setImage(e.target.files[0])} id="image" />
          </label>

          <button onClick={sendMessage} className=' shadow shadow-indigo-600 bg-indigo-500 p-2 rounded-full text-white active:scale-95 cursor-pointer hover:bg-indigo-700 duration-200 ' >
            <SendHorizonal size={24} className='ml-0.5 text-center' />
          </button>

        </div>
      </div>
    </div>
  )
}

export default ChatBox