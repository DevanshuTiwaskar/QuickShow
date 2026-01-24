import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import BlurCircle from '../components/BlurCircle'
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react'
import DateSelect from '../components/DateSelect' // Check filename casing!
import MovieCard from '../components/MovieCard'

const MovieDetails = () => {
  const { id } = useParams()
  const [show, setShow] = useState(null)
  const navigate = useNavigate()

  const getShow = () => {
    // Ensure ID comparison works (Number vs String)
    const foundShow = dummyShowsData.find(item => item.id === Number(id))
    
    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData
      })
    }
  }

  useEffect(() => {
    getShow()
  }, [id])

  if (!show) return <div className='text-white text-center pt-20'>Loading...</div>

  return (
    <div className='px-6 md:px-16 lg:px-40 pt-32 pb-20'>
      
      {/* Top Section: Poster & Info */}
      <div className='flex flex-col md:flex-row gap-10 max-w-7xl mx-auto'>
        
        {/* Poster Image */}
        <img 
            src={show.movie.poster_path} 
            alt={show.movie.title} 
            className='max-md:mx-auto rounded-xl h-[450px] md:h-[500px] w-auto object-cover shadow-2xl'
        />

        {/* Movie Details */}
        <div className='relative flex flex-col gap-4 flex-1'>
          <div className="absolute -top-10 -left-10 z-0">
             <BlurCircle top="0" left="0"/> 
          </div>

          <div className="relative z-10">
            <p className='text-primary font-bold tracking-wide text-sm'>ENGLISH</p>
            <h1 className='text-4xl md:text-5xl font-bold text-white mt-2 mb-4 leading-tight'>
                {show.movie.title}
            </h1>
            
            <div className='flex items-center gap-3 text-gray-300 bg-white/5 w-fit px-3 py-1 rounded-full border border-white/10'>
                <StarIcon className='w-4 h-4 text-primary fill-primary'/>
                <span className="font-semibold">{show.movie.vote_average.toFixed(1)}</span>
                <span className="text-xs text-gray-500">|</span>
                <span className="text-sm">User Rating</span>
            </div>

            <p className='text-gray-300 mt-6 text-base leading-relaxed max-w-2xl'>
                {show.movie.overview}
            </p>

            <div className='flex items-center gap-2 text-gray-400 text-sm mt-4 font-medium'>
              <span>{Math.floor(show.movie.runtime / 60)}h {show.movie.runtime % 60}m</span>
              <span>•</span>
              <span>{show.movie.genres.map(genre => genre.name).join(', ')}</span>
              <span>•</span>
              <span>{show.movie.release_date.split('-')[0]}</span>
            </div>
            
            {/* Action Buttons */}
            <div className='flex items-center mt-8 flex-wrap gap-4'>
              <button className='flex items-center gap-2 px-8 py-3 text-sm bg-gray-800 hover:bg-gray-700 text-white transition rounded-lg font-medium cursor-pointer active:scale-95 border border-white/10'>
                <PlayCircleIcon className='w-5 h-5'/>
                Watch Trailer
              </button>
              
              {/* This anchor link creates a smooth scroll to the DateSelect component */}
              <a href="#dateSelect" className='px-10 py-3 text-sm bg-primary hover:bg-primary/90 text-white transition rounded-lg font-medium cursor-pointer active:scale-95 shadow-lg shadow-primary/20'>
                 Buy Ticket
              </a>
              
              <button className='bg-gray-800 hover:bg-gray-700 border border-white/10 p-3 rounded-full transition cursor-pointer text-gray-300 hover:text-red-500'>
                <Heart className='w-5 h-5' />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="max-w-7xl mx-auto mt-20">
        <h2 className='text-xl font-semibold text-white mb-6 pl-2 border-l-4 border-primary'>Top Cast</h2>
        <div className='overflow-x-auto no-scrollbar pb-4'>
            <div className='flex items-start gap-6 w-max'>
              {show.movie.casts.slice(0, 12).map((cast, index) => (
                <div key={index} className='flex flex-col items-center text-center w-24 group cursor-pointer'>
                  <div className="overflow-hidden rounded-full h-20 w-20 mb-3 border-2 border-transparent group-hover:border-primary transition-all">
                    <img src={cast.profile_path} alt={cast.name} className='h-full w-full object-cover group-hover:scale-110 transition-transform duration-300' />
                  </div>
                  <p className='font-medium text-xs text-gray-300 group-hover:text-white transition'>{cast.name}</p>
                </div>
              ))}
            </div>
        </div>
      </div>

      {/* Date Select Component */}
      <div className="max-w-7xl mx-auto mt-12" id="dateSelect">
         <DateSelect dateTime={show.dateTime} id={id} />
      </div>

      <p className='text-lg font-medium mt-20 mb-8'>You May Also Like</p>
      <div className='flex flex-wrap max-sm:justify-center gap-8'>
         {dummyShowsData.slice(0, 4).map((movie,index)=>(
          <MovieCard key={index} movie={movie}/>
         ))}
      </div>
      <div className='flex justify-center mt-20'>
         <button onClick={()=>{navigate('/movies'); scrollTo(0,0)}} className='px-8 py-3 text-sm bg-gray-800 hover:bg-gray-700 text-white transition rounded-lg font-medium cursor-pointer active:scale-95 border border-white/10'>
            Show More
         </button>
      </div>


    </div>
  )
}

export default MovieDetails



// /
// 2:35:25