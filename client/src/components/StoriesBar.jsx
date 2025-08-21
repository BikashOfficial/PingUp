import React, { useEffect, useState } from 'react'
import { dummyStoriesData } from '../assets/assets'
import { Plus } from 'lucide-react'
import moment from 'moment'
import StoryModel from './StoryModel'
import StoryViewer from './StoryViewer'
import { useAuth } from '@clerk/clerk-react'
import api from '../api/axios'
import toast from 'react-hot-toast'

const StoriesBar = () => {

    const { getToken } = useAuth()

    const [stories, setStories] = useState([])
    const [showModel, setShowModel] = useState(false)
    // const [viewModel, setViewModel] = useState(null)
    const [viewStory, setViewStory] = useState(null)

    const fetchStories = async () => {
        try {
            const token = await getToken();

            const { data } = await api.get(`/api/story/get`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (data.success) {
                setStories(data.stories)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchStories()
    }, [])

    return (
        <div className='scroll-smooth w-screen  sm:w-[calc(100vw-240px)] lg:max-w-2xl no-scrollbar overflow-x-auto px-4'>
            <div className='flex gap-4 pb-5'>
                {/* Add story card */}
                <div onClick={() => setShowModel(true)} className='rounded-lg shadow-sm min-w-30 max-w-30 aspect-[3/4] cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-dashed border-indigo-500'>
                    <div className='h-full flex flex-col items-center justify-center p-4'>
                        <div className='size-10 bg-indigo-500 rounded-full flex items-center justify-center mb-3'>
                            <Plus className='size-5 text-white' />
                        </div>
                        <p className='text-sm font-medium text-slate-700 text-center'>Create story</p>
                    </div>
                </div>
                {/* story cards */}
                {

                    //onClick={() => setViewStory({ ...story, index: i })}
                    //onClick={() => setViewStory(story)}
                    stories.map((story, i) => (
                        <div onClick={() => setViewStory({ ...story, index: i })} key={i} className='relative rounded-lg shadow min-w-30 max-w-30 max-h-40 cursor-pointer hover:shadow-lg transition-all duration-200 bg-indigo-500 hover:bg-indigo-700'>
                            <img className='absolute size-8 top-3 left-3 z-10 rounded-full ring ring-gray-100 shadow' src={story.user.profile_picture} alt="" />
                            <p className='absolute top-16 left-3 text-white/60 text-sm truncate max-w-24'>{story.content}</p>
                            <p className='text-white absolute bottom-1 right-2 z-10 text-xs'>{moment(story.createdAt).fromNow()}</p>


                            {/* Background for all story types */}
                            <div className='absolute inset-0 z-1 rounded-lg overflow-hidden'
                                style={{
                                    backgroundColor: story.media_type === 'text' ? story.background_color : 'black'
                                }}>
                                {story.media_type === 'text' ? (
                                    <div className='h-full w-full flex items-center justify-center p-2 text-white/80'>
                                        <p className='line-clamp-3 text-sm text-center'
                                            style={{
                                                fontFamily: story.font || 'inherit',
                                                fontWeight: story.isBold ? '700' : '400'
                                            }}>
                                            {story.content}
                                        </p>
                                    </div>
                                ) : story.media_type === 'image' ? (
                                    <img 
                                        src={story.media_url} 
                                        alt="" 
                                        className='h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80' 
                                        loading="lazy"
                                    />
                                ) : (
                                    <video 
                                        src={story.media_url} 
                                        className='h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80'
                                        preload="metadata"
                                    />
                                )}
                            </div>

                        </div>

                    ))
                }
            </div>


            {/* add story Modal */}
            {showModel && <StoryModel setShowModel={setShowModel} fetchStories={fetchStories} />}

            {/* view story Modal */}
            {viewStory && <StoryViewer stories={stories} viewStory={viewStory} setViewStory={setViewStory} />}
        </div>
    )
}

export default StoriesBar