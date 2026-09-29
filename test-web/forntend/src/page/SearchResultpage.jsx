import React from 'react'
import { Search, History } from 'lucide-react'

const SearchResultpage = () => {
  return (
    <div className='relative -mt-8 z-20 mx-auto  max-w-[1440px] h-screen bg-[#E7E7E7] text-black p-8 shadow-2xl  flex flex-col'>
      {/* Search Bar + Search & History Buttons */}
      <div className='flex items-center gap-3 w-full'>
        {/* Search Input Box */}
        <div className='flex-1 flex items-center border border-[#7A7A7A] bg-[#E3E3E3]/60 px-4 py-2.5'>
          <Search size={18} className='text-[#6E6E6E] shrink-0' />
          <input
            type="text"
            placeholder="Search what ever you want...."
            className='w-full bg-transparent text-sm text-[#222] placeholder-[#737373] outline-none ml-3 font-normal'
          />
        </div>

        {/* Search Button */}
        <button className='bg-[#D17E1C] hover:bg-[#b86d17] text-white px-7 py-2.5 text-sm font-normal transition-colors'>
          Search
        </button>

        {/* History Button */}
        <button className='flex items-center gap-2 px-5 py-2.5 text-sm text-[#222] bg-[#DBDBDB] hover:bg-[#D1D1D1] border border-[#C5C5C5] shadow-md transition-all font-normal'>
          <History size={16} className='text-[#333]' />
          <span>History</span>
        </button>
      </div>

      {/* Result For Your Search Header */}
      <div className='mt-8'>
        <p className='text-[15px] font-normal text-[#333333]'>
          Result for your search
        </p>
      </div>
    </div>
  )
}

export default SearchResultpage
