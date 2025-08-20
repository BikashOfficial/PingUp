import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets'
import { ArrowLeftIcon, Pencil, Save } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { updateUser } from '../features/user/userSlice';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

const ProfileModel = ({ setShowEdit }) => {

    const dispatch = useDispatch()
    const { getToken } = useAuth()

    const user = useSelector((state) => state.user.value);

    const [editForm, setEditForm] = useState({
        username: user.username,
        full_name: user.full_name,
        bio: user.bio,
        location: user.location,
        profile_picture: null,
        cover_photo: null,
    })


    const handleSaveProfile = async (e) => {
        e.preventDefault();
        try {

            const userData = new FormData();
            const { full_name, username, bio, location, profile_picture, cover_photo } = editForm

            userData.append('username', username);
            userData.append('full_name', full_name);
            userData.append('bio', bio);
            userData.append('location', location);
            if (profile_picture) {
                userData.append('profile', profile_picture);
            }
            if (cover_photo) {
                userData.append('cover', cover_photo);
            }

            const token = await getToken()
            dispatch(updateUser({ userData, token }))

            setShowEdit(false)
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='  fixed px-3 py-3 lg:p-0 md:p-0 top-0 bottom-0 right-0 z-110 w-full max-h-screen overflow-y-scroll bg-gray-700/10 backdrop-blur-xl '>
            <div className='max-w-2xl sm:py-4 mx-auto'>
                <div className='bg-white rounded-lg h-screen shadow p-6'>
                    <div className=' flex gap-2 mb-7  items-center justify-between'>
                        <div className='flex gap-2  items-center'>
                            <ArrowLeftIcon size={30} onClick={() => setShowEdit(false)} className=' cursor-pointer mr-2 text-gray-600' />
                            <h1 className='text-2xl font-bold text-gray-700 '>Edit Profile</h1>
                        </div>

                        <div>
                            <button className='bg-green-600/90 px-4 py-1.5 rounded-lg cursor-pointer hover:bg-green-700/90 transition duration-200 shadow-sm shadow-green-600 active:scale-97 border-none text-white' onClick={e => toast.promise(
                                handleSaveProfile(e), { loading: 'Saving...' }
                            )} type='button'>
                                Save Changes
                            </button>
                        </div>
                    </div>
                    <form className='space-y-4' onSubmit={e => toast.promise(
                        handleSaveProfile(e), { loading: 'Saving...' }
                    )}>




                        <div className="max-w-2xl">
                            <div className="bg-white rounded-lg">
                                <div className='max-w-3xl -mt-0.5'>
                                    {/* profile crad */}
                                    <div className='bg-white rounded-2xl shadow overflow-hidden'>
                                        {/* cover photo */}
                                        <div className='h-40 md:h-56 bg-indigo-200'>
                                            <img
                                                src={
                                                    editForm.cover_photo
                                                        ? URL.createObjectURL(editForm.cover_photo)
                                                        : user.cover_photo
                                                }
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className='relative py-4 px-6 mb-10 md:px-8 bg-white'>
                                            <div className='flex flex-col md:flex-row items-start gap-6'>
                                                <div className='absolute -top-16 border-4 border-white shadow-lg rounded-full overflow-hidden w-32 h-32'>
                                                    <img
                                                        src={
                                                            editForm.profile_picture
                                                                ? URL.createObjectURL(editForm.profile_picture)
                                                                : user.profile_picture
                                                        }
                                                        className='w-full h-full object-cover'
                                                        alt="Profile"
                                                    />
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='mt-2 flex gap-3'>
                            <p className='text-sm font-medium text-gray-700' >update :</p>
                            <div className="flex flex-col items-start gap-3 ">
                                <label
                                    htmlFor="profile_picture"
                                    className=" cursor-pointer block text-sm font-medium active:scale-97 duration-200 transition bg-indigo-400 text-white px-2 shadow-md rounded-lg"
                                >
                                    Profile Picture
                                    <input
                                        hidden
                                        type="file"
                                        accept="image/*"
                                        id="profile_picture"
                                        className="w-full p-3 border-gray-200 rounded-lg outline-none border-2 "
                                        onChange={(e) =>
                                            setEditForm({ ...editForm, profile_picture: e.target.files[0] })
                                        }
                                    />

                                </label>
                            </div>

                            {/* cover Photo */}
                            <div className="flex flex-col items-start gap-3">
                                <label
                                    htmlFor="cover"
                                    className=" cursor-pointer block text-sm  bg-indigo-400 font-medium active:scale-97 duration-200 transition shadow-md text-white px-2 rounded-lg"
                                >
                                    Cover Photo
                                    <input
                                        hidden
                                        type="file"
                                        accept="image/*"
                                        id="cover"
                                        className="w-full p-3 border-gray-200 rounded-lg outline-none border-2 "
                                        onChange={(e) =>
                                            setEditForm({ ...editForm, cover_photo: e.target.files[0] })
                                        }
                                    />
                                    {/* <div className=" group/profile relative">
                                        <div className="absolute hidden group-hover/profile:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-lg items-center justify-center">
                                            <Pencil className="w-5 h-5 text-white" />
                                        </div>
                                    </div> */}
                                </label>
                            </div>
                        </div>



                        <div className=''>
                            <label htmlFor="name" className='cursor-pointer block text-sm font-medium text-gray-700 mb-1'>
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className='w-full p-3 text-gray-700 border-2 outline-none border-gray-200 rounded-lg' placeholder='enter your fullname...'
                                value={editForm.full_name}
                                onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                            />
                        </div>
                        <div className=''>
                            <label htmlFor="username" className='cursor-pointer block text-sm font-medium text-gray-700 mb-1'>
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className='w-full p-3 text-gray-700 border-2 outline-none border-gray-200 rounded-lg' placeholder='enter your username...'
                                value={editForm.username}
                                onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                            />
                        </div>
                        <div className=''>
                            <label htmlFor="bio" className='cursor-pointer block text-sm font-medium text-gray-700 mb-1'>
                                Bio
                            </label>
                            <textarea
                                type="text"
                                id="bio"
                                rows={3}
                                className=' w-full p-3 text-gray-700 border-2 outline-none border-gray-200 rounded-lg' placeholder='enter your bio...'
                                value={editForm.bio}
                                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                            />
                        </div>
                        <div className=''>
                            <label htmlFor="loc" className='cursor-pointer block text-sm font-medium text-gray-700 mb-1'>
                                Location
                            </label>
                            <input
                                type="text"
                                id="loc"
                                className='w-full p-3 text-gray-700 border-2 outline-none border-gray-200 rounded-lg' placeholder='enter your location...'
                                value={editForm.username}
                                onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                            />
                        </div>


                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProfileModel