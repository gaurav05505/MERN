import React, { useState } from 'react'

import Results from '../component/results'
import SearchBox from '../component/SearchBox'

const SearchResultpage = () => {

  const [results, setResults] = useState([]);

  return (
    <div className='relative -mt-6 z-20 mx-auto max-w-[1440px] min-h-[85vh] bg-[#E7E7E7] text-black p-8 shadow-2xl flex flex-col'>
      {/* Search Bar + Search & History Buttons */}
      <SearchBox setResults={setResults} endpoint="http://localhost:5000/api/search" />

      {/* Result For Your Search Header */}
      <div className='mt-8'>
        <p className='text-[15px] font-normal text-[#333333] mb-6'>
          Result for your search
        </p>

        {results.length > 0 ? (
          results.map((result, index) => (
            <Results
              key={index}
              result={result}
              index={index}
            />
          ))
        ) : (
          <p className='text-xs text-neutral-500 italic'>
            Type a query above to start searching the web.
          </p>
        )}
      </div>
    </div>
  )
}

export default SearchResultpage
