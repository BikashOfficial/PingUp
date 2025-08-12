{/* Profile Pic */}
                        <div className='flex flex-col items-start gap-3'>
                            <label htmlFor="profile_picture" className=' cursor-pointer block text-sm font-medium text-gray-700 mb-1'>
                                Profile Picture
                                <input hidden type="file" accept='image/*' id='profile_picture' className='w-full p-3 border-gray-200 rounded-lg outline-none border-2 '
                                    onChange={(e) => setEditForm({ ...editForm, profile_picture: e.target.files[0] })}
                                />

                                <div className=' group/profile relative'>
                                    <img src={editForm.profile_picture ? URL.createObjectURL(editForm.profile_picture) : user.profile_picture} className='size-24 rounded-full object-cover mt-2' />

                                    <div className='absolute hidden group-hover/profile:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-full items-center justify-center' >
                                        <Pencil className='w-5 h-5 text-white' />
                                    </div>
                                </div>
                            </label>
                        </div>

                        {/* cover Photo */}
                        <div className='flex flex-col items-start gap-3'>
                            <label htmlFor="cover" className=' cursor-pointer block text-sm font-medium text-gray-700 mb-1'>
                                Cover Photo
                                <input hidden type="file" accept='image/*' id='cover' className='w-full p-3 border-gray-200 rounded-lg outline-none border-2 '
                                    onChange={(e) => setEditForm({ ...editForm, cover_photo: e.target.files[0] })}
                                />

                                <div className=' group/profile relative'>
                                    <img src={editForm.cover_photo ? URL.createObjectURL(editForm.cover_photo) : user.cover_photo} className='w-80 h-40 rounded-lg object-cover mt-2' />

                                    <div className='absolute hidden group-hover/profile:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-lg items-center justify-center' >
                                        <Pencil className='w-5 h-5 text-white' />
                                    </div>
                                </div>
                            </label>
                        </div>

