import React, { useState, useEffect } from 'react'
import { Play, PlayCircle, PlayCircleIcon } from 'lucide-react'
import BlurCircle from './BlurCircle'
import { dummyTrailers } from '../assets/assets'

const TrailersSection = () => {
  const [currentTrailer,setcurrentTrailer] = useState(dummyTrailers[0])
  const [isMounted, setIsMounted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  return (
    <section className="relative px-6 md:px-16 lg:px-24 xl:px-44 py-24 overflow-x-hidden">
      <h2 className="text-gray-300 font-medium text-lg max-w-[960px] mx-auto mb-6">Trailers</h2>

      <div className="relative max-w-[960px] mx-auto">
        <BlurCircle top="-140px" right="-180px" />

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black ring-1 ring-white/10 shadow-2xl">
          {!isPlaying ? (
             <div 
               className="relative w-full h-full cursor-pointer group" 
               onClick={() => setIsPlaying(true)}
             >
                <img 
                  src={currentTrailer?.image} 
                  alt="Trailer Thumbnail" 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300" 
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                     <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                        <Play className="w-8 h-8 text-white fill-current translate-x-1" />
                     </div>
                </div>
             </div>
          ) : (
            <iframe 
               src={`https://www.youtube.com/embed/${getYoutubeId(currentTrailer?.videoUrl)}?autoplay=1`}
               className="w-full h-full"
               title="Trailer"
               frameBorder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen
            ></iframe>
          )}
        </div>

         <div className='group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto'>
          {dummyTrailers.map((trailer)=>
            (
              <div key={trailer.image} className='relative group-hover:not-hover:opacity-50 hover:-translate-u-1 duration-300 transition  max-md:h-60 md:max-h-60 cursor-pointer' onClick={()=>setcurrentTrailer(trailer)}>
                

                <img src={trailer.image} alt="tailer" className='rounded-lg w-full h-full object-cover brightness-75' />
                 <PlayCircleIcon strokeWidth={1.6} className='absolute top-1/2 left-1/2 w-5 md:w-8 h-5 md:h-12 -translate-x-1/2 -translate-y-1/2' />

              </div>
            ))}

         </div>

      </div>
    </section>
  )
}

export default TrailersSection