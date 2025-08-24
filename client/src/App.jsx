import React, { useRef, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Messages from './pages/Messages'
import ChatBox from './pages/ChatBox'
import Connections from './pages/Connections'
import Discover from './pages/Discover'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
import { useAuth, useUser } from "@clerk/clerk-react"
import Layout from './pages/Layout'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { fetchUser } from './features/user/userSlice'
import { fetchConnections } from './features/connections/connectionsSlice'
import { addMessage } from './features/messages/messagesSlice'
import Notify from './components/Notify'

const App = () => {
  const { pathname } = useLocation()
  const { user } = useUser()
  const { getToken } = useAuth()
  const pathnameRef = useRef(pathname)

  const dispatch = useDispatch()

  // fetch user & connections when user changes
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const token = await getToken()
        dispatch(fetchUser(token))
        dispatch(fetchConnections(token))
      }
    }
    fetchData()
  }, [user, getToken, dispatch])

  // update current pathname ref
  useEffect(() => {
    pathnameRef.current = pathname
  }, [pathname])

  // SSE (Server Sent Events) for messages
  useEffect(() => {
    let eventSource

    const setupSSE = async () => {
      if (user) {
        try {
          const token = await getToken()
          eventSource = new EventSource(
            `${import.meta.env.VITE_BASEURL}/api/message/${user.id}?token=${token}`
          )

          eventSource.onmessage = (event) => {
            try {
              const message = JSON.parse(event.data)

              if (pathnameRef.current === `/messages/${message.from_user_id?._id}`) {
                dispatch(addMessage(message))
              } else {
                toast.custom(
                  (t) => <Notify t={t} message={message} />,
                  { position: 'bottom-right' }
                )
              }
            } catch (error) {
              console.error('Error processing message:', error)
            }
          }

          eventSource.onerror = (error) => {
            console.error('SSE connection error:', error)
            eventSource.close()
          }
        } catch (error) {
          console.error('Error setting up SSE:', error)
        }
      }
    }

    setupSSE()

    // ✅ cleanup on unmount / dependency change
    return () => {
      if (eventSource) eventSource.close()
    }
  }, [user, getToken, dispatch])

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={!user ? <Login /> : <Layout />}>
          <Route index element={<Feed />} />
          <Route path='connections' element={<Connections />} />
          <Route path='messages' element={<Messages />} />
          <Route path='messages/:userId' element={<ChatBox />} />
          <Route path='discover' element={<Discover />} />
          <Route path='profile' element={<Profile />} />
          <Route path='profile/:profileId' element={<Profile />} />
          <Route path='createPost' element={<CreatePost />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
