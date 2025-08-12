import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets';
import { Image, X } from 'lucide-react';
import toast from 'react-hot-toast';

const CreatePost = () => {


  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = dummyUserData;


  const handleSubmit = async () => {

  }

  return (
    <div className='min-h-screen'>
      <div className='max-w-6xl mx-auto p-6'>
        {/* title */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-slate-600'>Create Post</h1>
          <p className='text-slate-400'>share your thoughts with the world</p>
        </div>

        {/* form */}
        <div className='max-w-xl bg-white p-4 sm:p-8 sm:pb-3 rounded-lg shadow-md space-y-4'>
          {/* header */}
          <div className='flex items-center gap-3'>
            <img src={user.profile_picture} className='size-12 rounded-full shadow-md' />
            <div>
              <h2 className='font-semibold'>{user.full_name}</h2>
              <p className='text-sm text-gray-500' >@{user.username}</p>
            </div>
          </div>
          {/* text area */}
          <textarea
            placeholder="What's happening ?"
            className=' rounded-lg p-1 placeholder-gray-400 w-full resize-none h-30 lg:h-20 mt-4 text-sm outline-none border-2 border-gray-300'
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />

          {/* images */}
          {
            images.length > 0 && <div className='flex flex-wrap gap-2 mt-4'>
              {
                images.map((img, i) => (
                  <div key={i} className='relative group'>
                    <img onDoubleClick={() => setImages(images.filter((_, idx) => idx !== i))} src={URL.createObjectURL(img)} className='h-20 rounded-lg' />
                    <div
                      onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                      className=' absolute hidden group-hover:flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/40 rounded-lg cursor-pointer'
                    >
                      <X className='size-6 text-white' />
                    </div>
                  </div>
                ))
              }
            </div>
          }

          {/* btm bar */}
          <div className=' flex items-center justify-between pt-3 border-t border-gray-300' >
            <label htmlFor="images" className='flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer '>
              <Image className='size-6' />
            </label>
            <input type="file" accept='image/*' hidden multiple onChange={(e) => setImages([...images, ...e.target.files])} id="images" />

            <button disabled={loading} onClick={() => toast.promise(
              handleSubmit(),
              {
                loading: 'uploading...',
                success: <p>Post published</p>,
                error: <p>Post Not added</p>,

              }
            )} className='text-sm bg-indigo-500 hover:bg-indigo-700 active:scale-97 transition text-white font-medium px-8 py-2 rounded-lg cursor-pointer '>
              Publish Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost