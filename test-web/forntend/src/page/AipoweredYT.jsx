import React, { useState } from 'react'
import SearchBox from '../component/SearchBox'

const AipoweredYT = () => {
  const [results, setResults] = useState([]);

  return (
    <div className='relative -mt-6 z-20 mx-auto max-w-[1440px] min-h-[85vh] bg-[#E7E7E7] text-black p-8 shadow-2xl flex flex-col'>
      {/* Search Bar + Search & History Buttons */}
      <SearchBox 
        setResults={setResults} 
        endpoint="http://localhost:5000/api/search/youtube"
        placeholder="Search with Yt-Ai powered search..."
      />

      {/* Result For Your Search Header */}
      <div className='mt-8'>
        <p className='text-[15px] font-normal text-[#333333] mb-6'>
          Result for your Yt-Ai powered search
        </p>

        {results.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {results.map((item, index) => (
              <div 
                key={index}
                className='flex gap-4 p-4 bg-[#DFDFDF]/70 hover:bg-[#D7D7D7] border border-neutral-300 rounded transition-all'
              >
                {item.thumbnail && (
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className='w-44 h-28 object-cover rounded bg-black shrink-0'
                  />
                )}
                <div className='flex flex-col justify-between flex-1 min-w-0'>
                  <div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-base font-medium text-neutral-900 line-clamp-2 hover:text-[#D17E1C]'
                    >
                      {item.title}
                    </a>
                    {item.qualityScore && (
                      <span className='inline-block text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded mt-1.5'>
                        AI Score: {item.qualityScore}%
                      </span>
                    )}
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='text-xs text-red-700 hover:underline font-medium'
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-xs text-neutral-500 italic'>
            Search videos above to view AI-powered results.
          </p>
        )}
      </div>
    </div>
  )
}

export default AipoweredYT
