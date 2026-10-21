import React, { useState } from 'react'
import SearchBox from '../component/SearchBox'
import { Play, ExternalLink, Sparkles } from 'lucide-react'

const AipoweredYT = () => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  return (
    <div className='relative -mt-6 z-20 mx-auto max-w-[1440px] min-h-[85vh] bg-[#E7E7E7] text-black p-8 shadow-2xl flex flex-col'>
      {/* Search Bar */}
      <SearchBox 
        setResults={setResults} 
        endpoint="http://localhost:5000/api/search/ai-youtube"
        placeholder="Search YouTube videos..."
        onLoadingChange={setLoading}
      />

      {/* Result For Your Search Header */}
      <div className='mt-8'>
        <p className='text-[15px] font-normal text-[#333333] mb-6'>
          Result for your YouTube search
        </p>

        {loading ? (
          <div className='py-12 flex flex-col items-center justify-center text-center gap-3'>
            <div className='h-8 w-8 rounded-full border-3 border-[#D17E1C] border-t-transparent animate-spin' />
            <p className='text-xs text-neutral-600 font-medium'>
              Evaluating and ranking videos with AI...
            </p>
          </div>
        ) : results.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {results.map((item, index) => {
              const isTopPick = index === 0
              const hasAiEval = Boolean(item.aiEvaluated && item.aiEvaluation)

              return (
                <div 
                  key={index}
                  className={`flex gap-4 p-4 border rounded transition-all group ${
                    isTopPick 
                      ? 'bg-amber-50/70 hover:bg-amber-100/60 border-[#D17E1C]' 
                      : 'bg-[#DFDFDF]/70 hover:bg-[#D7D7D7] border-neutral-300'
                  }`}
                >
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

                  <div className='flex flex-col justify-between flex-1 min-w-0'>
                    <div>
                      {/* Badges */}
                      <div className='flex items-center gap-1.5 mb-1.5 flex-wrap'>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          isTopPick ? 'bg-[#D17E1C] text-white' : 'bg-neutral-300 text-neutral-700'
                        }`}>
                          #{index + 1}
                        </span>
                        {item.qualityScore !== undefined && (
                          <span className='text-[10px] font-semibold text-emerald-800 bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 rounded'>
                            AI Score: {item.qualityScore}%
                          </span>
                        )}
                        {hasAiEval && (
                          <span className='text-[10px] font-medium text-purple-700 bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded flex items-center gap-1'>
                            <Sparkles size={9} />
                            AI Evaluated
                          </span>
                        )}
                      </div>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='text-base font-medium text-neutral-900 line-clamp-2 hover:text-red-700 transition-colors leading-snug'
                      >
                        {item.title}
                      </a>

                      {item.aiEvaluation?.summary ? (
                        <p className='text-xs text-neutral-700 line-clamp-2 mt-1.5 bg-white/70 p-1.5 rounded border border-neutral-300/70'>
                          <strong className='text-[#D17E1C]'>AI Insight:</strong> {item.aiEvaluation.summary}
                        </p>
                      ) : item.content ? (
                        <p className='text-xs text-neutral-600 line-clamp-2 mt-1'>
                          {item.content}
                        </p>
                      ) : null}
                    </div>

                    <div className='pt-2 flex items-center justify-between text-xs'>
                      <span className='text-[11px] text-neutral-500 truncate max-w-[130px]'>
                        {item.channel}
                      </span>
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
              )
            })}
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

export default AipoweredYT
