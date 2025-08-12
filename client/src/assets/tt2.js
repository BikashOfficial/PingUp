<div className="max-w-2xl sm:py-6 mx-auto">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className='max-w-3xl mx-auto mt-1'>
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
                                    <div className='size-32 border-4 border-white shadow-lg absolute -top-16 rounded-full'>
                                        <img
                                            src={
                                                editForm.profile_picture
                                                    ? URL.createObjectURL(editForm.profile_picture)
                                                    : user.profile_picture
                                            }
                                            className=' absolute rounded-full z-2'
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-3 mt-2">
                        <label
                            htmlFor="profile_picture"
                            className=" cursor-pointer block text-sm font-medium text-gray-700 mb-1"
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
                            <div className=" group/profile relative">
                                <div className="absolute hidden group-hover/profile:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-full items-center justify-center">
                                    <Pencil className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* cover Photo */}
                    <div className="flex flex-col items-start gap-3">
                        <label
                            htmlFor="cover"
                            className=" cursor-pointer block text-sm font-medium text-gray-700 mb-1"
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
                            <div className=" group/profile relative">
                                <div className="absolute hidden group-hover/profile:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-lg items-center justify-center">
                                    <Pencil className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>