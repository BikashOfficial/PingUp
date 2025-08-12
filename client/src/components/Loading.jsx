import React from 'react'

const Loading = ({ height = '100vh' }) => {
  return (
    <div
      style={{ height }}
      className='flex flex-col pb-30 md:p-0 lg:p-0 items-center justify-center bg-slate-50 text-gray-600'
    >
      <div className='relative w-14 h-14'>
        <div className='absolute inset-0 rounded-full border-4 border-t-indigo-600 border-b-indigo-200 border-l-transparent border-r-transparent animate-spin'></div>
      </div>
      <p className='mt-4 text-sm font-medium tracking-wide text-indigo-500 animate-pulse'>
        Loading...
      </p>
    </div>
  )
}

export default Loading
