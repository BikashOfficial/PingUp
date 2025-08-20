import { BadgeCheck, Dot, Heart, MessageCircle, Share, Share2Icon } from 'lucide-react'
import moment from 'moment'
import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAuth } from '@clerk/clerk-react'
import api from '../api/axios'
import toast from 'react-hot-toast'

const PostCard = ({ post }) => {

  const postWithHashtages = post.content.replace(/(#\w+)/g, '<span class="text-indigo-600">$1</span>')
  const [likes, setLikes] = useState(post.likes_count)
  const currentUser = useSelector((state) => state.user.value)

  const navigate = useNavigate()

  const { getToken } = useAuth()

  const handleLike = async () => {
    try {
      const { data } = await api.post('/api/post/like', { postId: post._id }, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })

      if (data.success) {
        toast.success(data.message)
        setLikes(prev => {
          if (prev.includes(currentUser._id)) {
            return prev.filter(id => id !== currentUser._id)
          } else {
            return [...prev, currentUser._id]
          }
        })
      }else{
        toast(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className=' bg-white rounded-lg p-4 shadow-xs space-y-4 w-full max-w-2xl'>
      {/* User info */}
      <div onClick={() => navigate(`/profile/${post.user?._id}`)} className='inline-flex items-center gap-3 cursor-pointer'>
        <img src={post.user?.profile_picture} className='size-10 rounded-full shadow' />
        <div>
          <div className='flex items-center space-x-1'>
            <span>{post.user?.full_name}</span>
            <BadgeCheck className='size-4 text-blue-500' />
          </div>
          <div className='text-gray-500 text-sm'>@{post.user?.username} <span className=' px-1 opacity-70'> • </span> {moment(post.createdAt).fromNow()}  </div>
        </div>
      </div>

      {/* content */}
      {post.content &&
        <div className=' text-gray-800 text-sm whitespace-pre-line' dangerouslySetInnerHTML={{ __html: postWithHashtages }} >

        </div>
      }


      {/* images */}
      <div className='grid grid-cols-2 gap-2'>
        {post.image_urls.map((img, i) => (
          <img src={img} key={i} className={`w-full h-48 object-cover rounded-lg ${post.image_urls.length === 1 && 'col-span-2 h-auto'}`} />
        ))}
      </div>

      {/* Actions */}
      <div className='flex items-center gap-4 text-gray-600 text-sm pt-2 border-t border-gray-300'>

        <div className='flex items-center gap-1'>
          <Heart className={`w-4 h-4 cursor-pointer ${likes.includes(currentUser._id) && 'text-red-500 fill-red-500'} `} onClick={handleLike} />
          <span>{likes.length}</span>
        </div>

        <div className='flex items-center gap-1'>
          <MessageCircle className={`w-4 h-4 cursor-pointer'} `}  />
          <span>{12}</span>
        </div>

        <div className='flex items-center gap-1'>
          <Share2Icon className={`w-4 h-4 cursor-pointer'} `}  />
          <span>{12}</span>
        </div>

      </div>


    </div>
  )
}

export default PostCard