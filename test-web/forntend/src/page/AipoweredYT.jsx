import React, { useState } from 'react'
import SearchBox from '../component/SearchBox'
import { 
  Play, 
  ExternalLink, 
  Sparkles, 
  Brain, 
  Award, 
  Clock, 
  Eye, 
  User
} from 'lucide-react'

const SUGGESTIONS = [
  'React 19 Complete Tutorial',
  'Node.js and Express Full Course',
  'System Design for Beginners',
  'JavaScript Modern Best Practices',
  'Python Data Structures'
]

const AipoweredYT = () => {
  const [results, setResults] = useState([])
  const [currentQuery, setCurrentQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSuggestionClick = async (suggestion) => {
    try {
      setLoading(true)
      setCurrentQuery(suggestion)
      const response = await fetch('http://localhost:5000/api/search/ai-youtube', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: suggestion })
      })

      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('AI search error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='relative -mt-6 z-20 mx-auto max-w-[1440px] min-h-[85vh] bg-[#E7E7E7] text-black p-8 shadow-2xl flex flex-col'>
      {/* Search Bar */}
      <SearchBox 
        setResults={setResults} 
        endpoint="http://localhost:5000/api/search/ai-youtube"
        placeholder="Search YouTube with AI transcript evaluation & ranking..."
        onSearch={(q) => setCurrentQuery(q)}
        onLoadingChange={setLoading}
      />

      {/* Header & Status Indicator */}
      <div className='mt-8 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-neutral-300'>
        <div>
          <div className='flex items-center gap-2'>
            <span className='flex items-center justify-center h-6 w-6 rounded-md bg-[#D17E1C] text-white shadow-xs'>
              <Brain size={14} />
            </span>
            <h2 className='text-lg font-semibold text-neutral-900'>
              Yt-AI Powered Ranking
            </h2>
            <span className='text-xs font-medium px-2 py-0.5 rounded bg-[#D17E1C]/15 text-[#b06512] font-mono'>
              Transcript & Heuristic AI
            </span>
          </div>
          <p className='text-xs text-neutral-500 mt-1'>
            Deep evaluation of video transcripts, teaching quality, topic depth, and audience reception.
          </p>
        </div>

        {currentQuery && (
          <div className='text-xs text-neutral-600 bg-white/80 border border-neutral-300 px-3 py-1.5 rounded'>
            Query: <strong className='text-neutral-900'>"{currentQuery}"</strong>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className='py-16 flex flex-col items-center justify-center text-center gap-3'>
          <div className='h-9 w-9 rounded-full border-3 border-[#D17E1C] border-t-transparent animate-spin' />
          <p className='text-sm font-semibold text-neutral-800'>
            Running AI Video Intelligence...
          </p>
          <p className='text-xs text-neutral-500 max-w-md'>
            Extracting video captions, evaluating educational density with LLaMA 3.3, and sorting top-quality tutorials.
          </p>
        </div>
      )}

      {/* Results List */}
      {!loading && results.length > 0 && (
        <div className='space-y-5'>
          {results.map((item, index) => {
            const isTopPick = index === 0
            const hasAiEval = Boolean(item.aiEvaluated && item.aiEvaluation)

            return (
              <div 
                key={index}
                className={`p-5 rounded-xl border transition-all ${
                  isTopPick 
                    ? 'bg-gradient-to-r from-amber-50/90 via-white to-amber-50/40 border-[#D17E1C] shadow-md' 
                    : 'bg-[#DFDFDF]/70 hover:bg-[#D7D7D7] border-neutral-300'
                }`}
              >
                {/* Header row: Rank & Badges */}
                <div className='flex flex-wrap items-center justify-between gap-2 mb-3'>
                  <div className='flex items-center gap-2'>
                    {isTopPick ? (
                      <span className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#D17E1C] text-white text-xs font-semibold uppercase tracking-wider shadow-xs'>
                        <Award size={13} />
                        #1 Top AI Recommendation
                      </span>
                    ) : (
                      <span className='px-2 py-0.5 rounded bg-neutral-200 text-neutral-700 text-xs font-bold font-mono'>
                        Rank #{index + 1}
                      </span>
                    )}

                    {/* AI Score Badge */}
                    <span className='text-xs font-semibold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded'>
                      Quality Score: {item.qualityScore}%
                    </span>

                    {/* Evaluation Method Pill */}
                    {hasAiEval ? (
                      <span className='text-[11px] font-medium text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded flex items-center gap-1'>
                        <Sparkles size={11} />
                        Transcript Evaluated
                      </span>
                    ) : (
                      <span className='text-[11px] font-medium text-neutral-600 bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded'>
                        Metadata Heuristic
                      </span>
                    )}
                  </div>

                  {item.duration && (
                    <span className='text-xs font-mono text-neutral-500 flex items-center gap-1'>
                      <Clock size={12} />
                      {item.duration}
                    </span>
                  )}
                </div>

                {/* Content section */}
                <div className='flex flex-col md:flex-row gap-5'>
                  {/* Thumbnail */}
                  {item.thumbnail && (
                    <div className='relative w-full md:w-56 h-32 shrink-0 overflow-hidden rounded-lg bg-black group'>
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-200'
                      />
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                      >
                        <div className='p-2.5 rounded-full bg-red-600 text-white shadow-md'>
                          <Play size={18} fill="white" />
                        </div>
                      </a>
                    </div>
                  )}

                  {/* Video Details */}
                  <div className='flex flex-col justify-between flex-1 min-w-0'>
                    <div>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='text-base sm:text-lg font-semibold text-neutral-900 hover:text-[#D17E1C] transition-colors leading-snug'
                      >
                        {item.title}
                      </a>

                      <div className='flex flex-wrap items-center gap-4 text-xs text-neutral-500 mt-1.5'>
                        {item.channel && (
                          <span className='flex items-center gap-1 font-medium text-neutral-700'>
                            <User size={12} />
                            {item.channel}
                          </span>
                        )}
                        {item.views && (
                          <span className='flex items-center gap-1'>
                            <Eye size={12} />
                            {Number(item.views).toLocaleString()} views
                          </span>
                        )}
                      </div>

                      {/* AI Summary Quote (if available) */}
                      {hasAiEval && item.aiEvaluation.summary && (
                        <div className='mt-2.5 p-2.5 rounded bg-white/90 border border-purple-200 text-xs text-neutral-700'>
                          <span className='font-semibold text-purple-800 mr-1.5'>AI Insight:</span>
                          {item.aiEvaluation.summary}
                        </div>
                      )}

                      {/* Fallback description */}
                      {(!hasAiEval || !item.aiEvaluation.summary) && item.content && (
                        <p className='text-xs text-neutral-600 line-clamp-2 mt-2 leading-relaxed'>
                          {item.content}
                        </p>
                      )}
                    </div>

                    {/* Score Breakdown Metrics */}
                    <div className='mt-3 pt-2.5 border-t border-neutral-300/80 flex flex-wrap items-center justify-between gap-2'>
                      <div className='flex flex-wrap gap-2 text-[11px] text-neutral-600'>
                        {hasAiEval ? (
                          <>
                            <span className='px-2 py-0.5 rounded bg-white border border-neutral-300'>
                              Teaching: <strong>{item.aiEvaluation.teachingQuality}%</strong>
                            </span>
                            <span className='px-2 py-0.5 rounded bg-white border border-neutral-300'>
                              Depth: <strong>{item.aiEvaluation.depth}%</strong>
                            </span>
                            <span className='px-2 py-0.5 rounded bg-white border border-neutral-300'>
                              Examples: <strong>{item.aiEvaluation.examples}%</strong>
                            </span>
                            <span className='px-2 py-0.5 rounded bg-white border border-neutral-300'>
                              Relevance: <strong>{item.aiEvaluation.topicRelevance}%</strong>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className='px-2 py-0.5 rounded bg-white border border-neutral-300'>
                              Topic Match: <strong>{item.scoreBreakdown?.relevance}%</strong>
                            </span>
                            <span className='px-2 py-0.5 rounded bg-white border border-neutral-300'>
                              Length Fit: <strong>{item.scoreBreakdown?.duration}%</strong>
                            </span>
                            <span className='px-2 py-0.5 rounded bg-white border border-neutral-300'>
                              Popularity: <strong>{item.scoreBreakdown?.popularity}%</strong>
                            </span>
                          </>
                        )}
                      </div>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='inline-flex items-center gap-1.5 text-xs text-red-700 hover:underline font-semibold'
                      >
                        <span>Watch on YouTube</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Empty State with Suggestions */}
      {!loading && results.length === 0 && (
        <div className='my-auto py-12 flex flex-col items-center text-center max-w-2xl mx-auto'>
          <div className='h-14 w-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-[#D17E1C] text-white flex items-center justify-center shadow-lg shadow-amber-500/20 mb-4'>
            <Brain size={28} />
          </div>

          <h3 className='text-xl font-bold text-neutral-900'>
            AI-Evaluated YouTube Learning
          </h3>
          <p className='text-sm text-neutral-600 mt-2 leading-relaxed'>
            Search any coding topic, tutorial, or educational query. Our engine retrieves YouTube transcripts and evaluates teaching clarity, code examples, and topic depth to deliver the highest-rated videos.
          </p>

          {/* Quick Search Chips */}
          <div className='mt-8 w-full'>
            <span className='text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-2'>
              Try a Popular Search:
            </span>
            <div className='flex flex-wrap justify-center gap-2'>
              {SUGGESTIONS.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className='text-xs bg-white hover:bg-[#D17E1C] hover:text-white border border-neutral-300 text-neutral-700 px-3.5 py-1.5 rounded-full transition-all duration-150 shadow-2xs cursor-pointer flex items-center gap-1.5'
                >
                  <Sparkles size={11} className='text-amber-500 group-hover:text-white' />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AipoweredYT





