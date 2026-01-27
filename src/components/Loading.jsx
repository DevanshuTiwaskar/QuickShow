import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[80vh] w-full gap-5">
      {/* Animation Container */}
      <div className="relative flex justify-center items-center h-24 w-24">
        {/* Outer Ring - Dynamic fast spin */}
        <div className="absolute animate-[spin_3s_linear_infinite] rounded-full h-24 w-24 border-t-2 border-b-2 border-primary shadow-[0_0_10px_var(--color-primary)]"></div>
        
        {/* Middle Ring - Slower reverse feel or offset */}
        <div className="absolute animate-[spin_2s_linear_infinite_reverse] rounded-full h-16 w-16 border-r-2 border-l-2 border-white/50"></div>
        
        {/* Inner Pulsing Core */}
        <div className="rounded-full h-6 w-6 bg-primary animate-pulse shadow-[0_0_20px_var(--color-primary)]"></div>
      </div>

      {/* Futuristic Text */}
      <div className="flex flex-col items-center gap-1 mt-4">
        <h2 className="text-xl font-light tracking-[0.4em] text-white/90 animate-pulse font-mono">
          PROCESSING
        </h2>
        {/* Glowing Line */}
        <div className="h-[2px] w-32 bg-linear-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_var(--color-primary)]"></div>
      </div>
    </div>
  );
};

export default Loading;