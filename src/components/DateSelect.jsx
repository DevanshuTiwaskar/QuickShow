import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

const DateSelect = ({ dateTime,id }) => {
  // 1. Get the first date from data to select it by default
  const initialDate = dateTime ? Object.keys(dateTime)[0] : null
  const [selectedDate, setSelectedDate] = useState(null)

  const navigate = useNavigate()

  const onBookHandle = ()=>{
    if(!selectedDate){
      toast.error('Please select a date')
    }
    navigate(`/movies/${id}/${selectedDate}`)
     scrollTo(0, 0)
  }

  // Helper to scroll the date list (optional visual polish)
  const scrollContainer = (direction) => {
    const container = document.getElementById('date-scroll-container')
    if(container) {
        container.scrollBy({ left: direction === 'left' ? -100 : 100, behavior: 'smooth' })
    }
  }

  return (
    <div id='dateSelect' className='pt-20'>
      {/* Container Box */}
      <div className='flex flex-col md:flex-row items-center justify-between gap-8 relative px-8 py-6 bg-primary/5 border border-primary/20 rounded-xl overflow-hidden'>
        
        {/* Background Blurs (z-0 puts them behind content) */}
        <div className="absolute top-0 left-0 z-0">
             <BlurCircle top='-50px' left='-50px' />
        </div>
        
        {/* Left Side: Label + Dates */}
        <div className='relative z-10 w-full md:w-auto flex-1'>
          <p className='text-lg font-semibold text-gray-200 mb-4'>Choose Date</p>
          
          <div className='flex items-center gap-4'>
             {/* Left Arrow */}
             <button onClick={() => scrollContainer('left')} className='p-2 hover:bg-white/10 rounded-full transition cursor-pointer'>
                <ChevronLeft className="w-6 h-6 text-gray-400" />
             </button>

             {/* Date List (Scrollable) */}
             <div id="date-scroll-container" className='flex gap-3 overflow-x-auto no-scrollbar scroll-smooth w-full md:max-w-xl'>
                {Object.keys(dateTime).map((date) => {
                    const dateObj = new Date(date)
                    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' }) // e.g., "Tue"
                    const dayNum = dateObj.getDate() // e.g., 15
                    
                    const isSelected = selectedDate === date

                    return (
                        <button 
                            key={date} 
                            onClick={() => setSelectedDate(date)}
                            className={`flex flex-col items-center justify-center min-w-[3.5rem] h-14 rounded-lg cursor-pointer transition-all duration-200 border
                                ${isSelected 
                                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30 scale-105' // Active Style
                                    : 'bg-neutral-800 border-white/5 text-gray-400 hover:bg-neutral-700 hover:text-white' // Inactive Style
                                }
                            `}
                        >
                            <span className='text-xs font-medium uppercase'>{dayName}</span>
                            <span className='text-lg font-bold leading-none'>{dayNum}</span>
                        </button>
                    )
                })}
             </div>

             {/* Right Arrow */}
             <button onClick={() => scrollContainer('right')} className='p-2 hover:bg-white/10 rounded-full transition cursor-pointer'>
                <ChevronRight className="w-6 h-6 text-gray-400" />
             </button>
          </div>
        </div>

        {/* Right Side: Book Button */}
        <div className='relative z-10 min-w-fit'>
            <button onClick={onBookHandle} className='px-10 py-3 text-white bg-primary hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-300 rounded-lg font-medium shadow-xl shadow-primary/20 cursor-pointer'>
                Book Now
            </button>
        </div>

      </div>
    </div>
  )
}

export default DateSelect