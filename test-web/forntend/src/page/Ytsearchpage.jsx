import React, { useState } from 'react'
import SearchBox from '../component/SearchBox'
import { Play, ExternalLink } from 'lucide-react'

const Ytsearchpage = () => {
  const [results, setResults] = useState([]);

  return (
    <div className='relative -mt-8 z-20 mx-auto max-w-[1440px] min-h-[80vh] bg-[#E7E7E7] text-black p-8 shadow-2xl flex flex-col'>
      {/* Search Bar + Search & History Buttons */}
      <SearchBox 
        setResults={setResults} 
        endpoint="http://localhost:5000/api/ytsearch"
        placeholder="Search YouTube videos..."
      />

      {/* Result For Your Search Header */}
      <div className='mt-8'>
        <p className='text-[15px] font-normal text-[#333333] mb-6'>
          Result for your YouTube search
        </p>

        {results.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {results.map((item, index) => (
              <div 
                key={index}
                className='flex gap-4 p-4 bg-[#DFDFDF]/70 hover:bg-[#D7D7D7] border border-neutral-300 rounded transition-all group'
              >
                {/* Video Thumbnail */}
                {item.thumbnail ? (
                  <div className='relative w-44 h-28 shrink-0 overflow-hidden rounded bg-black'>
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
                    />
                    <div className='absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                      <div className='p-2 rounded-full bg-red-600 text-white'>
                        <Play size={16} fill="white" />
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Video Details */}
                <div className='flex flex-col justify-between flex-1 min-w-0'>
                  <div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-base font-medium text-neutral-900 line-clamp-2 hover:text-red-700 transition-colors'
                    >
                      {item.title}
                    </a>
                    {item.content && (
                      <p className='text-xs text-neutral-600 line-clamp-2 mt-1'>
                        {item.content}
                      </p>
                    )}
                  </div>

                  <div className='pt-2'>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='inline-flex items-center gap-1 text-xs text-red-700 hover:underline font-medium'
                    >
                      <span>Watch on YouTube</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-xs text-neutral-500 italic'>
            Search for videos above to view YouTube results.
          </p>
        )}
      </div>
    </div>
  )
}

export default Ytsearchpage
