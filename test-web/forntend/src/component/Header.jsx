import { Bookmark, Bug } from 'lucide-react'
import React from 'react'

const Header = ({ activeTab = 'web', setActiveTab }) => {

  const tabs = [
    { id: 'web', label: 'Web Search' },
    { id: 'youtube', label: 'YouTube Search' },
    { id: 'movies', label: 'Movies' },
    { id: 'all', label: 'All' }
  ]

  return (
    <header className="h-32 w-full bg-[#1E1E1E] px-8 flex items-center justify-between text-white">

      {/* Brand */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setActiveTab?.('web')}
      >
        <p className="text-[20px] font-normal tracking-wide">
          Search <span className="text-[#D17E1C]">Hub</span>
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex items-center">
        <ul className="flex items-center gap-7 text-sm font-light">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              onClick={() => setActiveTab?.(tab.id)}
              className={`cursor-pointer px-3 py-1.5 transition-colors flex items-center ${
                activeTab === tab.id
                  ? 'text-white border-b-2 border-[#D17E1C] pb-0.5'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </nav>

      {/* Right Actions */}
      <div className="flex items-center gap-6">

        <button className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors cursor-pointer">
          <Bookmark size={15} />
          <span>Save</span>
        </button>

        <button className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors cursor-pointer">
          <Bug size={15} />
          <span>Report</span>
        </button>

        <button className="flex items-center justify-center bg-[#D17E1C] hover:bg-[#bd6e15] text-white text-sm font-normal px-5 py-2.5 rounded-sm transition-colors cursor-pointer">
          Suggest
        </button>

      </div>

    </header>
  )
}

export default Header