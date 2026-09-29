import React from 'react'
import Header from '../component/Header'
import SearchResultpage from './SearchResultpage'

const Websearch = () => {
  return (
    <div className='min-h-screen w-full text-white flex flex-col'>
      <Header /> 
      <main className='flex-1 pb-12'>
        <SearchResultpage /> 
      </main>
    </div>
  )
}

export default Websearch
