import { ArrowLeft, Sparkle, TextIcon, Type, Upload } from 'lucide-react'
import React, { useState } from 'react'
import { bgColors, fonts, fontSizes } from '../lib/styleOptions'
import toast from 'react-hot-toast'


const StoryModel = ({ setShowModel, fetchStories }) => {


    const [mode, setMode] = useState("text")
    const [text, setText] = useState("")
    const [media, setMedia] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [background, setBackground] = useState(bgColors[0])
    const [font, setFont] = useState(fonts[0])
    const [textSize, setTextSize] = useState(fontSizes[0])
    const [isBold, setIsBold] = useState(false)


    const handleMediaUpload = (e) => {

        const file = e.target.files?.[0]
        if (file) {
            setMedia(file)
            setPreviewUrl(URL.createObjectURL(file))
        }

    }


    const [colorIndex, setColorIndex] = useState(0)

    const colorChange = () => {
        const nextIndex = (colorIndex + 1) % bgColors.length
        setColorIndex(nextIndex)
        setBackground(bgColors[nextIndex])
    }

    const [fontIndex, setFontIndex] = useState(0)

    const fontChange = () => {
        const nextIndex = (fontIndex + 1) % fonts.length
        setFontIndex(nextIndex)
        setFont(fonts[nextIndex])
    }

    const [textSizeIndex, setTextSizeIndex] = useState(0);

    const changeTextSize = () => {
        const nextIndex = (textSizeIndex + 1) % fontSizes.length;
        setTextSizeIndex(nextIndex);
    };




    const handleCreateStory = async () => {

    }

    return (
        <div className=' fixed inset-0 z-110 bg-gray-500/40 lg:bg-black/50 backdrop-blur flex items-center justify-center text-white p-4 '>
            <div className='w-full max-w-md'>
                <div className='text-center mb-4 flex items-center justify-between'>
                    <div className='flex gap-2  bg-black/30 py-1 px-3 rounded-lg '>
                        <button onClick={() => setShowModel(false)} className=' active:scale-98 transition duration-150 rounded-full cursor-pointer select-none '>
                            <ArrowLeft />
                        </button>
                        <h2 className=' text-lg font-semibold rounded-lg select-none  '>Create story</h2>
                    </div>
                    <span className='w-10'></span>

                </div>

                <div className=' rounded-lg p-6 h-96 flex items-center justify-center relative' style={{ backgroundColor: background }}>
                    {mode === 'text' && (

                        <textarea
                            className=' bg-transparent text-white w-full h-full text-lg resize-none focus:outline-none'
                            placeholder='What’s on your mind...'
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                            style={{
                                fontFamily: fonts[fontIndex],
                                fontSize: fontSizes[textSizeIndex],
                                fontWeight: isBold ? '900' : '400'
                            }}
                        />
                    )}
                    {
                        mode === 'media' && previewUrl && (
                            media?.type.startsWith('image') ? (
                                <img src={previewUrl} className=' object-contain max-h-full' alt="" />
                            ) : (
                                <video src={previewUrl} className=' object-contain max-h-full'></video>
                            )
                        )
                    }
                </div>



                <div className='bg-black/30 mt-4 px-3 py-1 text-lg rounded-lg flex justify-between '>
                    <div className='flex gap-4  '>
                        <button
                            className='select-none active:scale-95 transition duration-150 cursor-pointer px-1 '
                            onClick={fontChange}
                            style={{ fontFamily: fonts[fontIndex] }}
                        >
                            Aa
                        </button>
                        <button
                            onClick={changeTextSize}
                            className=" select-none cursor-pointer active:scale-95 transition duration-150 px-1 "

                        >
                            A↕
                        </button>
                        <button
                            onClick={() => setIsBold(!isBold)}
                            className={`cursor-pointer active:scale-95 transition duration-150 px-1 select-none ${isBold ? 'font-bold' : ''}`}
                        >
                            B
                        </button>
                    </div>

                    <div className=''>
                        <h2 className='active:scale-95 transition duration-150 cursor-pointer text-lg font-semibold bg-black/30 py-1 px-3 rounded-lg select-none '

                            onClick={colorChange}
                            style={{ backgroundColor: background }}
                        >
                            colors
                        </h2>
                    </div>
                </div>

                <div className='flex gap-2 mt-4'>
                    <button onClick={() => { setMode('text'); setMedia(null) }} className={`flex-1 cursor-pointer active:scale-98 transition duration-150 flex items-center justify-center gap-2 p-2 rounded-lg ${mode === 'text' ? "bg-white text-black" : "bg-zinc-800"} `}>
                        <TextIcon size={18} /> Text
                    </button>

                    <label className={`active:scale-98 transition duration-150 flex-1 flex items-center justify-center gap-2 p-2 rounded-lg cursor-pointer ${mode === 'media' ? "bg-white text-black" : "bg-zinc-800"}`}>
                        <input onClick={() => setText("")} onChange={(e) => { handleMediaUpload(e); setMode('media') }} type="file" accept='image/*, video/*' className='hidden' />
                        <Upload size={18} /> Photo / Video
                    </label>


                </div>

                <button
                    onClick={() => toast.promise(handleCreateStory(), {
                        loading: 'creating...'
                        , success: <p>Strory added</p>,
                        error: e => <p>{e.message}</p>
                    })}
                    className='select-none flex gap-4 items-center justify-center text-white py-3 mt-4 w-full rounded-lg bg-gradient-to-r from-red-600 to-indigo-600  hover:to-indigo-700 hover:from-red-700 active:scale-95 transition duration-200 cursor-pointer'>
                    <Sparkle size={18} /> create story
                </button>
            </div>
        </div>
    )
}

export default StoryModel