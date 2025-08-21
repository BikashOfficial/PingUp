import { ChevronLeft, ChevronRight, BadgeCheck, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

const StoryViewer = ({ stories, viewStory, setViewStory }) => {
    const [progress, setProgress] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [elapsed, setElapsed] = useState(0)

    const touchStartX = useRef(null)
    const touchStartY = useRef(null)

    const handleSwipe = (dx, dy) => {
        if (Math.abs(dx) > Math.abs(dy)) {
            // Horizontal swipe
            if (dx > 50) goToPrevStory()
            else if (dx < -50) goToNextStory()
        } else {
            // Vertical swipe
            if (dy > 50) setViewStory(null)
        }
    }

    const goToNextStory = () => {
        const nextIndex = viewStory.index + 1
        if (nextIndex < stories.length) {
            setViewStory({ ...stories[nextIndex], index: nextIndex })
            setProgress(0)
            setElapsed(0)
        } else {
            // Last story reached, close viewer
            setViewStory(null)
        }
    }

    const goToPrevStory = () => {
        const prevIndex = viewStory.index - 1
        if (prevIndex >= 0) {
            setViewStory({ ...stories[prevIndex], index: prevIndex })
            setProgress(0)
            setElapsed(0)
        }
    }

    useEffect(() => {
        let timer, progressInterval
        if (viewStory && viewStory.media_type !== 'video') {
            const duration = 10000
            const setTime = 100

            if (!isPaused) {
                progressInterval = setInterval(() => {
                    setElapsed(prev => {
                        const next = prev + setTime
                        setProgress((next / duration) * 100)
                        return next
                    })
                }, setTime)

                timer = setTimeout(() => {
                    goToNextStory()
                }, duration - elapsed)
            }
        }

        return () => {
            clearTimeout(timer)
            clearInterval(progressInterval)
        }
    }, [viewStory, isPaused])

    const handleTouchStart = (e) => {
        const touch = e.touches[0]
        touchStartX.current = touch.clientX
        touchStartY.current = touch.clientY
        setIsPaused(true)
    }

    const handleTouchEnd = (e) => {
        const touch = e.changedTouches[0]
        const dx = touch.clientX - touchStartX.current
        const dy = touch.clientY - touchStartY.current
        handleSwipe(dx, dy)
        setIsPaused(false)
    }

    const handleMouseDown = (e) => {
        touchStartX.current = e.clientX
        touchStartY.current = e.clientY
        setIsPaused(true)
    }

    const handleMouseUp = (e) => {
        const dx = e.clientX - touchStartX.current
        const dy = e.clientY - touchStartY.current
        handleSwipe(dx, dy)
        setIsPaused(false)
    }

    const handleClose = () => setViewStory(null)

    if (!viewStory) return null

    const renderContent = () => {
        switch (viewStory.media_type) {
            case 'image':
                return <img src={viewStory.media_url} className='max-w-full max-h-screen object-contain' />
            case 'video':
                return <video autoPlay controls onEnded={goToNextStory} className='max-h-screen' src={viewStory.media_url} />
            case 'text':
                return (
                    <div className='w-full h-full flex items-center justify-center p-4 sm:p-8'>
                        <div 
                            className='select-none max-w-[85%] sm:max-w-[80%] overflow-y-auto scrollbar-none'
                            style={{
                                fontFamily: viewStory.font || 'inherit',
                                fontSize: viewStory.textSize || '24px',
                                fontWeight: viewStory.isBold ? '900' : '400',
                                textAlign: 'center',
                                color: 'white',
                                wordBreak: 'break-word',
                                maxHeight: '80vh',
                                overflowWrap: 'break-word',
                                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        >
                            {viewStory.content}
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div
            className='fixed inset-0 h-screen bg-black bg-opacity-90 z-110 flex items-center justify-center'
            style={{ backgroundColor: viewStory.media_type === 'text' ? viewStory.background_color : '#000000' }}
        >
            {/* Progress Bar */}
            <div className='absolute top-0 left-0 w-full h-1 bg-gray-700'>
                <div style={{ width: `${progress}%` }} className='h-full bg-white transition-all duration-100 linear'></div>
            </div>

            {/* User Info */}
            <div className='absolute top-4 left-4 flex items-center space-x-3 p-2 px-4 sm:p-3 sm:px-6 backdrop-blur-2xl rounded-lg bg-white/30'>
                <img src={viewStory.user?.profile_picture} className='size-7 sm:size-8 rounded-full object-cover border border-white' />
                <div className='flex items-center gap-2'>
                    <span className='text-white text-sm'>{viewStory.user?.full_name}</span>
                    <BadgeCheck size={18} className='text-white' />
                </div>
            </div>

            {/* Close Button */}
            <button onClick={handleClose} className='absolute top-5 right-5'>
                <X className='size-8 text-white/70 hover:scale-110 active:scale-95 transition cursor-pointer' />
            </button>

            {/* Left Button */}
            <button
                onClick={goToPrevStory}
                className='hidden lg:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/40 hover:bg-black/70 transition text-white z-20'
            >
                <ChevronLeft size={24} />
            </button>

            {/* Right Button */}
            <button
                onClick={goToNextStory}
                className='hidden lg:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/40 hover:bg-black/70 transition text-white z-20'
            >
                <ChevronRight size={24} />
            </button>


            {/* Content */}
            <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                className='lg:max-w-[90vw] max-h-[90vh] flex items-center justify-center'
            >
                {renderContent()}
            </div>
        </div>
    )
}

export default StoryViewer

// import { BadgeCheck, X } from 'lucide-react'
// import React, { useEffect, useState } from 'react'

// const StoryViewer = ({ viewStory, setViewStory }) => {

//     const [progress, setProgress] = useState(0);
//     const [isPaused, setIsPaused] = useState(false);
//     const [elapsed, setElapsed] = useState(0); // Move `elapsed` to state

//     useEffect(() => {
//         let timer, progressInterval;

//         if (viewStory && viewStory.media_type !== 'video') {
//             const duration = 10000; // Total time in ms
//             const setTime = 100;    // Interval tick in ms

//             if (!isPaused) {
//                 progressInterval = setInterval(() => {
//                     setElapsed((prev) => {
//                         const next = prev + setTime;
//                         setProgress((next / duration) * 100);
//                         return next;
//                     });
//                 }, setTime);

//                 timer = setTimeout(() => {
//                     setViewStory(null);
//                 }, duration - elapsed); // Remaining time only
//             }
//         }

//         return () => {
//             clearTimeout(timer);
//             clearInterval(progressInterval);
//         };
//     }, [viewStory, isPaused]);



//     const handleClose = () => {
//         setViewStory(null)
//     }

//     if (!viewStory) {
//         return null
//     }

//     const renderContent = () => {
//         switch (viewStory.media_type) {
//             case 'image':
//                 return (
//                     <img src={viewStory.media_url} className='max-w-full max-h-screen object-contain' />
//                 );
//             case 'video':
//                 return (
//                     <video autoPlay controls onEnded={handleClose} className='max-h-screen' src={viewStory.media_url} />
//                 );
//             case 'text':
//                 return (
//                     <div className=' select-none w-full h-full flex items-center justify-center p-8 text-white text-2xl text-center'>
//                         {viewStory.content}
//                     </div>
//                 );
//             default:
//                 return null;
//         }
//     }

//     return (
//         <div className='fixed inset-0 h-screen bg-black bg-opacity-90 z-110 flex items-center justify-center ' style={{ backgroundColor: viewStory.media_type === 'text' ? viewStory.background_color : '#000000' }} >
//             {/* Progress Bar */}
//             <div className='absolute top-0 left-0 w-full h-1 bg-gray-700'>
//                 <div style={{ width: `${progress}%` }} className='h-full bg-white transition-all duration-100 linear'>


//                 </div>
//             </div>
//             {/* user info top left */}
//             <div className='absolute top-4 left-4 flex items-center space-x-3 p-2 px-4 sm:p-3 sm:px-6 backdrop-blur-2xl rounded-lg bg-white/30'>
//                 <img src={viewStory.user?.profile_picture} className='size-7 sm:size-8 rounded-full object-cover border border-white' />
//                 <div className='flex items-center gap-2'>
//                     <span className='text-white text-sm'>
//                         {viewStory.user?.full_name}
//                     </span>
//                     <BadgeCheck size={18} className='text-white' />
//                 </div>
//             </div>

//             {/* close btn */}
//             <button onClick={handleClose} className='absolute top-5 right-5'>
//                 <X className='size-8 text-white/70 hover:scale-110 active:scale-95 transition cursor-pointer' />
//             </button>

//             {/* content */}
//             <div
//                 onMouseDown={() => setIsPaused(true)}
//                 onMouseUp={() => setIsPaused(false)}
//                 onTouchStart={() => setIsPaused(true)}
//                 onTouchEnd={() => setIsPaused(false)}
//                 className='lg:max-w-[90vw] max-h-[90vh] flex items-center justify-center'>
//                 {renderContent()}

//             </div>
//         </div>
//     )
// }

// export default StoryViewer