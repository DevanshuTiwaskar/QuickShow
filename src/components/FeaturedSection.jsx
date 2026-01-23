import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle'
import { dummyShowsData } from '../assets/assets'
import MovieCard from './MovieCard'

const FeaturedSection = () => {
  const navigate = useNavigate()

  return (
    // 1. Added 'relative' here so the BlurCircle positions correctly relative to this section
    <div className='relative px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
      
      {/* 2. Moved BlurCircle here. 
             - 'z-0' keeps it behind text.
             - pointer-events-none ensures it doesn't block clicks. 
      */}
      <div className="absolute top-0 right-0 z-0 pointer-events-none">
         <BlurCircle top='-50px' right="-80px" />
      </div>

      {/* Header Section */}
      <div className='relative z-10 flex items-center justify-between pt-20 pb-10'>
        <p className='text-gray-300 font-medium text-lg'>Now Showing</p>
        
        <button 
          onClick={() => navigate('/movies')} 
          className='group flex items-center gap-2 text-sm text-gray-300 cursor-pointer hover:text-white transition'
        >
            View All
            <ArrowRight className="group-hover:translate-x-0.5 transition w-4 h-4" />
        </button>
      </div>

      {/* 3. LAYOUT FIX: Used CSS Grid instead of Flex for perfect alignment */}
      <div className='relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4'>
        {dummyShowsData.slice(0, 4).map((show) => (
          <div key={show.id} className="flex justify-center"> {/* Centers card in its grid cell */}
            <MovieCard movie={show} />
          </div>
        ))}
      </div>

      {/* Show More Button */}
      <div className='relative z-10 flex justify-center mt-16 pb-20'>
        <button 
          onClick={() => { 
            navigate('/movies'); 
            window.scrollTo(0, 0); // Added 'window.' for safety
          }} 
          className='px-10 py-3 text-sm bg-primary hover:bg-primary/80 transition rounded-md font-medium cursor-pointer text-white'
        >
          Show more
        </button>
      </div>

    </div>
  )
}

export default FeaturedSection