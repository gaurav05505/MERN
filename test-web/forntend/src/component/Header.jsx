import { Bookmark, Bug } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className='h-30 w-full bg-[#212121] px-5 py-5 flex items-top justify-between '>
      {/* logo  */}
        <div>
            <p className='text-[20px] font-normal'>Search <span className='text-[#D17E1C]'>hub</span></p>
        </div>

      {/* options   */}
      <ul className='flex gap-5 h-fit font-light'>
        <li className='px-4 py-2 text-white border-b border-red-900'>web search</li>
        <li className='px-4 py-2 text-white/52'>Youtube search</li>
        <li className='px-4 py-2 text-white/52'>Movies</li>
        <li className='px-4 py-2 text-white/52'>All</li>
      </ul>
      {/* help  */}
      <div className='flex gap-10 h-fit ' >
        <div className=' flex gap-2 items-center '>
            <button className='flex items-center justify-center gap-2 px-3.5 py-3.5'>
                <Bookmark size={16} />
                <p className='text-[16px] '>save</p>
            </button>

            <button className='flex items-center justify-center gap-2 px-3.5 py-3.5'>
                <Bug size={16} />
                <p className='text-[16px] '>Report</p>
            </button>
        </div>

        <button className='flex items-center justify-center gap-2 px-3.5 py-3.5 bg-[#D17E1C]'>
            <p className='text-[16px] '>Suggest</p>
        </button>


      </div>
    </div>
  )
}

export default Header
