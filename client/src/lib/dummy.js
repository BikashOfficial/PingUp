
// import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';

// // --- Import your actual components ---
// // Make sure you have these components in your project files.
// import Sidebar from '../components/Sidebar'; 
// import Navbar from '../components/Navbar';
// import Loading from '../components/Loading';
// import { dummyUserData } from '../assets/assets'; // Assuming you have this data file

// const Layout = () => {
//     const user = dummyUserData;
//     const [sidebarOpen, setSidebarOpen] = useState(false);

//     if (!user) {
//         return <Loading />;
//     }

//     return (
//         // Main container for the entire screen
//         <div className='w-full flex h-screen bg-slate-100'>
            
//             {/* Your Sidebar component */}
//             <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//             {/* This container holds the main content and the mobile navbar */}
//             <div className="flex-1 flex flex-col relative">

//                 {/* Navbar for mobile only */}
//                 {/* It's fixed to the top with your blur effect. The left-0 and right-0 ensure it spans the full width of its container. */}
//                 {/* <div className='lg:hidden bg-white/60 backdrop-blur-lg border-b border-gray-200 fixed top-0 left-0 right-0 z-40'>
//                     <Navbar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
//                 </div> */}

//                 {/* Main Content Area */}
//                 {/* This is the div that will scroll. flex-1 makes it take up remaining space. */}
//                 <main
//                     className='flex-1 overflow-y-auto'
//                     // This onClick will close the sidebar if you click on the main content
//                     onClick={() => { if (sidebarOpen) setSidebarOpen(false); }}
//                 >
//                     {/* --- THE FIX IS HERE ---
//                       This wrapper div adds top padding (`pt-16`) ONLY on small screens.
//                       This padding pushes your content down by the height of the fixed navbar (assuming h-16, or 4rem).
//                       On large screens (`lg:`), the padding is removed (`lg:pt-0`) because the fixed navbar is hidden.
//                     */}
//                     <div className="pt-16 lg:pt-0">
//                         <Outlet />
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default Layout;


// import React, { useState } from 'react'
// import Sidebar from '../components/Sidebar'
// import { Outlet } from 'react-router-dom'
// import { Menu, X } from 'lucide-react'
// import { dummyUserData } from '../assets/assets'
// import Loading from '../components/Loading'
// import Navbar from '../components/Navbar'

// const Layout = () => {

//   const user = dummyUserData
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   return user ? (
//     <div className='w-full flex h-screen'>
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//       {/* Navbar for mobile only */}
//       <div className=' bg-white/60 backdrop-blur border-2 border-gray-200 mx-2 rounded-lg mt-1 lg:hidden md:hidden fixed top-0 left-0 right-0 z-40  shadow-lg shadow-black/20'>
//         <Navbar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
//       </div>

//       {/* <div className='bg-slate-100 flex-1 flex-col overflow-y-auto lg:pt-0 md:pt-0' onClick={() => setSidebarOpen(false)}>

//         <Outlet />

//       </div> */}

//       <main
//         className='flex-1 overflow-y-auto'
//         onClick={() => { if (sidebarOpen) setSidebarOpen(false); }}
//       >
//         <div className="pt-0 lg:pt-0">
//           <Outlet />
//         </div>
//       </main>


//     </div>
//     // </div>
//   ) : (
//     <Loading />
//   )
// }

// export default Layout


// import React, { useEffect, useState } from 'react'
// import { dummyPostsData } from '../assets/assets'
// import Loading from '../components/Loading'
// import StoriesBar from '../components/StoriesBar'
// import PostCard from '../components/PostCard'

// const Feed = () => {

//   const [feeds, setFeeds] = useState([])
//   const [loading, setLoading] = useState(true)

//   const fetchFeeds = async () => {
//     setFeeds(dummyPostsData)
//     setLoading(false)
//   }

//   useEffect(() => {
//     fetchFeeds()
//   }, [])

//   return !loading ? (
//     <>
      
//       <div className='h-full overflow-y-scroll no-scrollbar py-4 xl:pr-5 flex items-start justify-center xl:gap-8'>
//         {/* stories and post list */}
//         <div>
//           <StoriesBar />
//           <div className='p-4 space-y-20'>
//             {/* <PostCard /> */}
//             {feeds.map((post) => (
//               <PostCard key={post._id} post={post} />
//             ))}
//           </div>
//         </div>


//         {/* Right side bar */}
//         <div className='hidden lg:block md:block'>
//           <div>
//             <h1>Sponsored</h1>
//           </div>
//           <h1>Recent messages</h1>
//         </div>


//       </div>
//     </>


//   ) : (<Loading />)
// }

// export default Feed
