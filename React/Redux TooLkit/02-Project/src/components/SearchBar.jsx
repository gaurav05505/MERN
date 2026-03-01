import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setQuery } from '../redux/features/searchSlice'
import Tabs from './Tabs';

const SearchBar = () => {

  const dispatch = useDispatch();
  const [text, setText] = useState('')
  const [showTabs, setShowTabs] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setQuery(text))
  }

  return (
    <div className='w-full flex flex-col gap-4 mb-10'>

      {/* search row */}
      <div className='flex items-center gap-3'>

        <form
          onSubmit={handleSubmit}
          className='flex flex-1 items-center gap-2 min-w-0 bg-[#161616] px-3 py-3 rounded-2xl'
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='h-11 sm:h-14 flex-1 min-w-0 border border-white/5 bg-[#181818] px-4 sm:px-8 rounded-2xl outline-none text-sm sm:text-base'
            type="text"
            placeholder='Search Anything...'
          />

          <button
            className='h-11 sm:h-14 px-5 sm:px-8 shrink-0 border border-white/5 bg-[#181818] rounded-2xl outline-none
            active:scale-90
            hover:bg-green-400 hover:text-black
            transition-all duration-300 ease-out text-sm sm:text-base'
          >
            Search
          </button>
        </form>

        {/* hamburger on mobile, hidden on lg */}
        <button
          onClick={() => setShowTabs(!showTabs)}
          className='lg:hidden h-11 w-11 shrink-0 bg-[#161616] border border-white/5 rounded-2xl flex items-center justify-center active:scale-90 transition-all duration-300'
        >
          {showTabs ? (
            // X icon
            <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 text-white' fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // hamburger icon
            <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 text-white' fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Tabs always visible on desktop */}
        <div className='hidden lg:block shrink-0'>
          <Tabs />
        </div>

      </div>

      {/* Tabs dropdown on mobile */}
      {showTabs && (
        <div className='lg:hidden w-full bg-[#161616] border border-white/5 rounded-2xl px-4 py-3'>
          <Tabs />
        </div>
      )}

    </div>
  )
}

export default SearchBar