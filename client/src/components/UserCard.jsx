
import React from 'react'
import { dummyUserData } from '../assets/assets'
import { MapPin, MessageCircle, Plus, UserCheck, UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../features/user/userSlice'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import api from '../api/axios'

const UserCard = ({ user }) => {

    const navigate = useNavigate()

    const currentUser = useSelector((state) => state.user.value)
    const { getToken } = useAuth()
    const dispatch = useDispatch()

    const handleFollow = async (userId) => {
        try {
            const { data } = await api.post('/api/user/follow', { id: user._id }, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })

            if (data.success) {
                toast.success(data.message)
                dispatch(fetchUser(await getToken()))
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleConnectionRequest = async () => {
        if (currentUser.connections.includes(user._id)) {
            return navigate('/messages/' + user._id)
        }

        try {
            const { data } = await api.post('/api/user/connect', { id: user._id }, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })

            if (data.success) {
                toast.success(data.message)
                // dispatch(fetchUser(await getToken()))
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div key={user?._id} className=' p-4 pt-6 w-full flex lg:flex-col justify-between lg:w-72 md:w-[80%] md:ml-16 lg:ml-12 shadow border border-gray-200 rounded-lg'>
            <div className='text-center p-2 pl-0 w-[45%] md:w-[40%] lg:w-auto'>
                <img
                    onClick={() => navigate(`/profile/${user._id}`)}
                    src={user?.profile_picture}
                    className=' cursor-pointer hover:opacity-85 active:scale-95 duration-200 transition rounded-full w-16 shadow-md mx-auto'
                />
                <span className='mt-6 text-sm'>{user.full_name}</span>
                {
                    user.username && <p className='text-gray-500 text-sm '>@{user.username}</p>
                }

            </div>
            <div className=' '>
                <div className='text-center'>{
                    user.bio && <p className='text-gray-600 mt-2 text-center text-xs px- '>{user.bio.slice(0, 30)}...</p>
                }</div>


                <div className='flex items-center justify-center gap-2 mt-4 text-xs to-gray-600'>
                    <div className='flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1'>
                        <MapPin className='w-4 h-4' />{user.location}
                    </div>

                    <div className='flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1'>
                        <span>{user.followers.length}</span> Followers
                    </div>
                </div>

                <div className='flex mt-4 gap-2'>
                    {/* follow button */}
                    <button
                        onClick={handleFollow}
                        disabled={currentUser?.following.includes(user._id)}
                        className={`w-full py-2 rounded-lg flex justify-center items-center gap-2 text-sm  ${currentUser?.following.includes(user._id) ? ' text-slate-700 bg-slate-200' : 'active:scale-95 duration-200 transition cursor-pointer text-white bg-indigo-500 hover:bg-indigo-600  '} `}
                    >
                        {currentUser?.following.includes(user._id) ?
                            <UserCheck className='size-4' /> :
                            <UserPlus className='size-4' />}
                        {currentUser?.following.includes(user._id) ? 'Follwoing' : 'Follow'}
                    </button>

                    {/* connection request btn / message btn */}
                    <button onClick={handleConnectionRequest} className='flex items-center justify-center w-16 border-2 border-slate-300 group rounded-lg cursor-pointer active:scale-95 transition duration-200'>
                        {
                            currentUser?.following.includes(user._id) ?
                                <MessageCircle
                                    onClick={() => navigate(`/messages/${user._id}`)}
                                    className='size-5 group-hover:scale-105 transition'
                                />
                                :
                                <Plus
                                    onClick={handleConnectionRequest}
                                    className='size-5 group-hover:scale-105 transition'
                                />
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
