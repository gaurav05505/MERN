import React, { useState } from 'react'
import Header from '../component/Header'
import SearchResultpage from './SearchResultpage'
import Ytsearchpage from './Ytsearchpage'
import AipoweredYT from './AipoweredYT'

const Websearch = () => {
  const [activeTab, setActiveTab] = useState('web')

  return (
    <div className='min-h-screen w-full text-white flex flex-col bg-white'>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} /> 
      <main className='flex-1 pb-12'>
        {activeTab === 'web' && <SearchResultpage />}
        {activeTab === 'youtube' && <Ytsearchpage />}
        {activeTab === 'Yt-Ai' && <AipoweredYT />}
        {activeTab === 'movies' && <SearchResultpage />}
        {activeTab === 'all' && <SearchResultpage />}
      </main>
    </div>
  )
}

export default Websearch
