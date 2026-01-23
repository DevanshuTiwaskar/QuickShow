import React from 'react'

const BlurCircle = ({ top, left, right, bottom }) => {
  return (
    <div
      className="absolute -z-10 w-80 h-80 bg-primary/30 rounded-full blur-[140px] pointer-events-none"
      style={{
        top,
        left,
        right,
        bottom
      }}
    />
  )
}

export default BlurCircle
