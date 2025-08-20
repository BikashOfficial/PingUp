import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyPostsData, dummyUserData } from '../assets/assets'
import Loading from '../components/Loading'
import UserProfileInfo from '../components/UserProfileInfo'
import PostCard from '../components/PostCard'
import moment from 'moment'
import ProfileModel from '../components/ProfileModel'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import api from '../api/axios'

const Profile = () => {

  const { getToken } = useAuth()

  const currentUser = useSelector((state) => state.user.value)

  const { profileId } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState('posts')
  const [showEdit, setShowEdit] = useState(false)

  const fetchUser = async (profileId) => {
    const token = await getToken()

    try {
      const { data } = await api.post(`/api/user/profiles`, { profileId }, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (data.success) {
        setUser(data.profile)
        setPosts(data.posts)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }


  }

  useEffect(() => {
    if (profileId) {
      fetchUser(profileId)
    } else {
      fetchUser(currentUser._id)
    }
  }, [profileId, currentUser])

  return user ? (
    <div className='relative h-full overflow-y-scroll bg-gray-50 p-3 md:p-6 lg:p-6'>
      <div className='max-w-3xl mx-auto'>
        {/* profile crad */}
        <div className='bg-white rounded-2xl shadow overflow-hidden'>
          {/* cover photo */}
          <div className='h-40 md:h-56 bg-indigo-200'>
            {user?.cover_photo && <img src={user?.cover_photo} className='w-full h-full object-cover' />}
          </div>
          {/* user info */}
          <UserProfileInfo user={user} posts={posts} profileId={profileId} setShowEdit={setShowEdit} />
        </div>

        {/* Tabs */}
        <div className='mt-6'>
          <div className='bg-white rounded-lg shadow p-1 flex max-w-md mx-auto'>
            {["posts", "media", "likes"].map((tab) => (
              <button
                onClick={() => setActiveTab(tab)}
                key={tab}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${activeTab === tab ? "bg-indigo-500 text-white " : "text-gray-600 hover:to-gray-900"}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* posts */}

          {
            activeTab === 'posts' && (
              <div className='mt-6 flex flex-col items-center gap-6'>
                {posts.map((post) => <PostCard key={post._id} post={post} />).reverse()}
              </div>
            )
          }

          {/* Media */}
          {activeTab === 'media' && (
            <div className='flex flex-wrap gap-2 mt-6 max-w-6xl'>
              {
                posts.filter((post) => post.image_urls.length > 0).map((post) => (
                  <>
                    {post.image_urls.map((img, i) => (
                      <Link target='_blank' to={img} key={i} className='relative group' >
                        <img src={img} alt="" className=' rounded-lg lg:w-60 aspect-video object-cover' />
                        <p className='absolute bottom-0 right-0 text-xs p-1 px-3 backdrop-blur-xl text-white opacity-0 group-hover:opacity-100 transition duration-300'>Posted {moment(post.createdAt).fromNow()}</p>
                      </Link>
                    ))}
                  </>
                ))
              }
            </div>
          )}

          {/* Likes  ---  to do  */}
          {/* {activeTab === 'likes' && (
            <div className='flex flex-wrap gap-2 mt-6 max-w-6xl'>
              {
                posts.filter((post) => post.image_urls.length > 0).map((post) => (
                  <>
                    {post.image_urls.map((img, i) => (
                      <Link target='_blank' to={img} key={i} className='relative group' >
                        <img src={img} alt="" className=' rounded-lg lg:w-60 aspect-video object-cover' />
                        <p className='absolute bottom-0 right-0 text-xs p-1 px-3 backdrop-blur-xl text-white opacity-0 group-hover:opacity-100 transition duration-300'>Posted {moment(post.createdAt).fromNow()}</p>
                      </Link>
                    ))}
                  </>
                ))
              }
            </div>
          )} */}

          {activeTab === 'likes' && (
            <div className='pt-20 pb-20 flex items-center flex-col text-center'>
              <img className='w-40 h-40 ' src="https://static.vecteezy.com/system/resources/previews/042/885/765/non_2x/illustration-of-a-sad-boy-looking-lonely-free-png.png" alt="" />
              <p className='text-slate-500'>This feature will be added soon..</p>
            </div>
          )}

        </div>
      </div>


      {/* Edit profile modal */}

      {showEdit && <ProfileModel setShowEdit={setShowEdit} />}

    </div>
  ) : <Loading />
}

export default Profile 